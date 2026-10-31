# Dependency maintenance

## Same-major pass — 2026-10-31

Ran `pnpm outdated`, refreshed declared ranges, and audited the resulting lockfile. Approved the `unrs-resolver` build script. Scoped overrides update glob 10.3.10 to 10.5.0 and Next's PostCSS 8.4.31 to 8.5.28. Next 14.2, React 18.3 and Tailwind 3.4 remain installed.

The remaining high/critical advisories are on Next 14.2.35, with no fix on that major reported by the registry:

- GHSA-h25m-26qc-wcjf: patched >=15.0.8.
- GHSA-q4gf-8mx6-v5v3: patched >=15.5.15.
- GHSA-8h8q-6873-q5fj, GHSA-c4j6-fc7j-m34r, GHSA-36qx-fr4f-26g5: patched >=15.5.16.
- GHSA-m99w-x7hq-7vfj, GHSA-89xv-2m56-2m9x, GHSA-p9j2-gv94-2wf4: patched >=15.5.21.
- GHSA-p293-qw3h-jr36, GHSA-2xp9-vwfh-vxw4: patched >=15.5.24.
- GHSA-2464-fhr4-w9xw, GHSA-p3m5-59mp-jv5r: patched >=15.5.28.

No audit waivers were added. Lint, TypeScript, all 63 Node tests and the production build pass before the major migration.

## Next/React migration checkpoint

Installed Next 16.4.3, React/React DOM 19.3.1, matching React types, ESLint 9.39.5 and eslint-config-next 16.4.3. Updated AGENTS and convention docs for Next 16/React 19, retained Tailwind 3 pending its task, and replaced `next lint` with the ESLint CLI and flat configuration.

Compatibility corrections include nullable drawer refs, effect-time journey ref synchronization, frame-scheduled hydration/state initialization, and Next 16 portrait preloading with the existing 95 quality explicitly allowed. Next-specific rules are scoped away from CommonJS VM test fixtures and email document heads; the no-JavaScript fallback retains its native link with a documented local exception. Application hook checks remain enabled. The Next/React production build passed before the Tailwind migration.

## Completed migration

Installed Tailwind 4.3.3 with `@tailwindcss/postcss`, tailwind-merge 3.7.0 and its matching Prettier plugin. CSS explicitly loads the shared config using `@config`, retaining semantic colors and class-based dark mode. Removed the unused private flattenColorPalette integration. Updated Vaul to 1.1.2 and the vertical timeline to 4.0.0 for React 19 peer compatibility; `pnpm peers check` reports no conflicts.

Removed `@react-email/components` and `@react-email/tailwind`. A plain React email document uses inline email styles and is rendered inside the server action with `@react-email/render` 2.2.0 before Resend receives HTML. Acceptance/rejection behavior remains covered; a real-render check confirms markup is escaped and the sender/message text is retained. No email was sent during verification.

Final lint, TypeScript, 65 Node tests and Next 16 production build pass. No dev server was started. The production build reports non-fatal warnings for the existing Edge image route and the module syntax of the shared Tailwind TypeScript config.

An active process subsequently rewrote the workspace `.next` output, so the final browser smoke check used an isolated source snapshot at `/tmp/portfolio-maintenance.xoJdl5`, linked existing dependencies, and `pnpm build --webpack`. That build (`LT4rnxh0FZBU8xgJfoag9`) passes compilation and typechecking. Production Chrome checks at 390px show no horizontal document overflow on `/` or `/tools`; semantic foreground/background colors resolve to `rgb(10,25,47)`/`rgb(246,248,251)` in light mode and `rgb(204,214,246)`/`rgb(10,25,47)` in dark mode. Theme classes were switched directly for token verification; this was not a full manual accessibility audit. The temporary production server was stopped after checks.

The final registry audit reports zero high/critical advisories, one low (`deepmerge`, GHSA-gcqx-w48m-w2h4, patched >=4.3.2), and one moderate (`minimatch`, GHSA-g3hv-75wg-m249, patched >=11.0.1). No audit waivers are configured. These remaining transitive advisories are recorded rather than forced across unverified dependency-major boundaries.
