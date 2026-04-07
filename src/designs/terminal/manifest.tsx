import "./tokens.css";
import { loadTerminalFonts } from "../font-loaders";
import type { DesignManifest } from "../types";

const manifest: DesignManifest = {
  id: 3,
  slug: "terminal",
  label: "Terminal",
  loadFonts: loadTerminalFonts,
};

export default manifest;
