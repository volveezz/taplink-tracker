import { preloadDesignFonts } from './design-fonts.js';

const URL_PARAMS = new URLSearchParams(window.location.search);
const SUPPORTED_DESIGNS = [1,2,3,4,5,6,7,8,9,10];
const STORAGE_KEYS = {
  apiKey: 'ld_posthog_api_key',
  apiHost: 'ld_posthog_api_host',
  cachedDesign: 'ld_cached_design',
  cachedVariant: 'ld_cached_variant',
  distinctId: 'ld_posthog_distinct_id',
};
const STATIC_VARIANT_MAP = {
  control: 1,
  'design-1': 1,
  'design_1': 1,
  'design 1': 1,
  'design-2': 2,
  'design_2': 2,
  'design 2': 2,
  test: 2,
  'variant-a': 1,
  'variant-b': 2,
};
const runtimeConfig = window.__POSTHOG_CONFIG__ || {};

function isSupportedDesign(value) {
  return SUPPORTED_DESIGNS.includes(value);
}

function resolveVariantToDesign(value) {
  if (value === null || value === undefined || value === '' || value === false) return null;
  const normalized = String(value).trim().toLowerCase();
  const mapped = STATIC_VARIANT_MAP[normalized];
  if (isSupportedDesign(mapped)) return mapped;
  const match = normalized.match(/(?:design[-_ ]?)?(\d{1,2})/);
  if (!match) return null;
  const design = Number(match[1]);
  return isSupportedDesign(design) ? design : null;
}

function getCachedDesign() {
  try {
    const cachedDesign = Number(localStorage.getItem(STORAGE_KEYS.cachedDesign));
    return isSupportedDesign(cachedDesign) ? cachedDesign : null;
  } catch (error) {
    return null;
  }
}

function getCachedVariant() {
  try {
    return localStorage.getItem(STORAGE_KEYS.cachedVariant) || '';
  } catch (error) {
    return '';
  }
}

function persistAssignment(design, variant) {
  try {
    if (isSupportedDesign(design)) {
      localStorage.setItem(STORAGE_KEYS.cachedDesign, String(design));
    }
    if (variant) {
      localStorage.setItem(STORAGE_KEYS.cachedVariant, String(variant));
    }
  } catch (error) {
    return undefined;
  }
}

function getOrCreateDistinctId() {
  try {
    const existing = localStorage.getItem(STORAGE_KEYS.distinctId);
    if (existing) return existing;
    const created = crypto && typeof crypto.randomUUID === 'function'
      ? crypto.randomUUID()
      : `ld-${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`;
    localStorage.setItem(STORAGE_KEYS.distinctId, created);
    return created;
  } catch (error) {
    return crypto && typeof crypto.randomUUID === 'function'
      ? crypto.randomUUID()
      : `ld-${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`;
  }
}

function applyInitialBodyState(design) {
  document.body.className = `design-${design}`;
}

function normalizePayloadValue(value) {
  if (typeof value !== 'string') return value;
  try {
    return JSON.parse(value);
  } catch (error) {
    return value;
  }
}

function normalizeFlagResponse(rawFlags) {
  const normalizedFlags = {};
  const normalizedPayloads = {};
  if (!rawFlags || typeof rawFlags !== 'object') {
    return {
      featureFlags: normalizedFlags,
      featureFlagPayloads: normalizedPayloads,
    };
  }

  Object.entries(rawFlags).forEach(([key, value]) => {
    if (value && typeof value === 'object' && 'enabled' in value) {
      normalizedFlags[key] = value.variant || value.enabled;
      const payload = normalizePayloadValue(value.payload ?? value.metadata?.payload);
      if (payload !== undefined && payload !== null) {
        normalizedPayloads[key] = payload;
      }
      return;
    }
    normalizedFlags[key] = value;
  });

  return {
    featureFlags: normalizedFlags,
    featureFlagPayloads: normalizedPayloads,
  };
}

async function resolveBootstrapState() {
  const queryApiKey = URL_PARAMS.get('ph_project_api_key');
  const queryApiHost = URL_PARAMS.get('ph_api_host');
  if (queryApiKey) localStorage.setItem(STORAGE_KEYS.apiKey, queryApiKey);
  if (queryApiHost) localStorage.setItem(STORAGE_KEYS.apiHost, queryApiHost);

  const apiKey = queryApiKey || runtimeConfig.apiKey || localStorage.getItem(STORAGE_KEYS.apiKey) || 'phc_vLNT4zvNhGveqPm9ekmS4zHGMSGp8EXSJZczgwn9Lj4o';
  const apiHost = queryApiHost || runtimeConfig.apiHost || localStorage.getItem(STORAGE_KEYS.apiHost) || 'https://eu.i.posthog.com';
  const designFlagKey = runtimeConfig.designFlagKey || 'landing-design-experiment';
  const overrideVariant = URL_PARAMS.get('ld_variant') || runtimeConfig.variantOverride || '';
  const overrideDesign = Number(URL_PARAMS.get('ld_design') || runtimeConfig.designOverride || '');
  const distinctID = getOrCreateDistinctId();

  let initialDesign = 1;
  let flagVariant = '';
  let featureFlags = {};
  let featureFlagPayloads = {};
  let source = 'default';

  if (isSupportedDesign(overrideDesign)) {
    initialDesign = overrideDesign;
    flagVariant = `design-${overrideDesign}`;
    source = 'override';
  } else {
    const overrideVariantDesign = resolveVariantToDesign(overrideVariant);
    if (overrideVariantDesign) {
      initialDesign = overrideVariantDesign;
      flagVariant = overrideVariant;
      source = 'override';
    } else {
      try {
        const response = await fetch(`${apiHost}/flags?v=2`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            api_key: apiKey,
            distinct_id: distinctID,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          const normalized = normalizeFlagResponse(data.flags || data.featureFlags || {});
          featureFlags = normalized.featureFlags;
          featureFlagPayloads = normalized.featureFlagPayloads;
          flagVariant = featureFlags[designFlagKey] || '';
          const experimentDesign = resolveVariantToDesign(flagVariant);
          if (experimentDesign) {
            initialDesign = experimentDesign;
            source = 'experiment';
            persistAssignment(initialDesign, flagVariant);
          }
        }
      } catch (error) {
        featureFlags = {};
        featureFlagPayloads = {};
      }

      if (source !== 'experiment') {
        const cachedDesign = getCachedDesign();
        const cachedVariant = getCachedVariant();
        if (cachedDesign) {
          initialDesign = cachedDesign;
          flagVariant = cachedVariant;
          source = 'cache';
        }
      }
    }
  }

  return {
    initialDesign,
    flagVariant,
    featureFlags,
    featureFlagPayloads,
    distinctID,
    source,
    experimentAssigned: Boolean(flagVariant && source === 'experiment'),
    designFlagKey,
  };
}

async function bootstrap() {
  const bootstrapState = await resolveBootstrapState();
  await preloadDesignFonts(bootstrapState.initialDesign);
  window.__LD_BOOTSTRAP__ = bootstrapState;
  applyInitialBodyState(bootstrapState.initialDesign);
  await import('./main.js');
}

bootstrap();
