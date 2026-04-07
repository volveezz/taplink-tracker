import { designDefinitions, supportedDesignIds } from "../../shared/config/designs.js";

const canonicalDesignVariantMap = new Map<string, number>([
  ["control", 1],
  ...designDefinitions
    .filter((design) => design.id !== 1)
    .map((design) => [`design-${design.id}`, design.id] as const),
]);

export function isSupportedDesignId(value: number): boolean {
  return (supportedDesignIds as readonly number[]).includes(value);
}

export function getDefaultDesignId(): number {
  return designDefinitions[0]?.id ?? 1;
}

export function resolveDesignFromVariant(value: unknown): number | null {
  if (value === null || value === undefined || value === "" || value === false) return null;
  const normalized = String(value).trim().toLowerCase();
  const mapped = canonicalDesignVariantMap.get(normalized);
  return mapped && isSupportedDesignId(mapped) ? mapped : null;
}
