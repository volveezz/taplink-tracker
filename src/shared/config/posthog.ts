export const posthogStorageKeys = {
  apiKey: "ld_posthog_api_key",
  apiHost: "ld_posthog_api_host",
  cachedDesign: "ld_cached_design",
  cachedVariant: "ld_cached_variant",
  distinctId: "ld_posthog_distinct_id",
  queryParams: "ld_params",
} as const;

export const defaultPublicPosthogConfig = {
  apiKey: "phc_vLNT4zvNhGveqPm9ekmS4zHGMSGp8EXSJZczgwn9Lj4o",
  apiHost: "https://eu.i.posthog.com",
  uiHost: "https://eu.posthog.com",
  designFlagKey: "landing-design-experiment",
  featureFlagKeys: {
    uiConfig: "linkdrop-ui-config",
    profileExperiment: "linkdrop-profile-experiment",
    contactOptionsExperiment: "linkdrop-contact-options-experiment",
  },
} as const;
