# Taplink Tracker

Modular Vite + React + TypeScript landing app with a separate preview surface and Vercel API routes.

## Runtime shape

- [`index.html`](./index.html) serves the public `/` entrypoint
- [`preview/index.html`](./preview/index.html) serves the isolated `/preview/` entrypoint
- [`api/bootstrap.ts`](./api/bootstrap.ts) resolves the active design and merged PostHog payloads
- [`src/designs`](./src/designs) contains lazy design packs so `/` does not ship every design eagerly

## Local commands

```bash
bun install
bun run dev
bun run dev:vite
bun run build
bun run preview
bun run typecheck
bun run lint
bun run test
bun run test:e2e
bun run knip
```

`bun run dev` starts the app through Vite with a local `/api/bootstrap` dev handler.

`bun run dev:vercel` is still available when you want to exercise the Vercel routing layer directly.

## Tooling

- Package manager: Bun
- Frontend: Vite + React 19 + TypeScript 6
- Styling: Tailwind 4 plus per-design token CSS
- Linting: oxlint
- Formatting: oxfmt
- Dead code checks: knip
- Unit tests: Vitest
- E2E tests: Playwright

## Feature flags

The app uses four PostHog flags:

- `landing-design-experiment`
- `linkdrop-ui-config`
- `linkdrop-profile-experiment`
- `linkdrop-contact-options-experiment`

Merge order:

1. `linkdrop-ui-config`
2. `linkdrop-profile-experiment`
3. `linkdrop-contact-options-experiment`
4. `landing-design-experiment`

The three payload-backed flags share the same config schema and are merged in order. Design assignment is resolved separately so the public page only loads the selected design pack.

Canonical design variants:

- `control` -> design `1`
- `design-2` -> design `2`
- `design-3` -> design `3`
- `design-4` -> design `4`
- `design-5` -> design `5`
- `design-6` -> design `6`
- `design-7` -> design `7`
- `design-8` -> design `8`
- `design-9` -> design `9`
- `design-10` -> design `10`

The resolver is strict on purpose. Unknown variant names are ignored instead of being guessed.

## Current behavior rules

- Links support `active`, `disabled`, and `hidden`
- Local-only customization bloat was removed
- Preview only accepts the same schema-backed payload shape used by PostHog
- The public page should never embed all designs, fonts, or ornaments eagerly

## Debugging

Useful query params:

- `?ld_variant=design-6`
- `?ld_variant=control`
- `?ld_design=4`

These are for manual testing and override normal assignment behavior.
