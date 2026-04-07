import "./tokens.css";
import { loadBrutalFonts } from "../font-loaders";
import type { DesignManifest } from "../types";

const manifest: DesignManifest = {
  id: 1,
  slug: "brutal",
  label: "Brutal",
  loadFonts: loadBrutalFonts,
};

export default manifest;
