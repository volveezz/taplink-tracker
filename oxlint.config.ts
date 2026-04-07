import { defineConfig } from "oxlint";

export default defineConfig({
  plugins: ["typescript", "react", "react-perf", "jsx-a11y", "import"],
  env: {
    browser: true,
    es2024: true,
    node: true,
  },
  ignorePatterns: [
    "dist/**",
    "coverage/**",
    "node_modules/**",
    ".vercel/**",
  ],
  rules: {
    "import/no-cycle": "error",
    "jsx-a11y/alt-text": "error",
    "jsx-a11y/anchor-has-content": "error",
    "react/jsx-key": "error",
    "react/no-array-index-key": "off",
    "react/no-danger": "off",
    "react/no-unknown-property": "error",
    "react-perf/jsx-no-new-object-as-prop": "off",
    "typescript/no-explicit-any": "error",
    "typescript/no-non-null-assertion": "error"
  },
  overrides: [
    {
      files: ["api/**/*.ts", "*.config.ts", "knip.ts"],
      env: {
        browser: false,
        node: true,
      },
      rules: {
        "typescript/no-explicit-any": "off",
      },
    },
  ],
});
