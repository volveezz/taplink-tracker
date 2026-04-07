import type { DesignManifest } from "./types";
import { getDesignDefinitionById } from "@/shared/config/designs";

const manifestModules = import.meta.glob<{ default: DesignManifest }>("./*/manifest.tsx");

export async function loadDesignManifest(designId: number): Promise<DesignManifest> {
  const definition = getDesignDefinitionById(designId);
  if (!definition) throw new Error(`Unsupported design "${designId}"`);

  const loader = manifestModules[`./${definition.slug}/manifest.tsx`];
  if (!loader) throw new Error(`Missing manifest for design "${definition.slug}"`);

  const module = await loader();
  await module.default.loadFonts();
  return module.default;
}
