export const loadBrutalFonts = () =>
  Promise.all([
    import("@fontsource/archivo-black/latin-400.css"),
    import("@fontsource/space-mono/latin-400.css"),
    import("@fontsource/space-mono/latin-700.css"),
  ]).then(() => undefined);

export const loadAuroraFonts = () =>
  Promise.all([import("@fontsource-variable/outfit/wght.css")]).then(() => undefined);

export const loadTerminalFonts = () =>
  Promise.all([
    import("@fontsource/vt323/latin-400.css"),
    import("@fontsource-variable/fira-code/wght.css"),
  ]).then(() => undefined);

export const loadEditorialFonts = () =>
  Promise.all([
    import("@fontsource-variable/playfair-display/wght.css"),
    import("@fontsource-variable/playfair-display/wght-italic.css"),
    import("@fontsource-variable/cormorant-garamond/wght.css"),
    import("@fontsource-variable/cormorant-garamond/wght-italic.css"),
  ]).then(() => undefined);

export const loadNeonFonts = () =>
  Promise.all([
    import("@fontsource/rajdhani/latin-400.css"),
    import("@fontsource/rajdhani/latin-500.css"),
    import("@fontsource-variable/orbitron/wght.css"),
  ]).then(() => undefined);

export const loadHustleFonts = () =>
  Promise.all([
    import("@fontsource-variable/outfit/wght.css"),
    import("@fontsource/archivo-black/latin-400.css"),
  ]).then(() => undefined);

export const loadDreamyFonts = () =>
  Promise.all([import("@fontsource-variable/outfit/wght.css")]).then(() => undefined);

export const loadShadowFonts = () =>
  Promise.all([
    import("@fontsource/rajdhani/latin-400.css"),
    import("@fontsource/rajdhani/latin-500.css"),
    import("@fontsource/rajdhani/latin-600.css"),
    import("@fontsource/rajdhani/latin-700.css"),
  ]).then(() => undefined);

export const loadPrestigeFonts = () =>
  Promise.all([
    import("@fontsource-variable/cormorant-garamond/wght.css"),
    import("@fontsource-variable/cormorant-garamond/wght-italic.css"),
  ]).then(() => undefined);

export const loadMoonFonts = () =>
  Promise.all([
    import("@fontsource/rajdhani/latin-400.css"),
    import("@fontsource/rajdhani/latin-500.css"),
    import("@fontsource-variable/orbitron/wght.css"),
  ]).then(() => undefined);
