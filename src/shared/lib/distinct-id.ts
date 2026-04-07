import { posthogStorageKeys } from "@/shared/config/posthog";

export function getOrCreateDistinctId(): string {
  const existing = localStorage.getItem(posthogStorageKeys.distinctId);
  if (existing) return existing;

  const created =
    typeof crypto.randomUUID === "function"
      ? crypto.randomUUID()
      : `ld-${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`;

  localStorage.setItem(posthogStorageKeys.distinctId, created);
  return created;
}
