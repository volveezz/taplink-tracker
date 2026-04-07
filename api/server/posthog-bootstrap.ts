import { defaultPublicPosthogConfig } from "../../src/shared/config/posthog.js";
import { featurePayloadSchema, type FeaturePayload } from "../../src/entities/experiments/schemas.js";
import { mergeFeaturePayloads } from "../../src/entities/experiments/payload-merger.js";
import { getDefaultDesignId, isSupportedDesignId, resolveDesignFromVariant } from "../../src/entities/experiments/assignment.js";

type FlagRecord = Record<string, unknown>;

function normalizePayloadValue(value: unknown): unknown {
  if (typeof value !== "string") return value;
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
}

function normalizeFlagResponse(rawFlags: unknown): {
  featureFlags: FlagRecord;
  featureFlagPayloads: FlagRecord;
} {
  const featureFlags: FlagRecord = {};
  const featureFlagPayloads: FlagRecord = {};

  if (!rawFlags || typeof rawFlags !== "object") {
    return { featureFlags, featureFlagPayloads };
  }

  for (const [key, value] of Object.entries(rawFlags)) {
    if (value && typeof value === "object" && "enabled" in value) {
      const typedValue = value as { enabled: unknown; variant?: unknown; payload?: unknown; metadata?: { payload?: unknown } };
      featureFlags[key] = typedValue.variant || typedValue.enabled;
      const payload = normalizePayloadValue(typedValue.payload ?? typedValue.metadata?.payload);
      if (payload !== undefined && payload !== null) featureFlagPayloads[key] = payload;
      continue;
    }
    featureFlags[key] = value;
  }

  return { featureFlags, featureFlagPayloads };
}

function readValidPayload(payload: unknown): FeaturePayload | null {
  const parsed = featurePayloadSchema.safeParse(payload);
  return parsed.success ? parsed.data : null;
}

export async function resolveBootstrapPayload(requestUrl: string) {
  const url = new URL(requestUrl);
  const distinctId = url.searchParams.get("distinct_id") || crypto.randomUUID();
  const queryApiKey = url.searchParams.get("ph_project_api_key") || "";
  const queryApiHost = url.searchParams.get("ph_api_host") || "";
  const overrideVariant = url.searchParams.get("ld_variant") || "";
  const overrideDesign = Number(url.searchParams.get("ld_design") || "");
  const cachedDesign = Number(url.searchParams.get("cached_design") || "");
  const cachedVariant = url.searchParams.get("cached_variant") || "";

  const analytics = {
    ...defaultPublicPosthogConfig,
    apiKey: queryApiKey || defaultPublicPosthogConfig.apiKey,
    apiHost: queryApiHost || defaultPublicPosthogConfig.apiHost,
    debug: url.searchParams.get("ph_debug") === "1",
  };

  let designId = getDefaultDesignId();
  let designSource = "default";
  let flagVariant = "";
  let featureFlags: FlagRecord = {};
  let featureFlagPayloads: FlagRecord = {};

  if (isSupportedDesignId(overrideDesign)) {
    designId = overrideDesign;
    flagVariant = `design-${overrideDesign}`;
    designSource = "override";
  } else {
    const overrideVariantDesign = resolveDesignFromVariant(overrideVariant);
    if (overrideVariantDesign) {
      designId = overrideVariantDesign;
      flagVariant = overrideVariant;
      designSource = "override";
    } else {
      try {
        const response = await fetch(`${analytics.apiHost}/flags?v=2`, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            api_key: analytics.apiKey,
            distinct_id: distinctId,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          const normalized = normalizeFlagResponse(
            (data as { flags?: unknown; featureFlags?: unknown }).flags ??
              (data as { flags?: unknown; featureFlags?: unknown }).featureFlags,
          );
          featureFlags = normalized.featureFlags;
          featureFlagPayloads = normalized.featureFlagPayloads;
          flagVariant = String(featureFlags[analytics.designFlagKey] ?? "");
          const experimentDesign = resolveDesignFromVariant(flagVariant);
          if (experimentDesign) {
            designId = experimentDesign;
            designSource = "experiment";
          }
        }
      } catch {
        featureFlags = {};
        featureFlagPayloads = {};
      }

      if (designSource !== "experiment" && isSupportedDesignId(cachedDesign)) {
        designId = cachedDesign;
        flagVariant = cachedVariant;
        designSource = "cache";
      }
    }
  }

  const mergedConfig = mergeFeaturePayloads(
    [
      readValidPayload(featureFlagPayloads[analytics.featureFlagKeys.uiConfig]),
      readValidPayload(featureFlagPayloads[analytics.featureFlagKeys.profileExperiment]),
      readValidPayload(featureFlagPayloads[analytics.featureFlagKeys.contactOptionsExperiment]),
    ].filter((payload): payload is FeaturePayload => Boolean(payload)),
  );

  return {
    analytics,
    distinctId,
    designId,
    designSource,
    flagVariant,
    experimentAssigned: designSource === "experiment" && Boolean(flagVariant),
    featureFlags,
    featureFlagPayloads,
    mergedConfig,
  };
}
