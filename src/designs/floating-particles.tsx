import type { CSSProperties } from "react";

type FloatingParticlesProps = {
  assets: string[];
  density?: number;
  speed?: number;
  minSize?: number;
  maxSize?: number;
  opacity?: number;
};

function buildParticles({
  assets,
  density = 20,
  speed = 1,
  minSize = 60,
  maxSize = 180,
  opacity = 0.5,
}: FloatingParticlesProps) {
  const viewportWidth = window.innerWidth;
  const mobile = viewportWidth < 600;
  const scale = mobile ? 0.35 : viewportWidth < 1024 ? 0.6 : 1;
  const count = Math.max(3, Math.round(density * scale));
  const resolvedMinSize = Math.round(minSize * (mobile ? 0.5 : 0.8));
  const resolvedMaxSize = Math.round(maxSize * (mobile ? 0.45 : 0.75));
  const resolvedOpacity = opacity * (mobile ? 0.7 : 1);
  const cols = Math.ceil(Math.sqrt(count * 1.5));
  const rows = Math.ceil(count / cols);

  return Array.from({ length: count }, (_, index) => {
    const cellWidth = 100 / cols;
    const cellHeight = 100 / rows;
    const size = resolvedMinSize + Math.random() * (resolvedMaxSize - resolvedMinSize);
    const duration = (12 + Math.random() * 16) / speed;
    const left = (index % cols) * cellWidth + Math.random() * cellWidth * 0.8;
    const top = Math.floor(index / cols) * cellHeight + Math.random() * cellHeight * 0.8;

    return {
      id: `${assets[index % assets.length]}-${index}`,
      src: `/assets/${assets[index % assets.length]}`,
      style: {
        top: `${top}%`,
        left: `${left}%`,
        width: `${size}px`,
        opacity: resolvedOpacity * (0.6 + Math.random() * 0.4),
        animationDuration: `${duration}s`,
        animationDelay: `${-Math.random() * duration}s`,
        ["--rot" as const]: `${Math.floor(Math.random() * 360)}deg`,
      } as CSSProperties & Record<"--rot", string>,
    };
  });
}

export function FloatingParticles(props: FloatingParticlesProps) {
  const particles = buildParticles(props);

  return (
    <div className="floating-particles" aria-hidden="true">
      {particles.map((particle) => (
        <img
          key={particle.id}
          className="floating-particle"
          src={particle.src}
          alt=""
          style={particle.style}
          loading="lazy"
        />
      ))}
    </div>
  );
}
