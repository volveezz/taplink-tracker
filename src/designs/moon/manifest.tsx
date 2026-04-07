import "./tokens.css";
import { FloatingParticles } from "../floating-particles";
import { loadMoonFonts } from "../font-loaders";
import type { DesignManifest } from "../types";

function Ornaments() {
  return (
    <FloatingParticles
      assets={[
        "crypto_0.webp",
        "crypto_1.webp",
        "crypto_2.webp",
        "crypto_3.webp",
        "crypto_4.webp",
        "crypto_5.webp",
        "crypto_6.webp",
        "crypto_7.webp",
      ]}
    />
  );
}

const manifest: DesignManifest = {
  id: 10,
  slug: "moon",
  label: "Moon",
  loadFonts: loadMoonFonts,
  Ornaments,
};

export default manifest;
