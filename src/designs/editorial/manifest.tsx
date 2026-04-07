import "./tokens.css";
import { loadEditorialFonts } from "../font-loaders";
import type { DesignManifest } from "../types";

const manifest: DesignManifest = {
  id: 4,
  slug: "editorial",
  label: "Editorial",
  loadFonts: loadEditorialFonts,
};

export default manifest;
