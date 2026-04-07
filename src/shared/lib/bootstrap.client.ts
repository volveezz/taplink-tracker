import { bootstrapResponseSchema, type BootstrapResponse } from "@/entities/experiments/schemas";
import { posthogStorageKeys } from "@/shared/config/posthog";
import { getOrCreateDistinctId } from "./distinct-id";
import { persistCurrentQueryParams } from "./query-params";

function getPersistedApiConfig() {
  const queryParams = new URLSearchParams(window.location.search);
  const queryApiKey = queryParams.get("ph_project_api_key") || "";
  const queryApiHost = queryParams.get("ph_api_host") || "";

  if (queryApiKey) localStorage.setItem(posthogStorageKeys.apiKey, queryApiKey);
  if (queryApiHost) localStorage.setItem(posthogStorageKeys.apiHost, queryApiHost);

  return {
    apiKey: queryApiKey || localStorage.getItem(posthogStorageKeys.apiKey) || "",
    apiHost: queryApiHost || localStorage.getItem(posthogStorageKeys.apiHost) || "",
  };
}

export async function bootstrapLiveApp(): Promise<BootstrapResponse> {
  persistCurrentQueryParams();

  const distinctId = getOrCreateDistinctId();
  const apiConfig = getPersistedApiConfig();
  const currentUrl = new URL(window.location.href);
  const bootstrapPath = import.meta.env.DEV ? "/_local/bootstrap" : "/api/bootstrap";
  const bootstrapUrl = new URL(bootstrapPath, window.location.origin);

  bootstrapUrl.searchParams.set("distinct_id", distinctId);
  bootstrapUrl.searchParams.set("cached_design", localStorage.getItem(posthogStorageKeys.cachedDesign) || "");
  bootstrapUrl.searchParams.set("cached_variant", localStorage.getItem(posthogStorageKeys.cachedVariant) || "");

  for (const key of ["ld_variant", "ld_design", "ph_debug", "preview"] as const) {
    const value = currentUrl.searchParams.get(key);
    if (value) bootstrapUrl.searchParams.set(key, value);
  }
  if (apiConfig.apiKey) bootstrapUrl.searchParams.set("ph_project_api_key", apiConfig.apiKey);
  if (apiConfig.apiHost) bootstrapUrl.searchParams.set("ph_api_host", apiConfig.apiHost);

  const response = await fetch(bootstrapUrl, {
    method: "GET",
    cache: "no-store",
    credentials: "include",
  });

  const payload = await response.json();
  const parsed = bootstrapResponseSchema.parse(payload);

  localStorage.setItem(posthogStorageKeys.cachedDesign, String(parsed.designId));
  if (parsed.flagVariant) {
    localStorage.setItem(posthogStorageKeys.cachedVariant, parsed.flagVariant);
  } else {
    localStorage.removeItem(posthogStorageKeys.cachedVariant);
  }

  return parsed;
}
