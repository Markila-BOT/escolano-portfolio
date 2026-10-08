# Tasks

## 1. Evidence data and classification

- [x] 1.1 Add typed spelling aliases and an explicit allowlist of qualifying work-role references in `lib/data.ts`, plus a pure evidence resolver; verify existing source titles, dates, tags and all 22 skill labels/icons/order remain unchanged, and strict TypeScript passes.
- [x] 1.2 Add focused resolver checks for professional precedence, project-only and missing evidence, NextJS/Tailwind CSS/NestJS aliases, excluded training/relocation entries, no HTML/CSS inference, stale references, removed-source downgrades, deterministic source order and deduplication; verify the current 11 professional / 4 project-only / 7 unlinked baseline against actual data.
- [x] 1.3 Document how to add or remove evidence through source tags and explicit aliases/work-role references; verify examples resolve to existing records and explain why skill-list membership, dependencies and project descriptions do not grant professional status.

## 2. Visual evidence and source inspection

- [x] 2.1 Render the separate Skill evidence block after chips and before toolkit when present, using current groups/order, explanatory copy, compact icon-and-text statuses, closed native disclosures for supported skills, and plain neutral rows for unsupported skills; verify all 22 statuses and expanded source kind/title/date/original tag values match the resolver and no ratings or empty controls appear.
- [x] 2.2 Verify evidence controls by keyboard and touch, focus visibility, exposed expanded state, independent disclosures, 44px targets, readable contrast and wrapping at 390px/1280px in light/dark and reduced motion; save representative screenshots and the results in a change-local verification report.

## 3. Integration and acceptance

- [x] 3.1 Verify original chip membership/icons/order and section navigation remain intact; if toolkit is implemented, verify its closed category controls, fixed sentences and independent opening still work with no evidence badges inside them; record coexistence or current toolkit absence without implementing that separate change.
- [x] 3.2 Run `pnpm lint`, `pnpm exec tsc --noEmit`, `pnpm build`, and strict OpenSpec validation; resolve change-attributable failures, record results, and only after acceptance mark CHECKLIST.MD's selected visual proficiency item complete with evidence-based usage wording. Use an available running app or production preview for browser checks; do not start `pnpm dev` unless requested.
