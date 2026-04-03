const FONT_IMPORTERS = {
  1: () => Promise.all([
    import('@fontsource/archivo-black/latin-400.css'),
    import('@fontsource/space-mono/latin-400.css'),
    import('@fontsource/space-mono/latin-700.css'),
  ]),
  2: () => Promise.all([
    import('@fontsource-variable/outfit/wght.css'),
  ]),
  3: () => Promise.all([
    import('@fontsource/vt323/latin-400.css'),
    import('@fontsource-variable/fira-code/wght.css'),
  ]),
  4: () => Promise.all([
    import('@fontsource-variable/playfair-display/wght.css'),
    import('@fontsource-variable/playfair-display/wght-italic.css'),
    import('@fontsource-variable/cormorant-garamond/wght.css'),
    import('@fontsource-variable/cormorant-garamond/wght-italic.css'),
  ]),
  5: () => Promise.all([
    import('@fontsource/rajdhani/latin-400.css'),
    import('@fontsource/rajdhani/latin-500.css'),
    import('@fontsource-variable/orbitron/wght.css'),
  ]),
  6: () => Promise.all([
    import('@fontsource-variable/outfit/wght.css'),
    import('@fontsource/archivo-black/latin-400.css'),
  ]),
  7: () => Promise.all([
    import('@fontsource-variable/outfit/wght.css'),
  ]),
  8: () => Promise.all([
    import('@fontsource/rajdhani/latin-400.css'),
    import('@fontsource/rajdhani/latin-500.css'),
    import('@fontsource/rajdhani/latin-600.css'),
    import('@fontsource/rajdhani/latin-700.css'),
  ]),
  9: () => Promise.all([
    import('@fontsource-variable/cormorant-garamond/wght.css'),
    import('@fontsource-variable/cormorant-garamond/wght-italic.css'),
  ]),
  10: () => Promise.all([
    import('@fontsource/rajdhani/latin-400.css'),
    import('@fontsource/rajdhani/latin-500.css'),
    import('@fontsource-variable/orbitron/wght.css'),
  ]),
};

const loadedDesigns = new Set();

export function preloadDesignFonts(design) {
  if (loadedDesigns.has(design)) return Promise.resolve();
  const loadFonts = FONT_IMPORTERS[design] || FONT_IMPORTERS[1];
  return loadFonts().then(() => {
    loadedDesigns.add(design);
  });
}
