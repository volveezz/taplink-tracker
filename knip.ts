const config = {
  entry: [
    "index.html",
    "preview/index.html",
    "src/app/entry-preview.tsx",
    "api/**/*.ts",
  ],
  project: [
    "index.html",
    "preview/index.html",
    "src/**/*.{ts,tsx,css}",
    "api/**/*.ts",
  ],
};

export default config;
