# Tasks

## 1. Unified selection and evidence presentation

- [x] 1.1 Replace static skill chips with section-specific accessible button controls and a single toggled selection; verify all 22 labels/icons, category membership/order, initial collapsed state, valid panel IDs, and cross-category selection replacement remain correct without changing shared TagChip behavior.
- [x] 1.2 Refactor the evidence renderer into one selected-skill panel beneath its category and remove the repeated evidence list; verify every skill's status and source kind/title/date/tag match the existing resolver, professional/project sources remain deduplicated and ordered, and unlinked selections show a neutral explanation with no empty source list.
- [x] 1.3 Add concise selection guidance and the evidence caveat through lib/data.ts and update docs/skill-evidence.md for the unified interaction; verify no standalone Skill evidence heading or always-visible status rows remain, no source records or classification rules change, and `pnpm exec node --test tests/skill-evidence.test.cjs` passes against current data.

## 2. Interaction and presentation verification

- [x] 2.1 Verify click/tap, Enter/Space, toggle-close, cross-category replacement, focus retention/ring, expanded state, control-panel association and minimum 44px targets; record browser results showing only one panel can be visible and unlinked chips work with the same controls.
- [x] 2.2 Verify and visually review 390px/1280px in light/dark with reduced motion, readable contrast, wrapped source text and no horizontal overflow; save change-local screenshots for the compact closed section and representative professional, project-only and unlinked selections, including a long source list.

## 3. Integration acceptance

- [x] 3.1 Verify Skills navigation/section observation and unchanged toolkit category controls, fixed notes and independent opening; record coexistence results and the requirement to sync/archive skill-evidence-indicators before this delta, without editing the predecessor artifacts or archiving either change during apply.
- [x] 3.2 Run `pnpm lint`, `pnpm exec tsc --noEmit`, a production build and `openspec validate compact-skill-evidence --strict`; resolve change-attributable failures and record a verification report. Use an available app or production preview, isolate build output if a running dev server owns .next, and do not start pnpm dev unless requested.
