import { startTransition, useEffect, useMemo, useState } from "react";
import type { BootstrapResponse, FeaturePayload } from "@/entities/experiments/schemas";
import { featurePayloadSchema } from "@/entities/experiments/schemas";
import { mergeFeaturePayloads } from "@/entities/experiments/payload-merger";
import { localeLabels, supportedLocales, type LocaleCode } from "@/shared/config/locales";
import { designDefinitions } from "@/shared/config/designs";
import { resolveTheme, type ThemeMode } from "@/entities/locale/locale";
import { loadDesignManifest } from "@/designs/registry";
import type { DesignManifest } from "@/designs/types";
import { LandingShell } from "@/widgets/landing/landing-shell";

function collectBasePayloads(bootstrap: BootstrapResponse): FeaturePayload[] {
  return [
    bootstrap.featureFlagPayloads[bootstrap.analytics.featureFlagKeys.uiConfig],
    bootstrap.featureFlagPayloads[bootstrap.analytics.featureFlagKeys.profileExperiment],
    bootstrap.featureFlagPayloads[bootstrap.analytics.featureFlagKeys.contactOptionsExperiment],
  ]
    .map((payload) => featurePayloadSchema.safeParse(payload))
    .filter((result): result is { success: true; data: FeaturePayload } => result.success)
    .map((result) => result.data);
}

export function PreviewPage({
  bootstrap,
  initialManifest,
}: {
  bootstrap: BootstrapResponse;
  initialManifest: DesignManifest;
}) {
  const basePayloads = useMemo(() => collectBasePayloads(bootstrap), [bootstrap]);
  const [manifest, setManifest] = useState(initialManifest);
  const [themeMode, setThemeMode] = useState<ThemeMode>("auto");
  const [locale, setLocale] = useState<LocaleCode>("en");
  const [overrideJson, setOverrideJson] = useState("{}");

  const parsedOverride = useMemo(() => {
    try {
      return featurePayloadSchema.parse(JSON.parse(overrideJson));
    } catch {
      return null;
    }
  }, [overrideJson]);

  const config = useMemo(
    () => mergeFeaturePayloads(parsedOverride ? [...basePayloads, parsedOverride] : basePayloads),
    [basePayloads, parsedOverride],
  );

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
  }, [locale]);

  return (
    <div className="preview-workbench">
      <aside className="preview-sidebar">
        <fieldset className="preview-fieldset">
          <legend className="mb-2 text-sm font-semibold text-white">Preview controls</legend>
          <label className="preview-label">
            Design
            <select
              className="preview-select"
              value={manifest.id}
              onChange={(event) => {
                const nextId = Number(event.currentTarget.value);
                loadDesignManifest(nextId).then((nextManifest) => {
                  startTransition(() => setManifest(nextManifest));
                });
              }}
            >
              {designDefinitions.map((design) => (
                <option key={design.id} value={design.id}>
                  {design.label}
                </option>
              ))}
            </select>
          </label>
          <label className="preview-label">
            Theme
            <select
              className="preview-select"
              value={themeMode}
              onChange={(event) => setThemeMode(event.currentTarget.value as ThemeMode)}
            >
              <option value="auto">Auto</option>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </label>
          <label className="preview-label">
            Language
            <select
              className="preview-select"
              value={locale}
              onChange={(event) => setLocale(event.currentTarget.value as LocaleCode)}
            >
              {supportedLocales.map((code) => (
                <option key={code} value={code}>
                  {localeLabels[code]}
                </option>
              ))}
            </select>
          </label>
        </fieldset>
        <fieldset className="preview-fieldset">
          <legend className="mb-2 text-sm font-semibold text-white">
            Flag-backed JSON override
          </legend>
          <textarea
            className="preview-textarea"
            value={overrideJson}
            onChange={(event) => setOverrideJson(event.currentTarget.value)}
          />
          <p className="preview-help">
            This preview only accepts the same payload shape used by PostHog UI/profile/contact
            flags.
          </p>
        </fieldset>
      </aside>
      <div className="preview-canvas">
        <LandingShell
          manifest={manifest}
          config={config}
          locale={locale}
          theme={resolveTheme(themeMode)}
          toastMessage=""
          onLinkClick={() => undefined}
          onDisabledClick={() => undefined}
          onContactStarted={() => undefined}
          onContactSubmitted={() => Promise.resolve(true)}
        />
      </div>
    </div>
  );
}
