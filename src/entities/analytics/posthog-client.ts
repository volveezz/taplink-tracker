import posthog, { type JsonType } from "posthog-js";
import type { FeaturePayload } from "@/entities/experiments/schemas";
import type { BootstrapResponse } from "@/entities/experiments/schemas";

let analyticsReady = false;

export function captureAnalyticsEvent(eventName: string, properties: Record<string, unknown> = {}): void {
  if (!analyticsReady) return;
  posthog.capture(eventName, properties);
}

export function registerAnalyticsContext(properties: Record<string, unknown>): void {
  if (!analyticsReady) return;
  posthog.register(properties);
}

export function getRuntimeFeatureFlagValue(flagKey: string): unknown {
  if (typeof posthog.getFeatureFlag !== "function") return null;
  return posthog.getFeatureFlag(flagKey);
}

export function getRuntimeFeatureFlagPayload(flagKey: string): FeaturePayload | null {
  if (typeof posthog.getFeatureFlagPayload !== "function") return null;
  return (posthog.getFeatureFlagPayload(flagKey) as FeaturePayload | null) ?? null;
}

export function initAnalytics(
  bootstrap: BootstrapResponse,
  callbacks: {
    onLoaded: () => void;
    onFlagsChanged: () => void;
  },
): void {
  if (!bootstrap.analytics.apiKey) {
    callbacks.onLoaded();
    return;
  }

  posthog.init(bootstrap.analytics.apiKey, {
    api_host: bootstrap.analytics.apiHost,
    ui_host: bootstrap.analytics.uiHost,
    defaults: "2026-01-30",
    bootstrap: {
      distinctID: bootstrap.distinctId,
      featureFlags: bootstrap.featureFlags as Record<string, string | boolean>,
      featureFlagPayloads: bootstrap.featureFlagPayloads as Record<string, JsonType>,
    },
    autocapture: true,
    capture_pageview: "history_change",
    capture_pageleave: true,
    capture_dead_clicks: true,
    rageclick: true,
    debug: bootstrap.analytics.debug,
    loaded: () => {
      analyticsReady = true;
      callbacks.onLoaded();
    },
  });

  if (typeof posthog.onFeatureFlags === "function") {
    posthog.onFeatureFlags(() => {
      callbacks.onFlagsChanged();
    });
  }
}
