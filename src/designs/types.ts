import type { ComponentType } from "react";
import type { DesignId, DesignSlug } from "@/shared/config/designs";

export type DesignManifest = {
  id: DesignId;
  slug: DesignSlug;
  label: string;
  loadFonts: () => Promise<void>;
  Ornaments?: ComponentType;
};
