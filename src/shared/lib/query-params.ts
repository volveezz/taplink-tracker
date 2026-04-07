import { posthogStorageKeys } from "@/shared/config/posthog";

function getStoredParams(): string {
  return localStorage.getItem(posthogStorageKeys.queryParams) || "";
}

export function persistCurrentQueryParams(): void {
  const params = window.location.search.slice(1);
  if (params) localStorage.setItem(posthogStorageKeys.queryParams, params);
}

export function appendStoredParams(url: string): string {
  const params = getStoredParams();
  if (!params) return url;

  try {
    const absoluteUrl = new URL(url, window.location.origin);
    const searchParams = new URLSearchParams(params);
    searchParams.forEach((value, key) => {
      if (!absoluteUrl.searchParams.has(key)) absoluteUrl.searchParams.set(key, value);
    });
    return absoluteUrl.toString();
  } catch {
    return `${url}${url.includes("?") ? "&" : "?"}${params}`;
  }
}
