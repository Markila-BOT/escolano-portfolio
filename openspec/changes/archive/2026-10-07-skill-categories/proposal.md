# Proposal

## Why

The skills section is one flat list of 22 chips. A visitor looking for a language, a tool, or a database has to pick it out of the mix. The checklist asks for those groups, the way a reference portfolio groups languages, tools, databases, and design.

## What Changes

- The skills section shows three groups, in this order: Languages, Tools, Databases.
- Languages: HTML, CSS, JavaScript, TypeScript, Rust.
- Tools: React, Next.js, Node.js, Git, Tailwind, Redux, GraphQL, Nest.js, Express, Framer Motion, Claude Code, Codex, Cursor.
- Databases: MongoDB, MySQL, PostgreSQL, Firebase.
- No Design heading. No current chip is a design tool, so that heading stays off until a chip belongs there.
- Labels and icons stay. No new chips, no one-line notes, and no proficiency marks.
- The section title stays "My skills".
- Claude Code, Codex, and Cursor stay inside Tools, immediately after Framer Motion. They are not their own group. Databases move to their own group after Tools, so those three chips are no longer after every existing chip.

## Capabilities

### New Capabilities

- `skill-categories`: The skills section groups the existing chips under Languages, Tools, and Databases, and does not show an empty Design heading.

### Modified Capabilities

- `skills-ai-tools`: The three AI chips stay in the Tools group, immediately after Framer Motion. The requirement that they follow every existing chip, and that the existing chips keep one flat order with Framer Motion last among them, changes once the databases sit in their own group after Tools.

## Impact

- `lib/data.ts`: the skills entries are grouped by category. Labels and icons stay.
- `components/skills.tsx`: one heading and one chip list per group.
- `CHECKLIST.MD`: the categorized skill sets item, after the behavior matches.
- Toolkit notes and visual proficiency stay on their own checklist lines.
- No new dependency. `unified-theme` and `uniform-components` still apply to each chip, and their requirements do not change. About and the introduction stay as they are.
