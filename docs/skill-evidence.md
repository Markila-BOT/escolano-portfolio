# Skill evidence

The Skills section shows documented usage from the portfolio's existing tags. It does not rate ability. Missing evidence means no matching source is linked in this portfolio.

`skillGroups` controls membership and order. `resolveSkillEvidence` in `lib/skill-evidence.ts` reads `experiencesData`, `projectsData`, `skillEvidenceWorkRoles`, and `skillEvidenceAliases` from `lib/data.ts`.

- **Used professionally:** an explicitly listed work role has a matching technology tag. Experience sources appear before projects.
- **Used in projects:** at least one project tag matches, with no qualifying work-role match.
- **No linked evidence:** neither kind matches. The skill stays visible with a neutral, noninteractive row.

Add evidence by updating the relevant actual source record's tags. Do not add a badge level or duplicate the source title/date in the UI. For example, React is tagged on Senior Software Engineer; Framer Motion is tagged on Valuation; PostgreSQL is tagged on MatterWorx. Removing the last qualifying work-role match downgrades the status to project usage, or to unlinked if there are no project matches.

Only titles in `skillEvidenceWorkRoles` establish professional use. Add a role to that typed list only when its content documents actual work. Education, training-only, and relocation entries are excluded. Project tags alone do not prove employment or a particular contribution. Source spelling aliases are explicit: Next.js matches NextJS, Tailwind matches Tailwind CSS, and Nest.js matches NestJS. Source tags retain their original spelling in the disclosure.

Skill membership, installed dependencies, descriptions, and related technologies do not grant evidence. HTML/CSS are not inferred from React or LESS/SCSS. Git is tagged on every project. Claude Code, Codex, and Cursor are not inferred from the skills list or from editing this repository. They are tagged on MatterWorx, Potato V3, Owner Web App, Workflow, and House Elf.

Run `pnpm exec node --test tests/skill-evidence.test.cjs` to check classification, aliases, source removal, source order/deduplication, excluded entries, stale references, and all 22 current skills. The test uses built-in Node tests and the installed TypeScript transpiler to read static portfolio data; it adds no test framework dependency.

My skills unifies the chips and evidence. Select a chip to reveal its status and sources beneath its category. Selecting another chip replaces the panel; selecting the same chip closes it. Every skill is selectable, including unlinked skills, which show an explanation rather than an empty source list. Panels start closed. The chips preserve their existing labels, icons, grouping and order. My toolkit follows this unified block with unchanged notes and category behavior.
