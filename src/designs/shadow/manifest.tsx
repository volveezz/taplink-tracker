import "./tokens.css";
import { FloatingParticles } from "../floating-particles";
import { loadShadowFonts } from "../font-loaders";
import type { DesignManifest } from "../types";

function Ornaments() {
  return (
    <FloatingParticles
      assets={[
        "hacker_0.webp",
        "hacker_1.webp",
        "hacker_2.webp",
        "hacker_3.webp",
        "hacker_4.webp",
        "hacker_5.webp",
        "hacker_6.webp",
        "hacker_7.webp",
      ]}
    />
  );
}

const manifest: DesignManifest = {
  id: 8,
  slug: "shadow",
  label: "Shadow",
  loadFonts: loadShadowFonts,
  Ornaments,
};

export default manifest;
