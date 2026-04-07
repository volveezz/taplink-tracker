import "./tokens.css";
import { FloatingParticles } from "../floating-particles";
import { loadPrestigeFonts } from "../font-loaders";
import type { DesignManifest } from "../types";

function Ornaments() {
  return (
    <FloatingParticles
      assets={[
        "luxury_0.webp",
        "luxury_1.webp",
        "luxury_2.webp",
        "luxury_3.webp",
        "luxury_4.webp",
        "luxury_5.webp",
      ]}
    />
  );
}

const manifest: DesignManifest = {
  id: 9,
  slug: "prestige",
  label: "Prestige",
  loadFonts: loadPrestigeFonts,
  Ornaments,
};

export default manifest;
