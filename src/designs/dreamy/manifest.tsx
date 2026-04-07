import "./tokens.css";
import { FloatingParticles } from "../floating-particles";
import { loadDreamyFonts } from "../font-loaders";
import type { DesignManifest } from "../types";

function Ornaments() {
  return (
    <FloatingParticles
      assets={[
        "crystals_0.webp",
        "crystals_1.webp",
        "crystals_2.webp",
        "crystals_3.webp",
        "crystals_4.webp",
      ]}
    />
  );
}

const manifest: DesignManifest = {
  id: 7,
  slug: "dreamy",
  label: "Dreamy",
  loadFonts: loadDreamyFonts,
  Ornaments,
};

export default manifest;
