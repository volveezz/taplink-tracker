import "./tokens.css";
import { FloatingParticles } from "../floating-particles";
import { loadHustleFonts } from "../font-loaders";
import type { DesignManifest } from "../types";

function Ornaments() {
  return (
    <FloatingParticles
      assets={[
        "money_0.webp",
        "money_1.webp",
        "money_2.webp",
        "money_3.webp",
        "money_4.webp",
        "money_5.webp",
        "money_6.webp",
        "money_7.webp",
      ]}
    />
  );
}

const manifest: DesignManifest = {
  id: 6,
  slug: "hustle",
  label: "Hustle",
  loadFonts: loadHustleFonts,
  Ornaments,
};

export default manifest;
