# Design

## Context

See proposal.md for why. `skillsData` in `lib/data.ts` is a flat list of 22 chips, and `components/skills.tsx` is the only consumer. It maps that list into one `ul` of `TagChip`s under the `h2` "My skills". Group headings have to sit under that `h2`. Chip labels and icons stay, including the CSS chip's current icon.

## Goals / Non-Goals

**Goals:**

- Three groups in the skills data, rendered as a heading plus the existing chip list.
- Skip a group that has no chips, so Design is absent.

**Non-Goals:**

- One-line notes, proficiency marks, a new chip, or a new icon for CSS.
- A second chip component or a new dependency.

## Decisions

Replace the flat `skillsData` export with `skillGroups`: an ordered list of `{ label, skills }`. The chip objects move into those groups unchanged. `components/skills.tsx` is the only import, so a parallel flat export is unused.

The three groups, in order:

- Languages: HTML, CSS, JavaScript, TypeScript, Rust
- Tools: React, Next.js, Node.js, Git, Tailwind, Redux, GraphQL, Nest.js, Express, Framer Motion, Claude Code, Codex, Cursor
- Databases: MongoDB, MySQL, PostgreSQL, Firebase

Do not add a Design group. The section renders a group only when it has at least one chip, so an empty heading cannot appear later by accident.

Each group is an `h3` plus a `ul` that uses the current chip markup and the current fade. The section title stays the existing `h2`.

Alternative: keep one flat array and add a category field, then group in the component. Rejected. The groups are the content, and the only reader is the skills section.

Alternative: show an empty Design heading. Rejected. The chosen grouping leaves Design off until a chip belongs there.

## Risks / Trade-offs

- [Moving the databases changes the flat reading order that `skills-ai-tools` required] → The delta updates that spec. Claude Code, Codex, and Cursor stay inside Tools, immediately after Framer Motion.
- [A group heading at `h2` would compete with the section title] → Group headings are `h3`.

## Migration Plan

Move the existing chip entries into `skillGroups` and render one heading and list per group. Rollback is flattening the groups back into one list. No dependency install.

## Open Questions

None.
