# Tasks

## 1. Skills data

- [x] 1.1 Replace the flat `skillsData` export with `skillGroups` in `lib/data.ts`, moving each existing chip unchanged into Languages, Tools, or Databases in the order in design.md, and verify there is no Design group and no new chip, note, or icon
- [x] 1.2 Render one `h3` and one chip list per non-empty group in `components/skills.tsx`, keep the section title as the existing `h2`, and verify an empty group renders no heading

## 2. Page

- [x] 2.1 Verify in the browser that the skills section shows Languages, then Tools, then Databases; that each group contains only the chips named in the spec, in that order; that there is no Design heading, one-line note, or proficiency mark; that HTML is the first chip; and that Claude Code, Codex, and Cursor follow Framer Motion inside Tools, with MongoDB, MySQL, PostgreSQL, and Firebase after Cursor
- [x] 2.2 Run `pnpm exec tsc --noEmit` and verify it exits 0
- [x] 2.3 Check the categorized skill sets item in `CHECKLIST.MD` and recount the progress row with the existing rules
