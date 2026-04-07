import "./tokens.css";
import { loadAuroraFonts } from "../font-loaders";
import type { DesignManifest } from "../types";

const manifest: DesignManifest = {
  id: 2,
  slug: "aurora",
  label: "Aurora",
  loadFonts: loadAuroraFonts,
};

export default manifest;
