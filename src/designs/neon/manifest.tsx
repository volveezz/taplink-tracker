import "./tokens.css";
import { loadNeonFonts } from "../font-loaders";
import type { DesignManifest } from "../types";

const manifest: DesignManifest = {
  id: 5,
  slug: "neon",
  label: "Neon",
  loadFonts: loadNeonFonts,
};

export default manifest;
