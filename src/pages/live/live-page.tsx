import { startTransition, useEffect, useEffectEvent, useMemo, useRef, useState } from "react";
import type {
  BootstrapResponse,
  FeaturePayload,
  ResolvedAppConfig,
} from "@/entities/experiments/schemas";
import { mergeFeaturePayloads } from "@/entities/experiments/payload-merger";
import { resolveLocale, resolveTheme, type EffectiveTheme, type ThemeMode } from "@/entities/locale/locale";
import { captureAnalyticsEvent, getRuntimeFeatureFlagPayload, getRuntimeFeatureFlagValue, initAnalytics, registerAnalyticsContext } from "@/entities/analytics/posthog-client";
import { resolveDesignFromVariant } from "@/entities/experiments/assignment";
import { loadDesignManifest } from "@/designs/registry";
import type { DesignManifest } from "@/designs/types";
import { LandingShell } from "@/widgets/landing/landing-shell";

type LivePageProps = {
  bootstrap: BootstrapResponse;
  initialManifest: DesignManifest;
};

type SessionStats = {
  sessionStartedAt: number;
  totalPrimaryActions: number;
  totalLinkClicks: number;
  disabledLinkClicks: number;
  contactStarted: boolean;
  contactSubmitted: boolean;
  firstPrimaryActionAt: number | null;
  featureViewSent: boolean;
  featureInteractionSent: boolean;
};

function getEnabledContactFields(config: ResolvedAppConfig): string[] {
  return [
    config.contact.phone.show ? "phone" : null,
    config.contact.email.show ? "email" : null,
  ].filter((value): value is string => Boolean(value));
}

export function LivePage({ bootstrap, initialManifest }: LivePageProps) {
  const [manifest, setManifest] = useState(initialManifest);
  const [config, setConfig] = useState(bootstrap.mergedConfig);
  const [themeMode] = useState<ThemeMode>("auto");
  const [toastMessage, setToastMessage] = useState("");
  const [designSource, setDesignSource] = useState(bootstrap.designSource);
  const [experimentVariant, setExperimentVariant] = useState(bootstrap.flagVariant || "control");
  const designOverrideLocked = bootstrap.designSource === "override";
  const statsRef = useRef<SessionStats>({
    sessionStartedAt: Date.now(),
    totalPrimaryActions: 0,
    totalLinkClicks: 0,
    disabledLinkClicks: 0,
    contactStarted: false,
    contactSubmitted: false,
    firstPrimaryActionAt: null,
    featureViewSent: false,
    featureInteractionSent: false,
  });
  const locale = useMemo(() => resolveLocale("auto"), []);
  const effectiveTheme = resolveTheme(themeMode);
  const syncAnalyticsContext = useEffectEvent(() => {
    registerAnalyticsContext({
      current_design: manifest.id,
      configured_theme: themeMode,
      effective_theme: effectiveTheme,
      language: locale,
      design_source: designSource,
      experiment_variant: experimentVariant,
    });
  });

  const handleAnalyticsLoaded = useEffectEvent(() => {
    syncAnalyticsContext();
    captureAnalyticsEvent("linkdrop_session_started", {
      entry_design: manifest.id,
      visible_link_ids: config.links.filter((link) => link.state !== "hidden").map((link) => link.id),
      active_link_ids: config.links.filter((link) => link.state === "active").map((link) => link.id),
      enabled_contact_fields: getEnabledContactFields(config),
    });
    if (bootstrap.experimentAssigned && !statsRef.current.featureViewSent) {
      captureAnalyticsEvent("$feature_view", { feature_flag: bootstrap.analytics.designFlagKey });
      statsRef.current.featureViewSent = true;
    }
  });

  const handleAnalyticsFlagsChanged = useEffectEvent(() => {
    const payloads: FeaturePayload[] = [
      getRuntimeFeatureFlagPayload(bootstrap.analytics.featureFlagKeys.uiConfig),
      getRuntimeFeatureFlagPayload(bootstrap.analytics.featureFlagKeys.profileExperiment),
      getRuntimeFeatureFlagPayload(bootstrap.analytics.featureFlagKeys.contactOptionsExperiment),
    ].filter((payload): payload is FeaturePayload => Boolean(payload));

    if (payloads.length > 0 && !statsRef.current.contactStarted) {
      startTransition(() => {
        setConfig((currentConfig) => {
          const nextConfig = mergeFeaturePayloads(payloads);
          return JSON.stringify(nextConfig) === JSON.stringify(currentConfig) ? currentConfig : nextConfig;
        });
      });
    }

    const runtimeVariant = getRuntimeFeatureFlagValue(bootstrap.analytics.designFlagKey);
    const runtimeDesignId = resolveDesignFromVariant(runtimeVariant);

    if (designOverrideLocked) {
      syncAnalyticsContext();
      return;
    }

    if (runtimeDesignId && runtimeDesignId !== manifest.id) {
      void loadDesignManifest(runtimeDesignId).then((nextManifest) => {
        startTransition(() => setManifest(nextManifest));
      });
    }

    setExperimentVariant(runtimeVariant ? String(runtimeVariant) : "control");
    setDesignSource((current) => (runtimeDesignId ? "experiment" : current));
    syncAnalyticsContext();
  });

  const emitPageHideSummary = useEffectEvent(() => {
    captureAnalyticsEvent("linkdrop_session_summary", {
      reason: "pagehide",
      session_duration_ms: Date.now() - statsRef.current.sessionStartedAt,
      total_primary_actions: statsRef.current.totalPrimaryActions,
      total_link_clicks: statsRef.current.totalLinkClicks,
      disabled_link_clicks: statsRef.current.disabledLinkClicks,
      contact_started: statsRef.current.contactStarted,
      contact_submitted: statsRef.current.contactSubmitted,
      exited_without_primary_action: statsRef.current.totalPrimaryActions === 0,
      first_primary_action_ms: statsRef.current.firstPrimaryActionAt
        ? statsRef.current.firstPrimaryActionAt - statsRef.current.sessionStartedAt
        : null,
      visible_link_ids: config.links.filter((link) => link.state !== "hidden").map((link) => link.id),
      active_link_ids: config.links.filter((link) => link.state === "active").map((link) => link.id),
      enabled_contact_fields: getEnabledContactFields(config),
    });
  });

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
  }, [locale]);

  useEffect(() => {
    initAnalytics(bootstrap, {
      onLoaded: handleAnalyticsLoaded,
      onFlagsChanged: handleAnalyticsFlagsChanged,
    });
  }, [bootstrap]);

  useEffect(() => {
    syncAnalyticsContext();
  }, [designSource, effectiveTheme, experimentVariant, locale, manifest.id, themeMode]);

  useEffect(() => {
    const pageHideListener = () => {
      emitPageHideSummary();
    };

    window.addEventListener("pagehide", pageHideListener);
    return () => {
      window.removeEventListener("pagehide", pageHideListener);
    };
  }, []);

  useEffect(() => {
    if (!toastMessage) return;
    const timeout = window.setTimeout(() => setToastMessage(""), 2600);
    return () => window.clearTimeout(timeout);
  }, [toastMessage]);

  const notePrimaryAction = (trigger: string) => {
    statsRef.current.totalPrimaryActions += 1;
    if (!statsRef.current.firstPrimaryActionAt) statsRef.current.firstPrimaryActionAt = Date.now();
    if (bootstrap.experimentAssigned && !statsRef.current.featureInteractionSent) {
      captureAnalyticsEvent("$feature_interaction", {
        feature_flag: bootstrap.analytics.designFlagKey,
        trigger,
      });
      statsRef.current.featureInteractionSent = true;
    }
  };

  return (
    <LandingShell
      manifest={manifest}
      config={config}
      locale={locale}
      theme={effectiveTheme as EffectiveTheme}
      toastMessage={toastMessage}
      onLinkClick={(linkId, url, position) => {
        statsRef.current.totalLinkClicks += 1;
        notePrimaryAction("link_click");
        captureAnalyticsEvent("linkdrop_link_clicked", {
          link_id: linkId,
          destination_url: url,
          position,
        });
      }}
      onDisabledClick={(linkId, reason) => {
        statsRef.current.disabledLinkClicks += 1;
        captureAnalyticsEvent("linkdrop_disabled_link_clicked", {
          link_id: linkId,
          disabled_reason: reason,
        });
        setToastMessage(reason);
      }}
      onContactStarted={() => {
        if (statsRef.current.contactStarted) return;
        statsRef.current.contactStarted = true;
        captureAnalyticsEvent("linkdrop_contact_started", {
          enabled_contact_fields: getEnabledContactFields(config),
        });
      }}
      onContactSubmitted={({ phoneProvided, emailProvided }) => {
        statsRef.current.contactSubmitted = true;
        notePrimaryAction("contact_submit");
        captureAnalyticsEvent("linkdrop_contact_submitted", {
          enabled_contact_fields: getEnabledContactFields(config),
          phone_provided: phoneProvided,
          email_provided: emailProvided,
        });
      }}
    />
  );
}
