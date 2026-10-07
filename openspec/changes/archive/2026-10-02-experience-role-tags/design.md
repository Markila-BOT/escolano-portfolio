# Design

## Context

`experiencesData` has 12 entries and no technology field. Nine of them are roles. Three are not: "Fly back home", "Fly to Japan", and "Education". `components/experience.tsx` prints title, location, and description in the timeline card and, when the journey is open, in the stop card. `buildExperienceJourney` copies those fields onto each stop and drops anything it does not name.

Project cards already render `TagChip`. The compact size is uppercase at about 8px, which is too small for a line someone reads inside a role. The default size is padded for a project drawer. `openspec/specs/uniform-components/spec.md` requires a skill chip and a project tag to share one chip. This change uses that chip and does not restyle those two.

## Goals / Non-Goals

**Goals:**

- One list of names per role, shown the same way on the timeline and the journey stop.
- Names a visitor can read at body size, in both themes.
- No chips on the three entries that are not roles.

**Non-Goals:**

- Icons on the role chips. Project tags keep theirs.
- Linking a chip to a project or filtering the page by it.
- Drawing the names into the 3D scene.
- Changing the journey's travel, sound, or switch behavior.

## Decisions

### Names live on the entry

Each role gets a `tags` array of strings in `experiencesData`. The journey helper copies it through. The three non-roles omit the field, and the helper treats a missing field as an empty list.

The lists are the distinct tools from the projects of that period, kept short the way Brittany Chiang keeps a role's list short. They are not the union of every overlapping project.

| Entry | Tags |
| --- | --- |
| Senior Software Engineer | TypeScript, React, NextJS, Tailwind CSS, GraphQL, NestJS |
| Full Stack Engineer | TypeScript, React, Node.js, Express, MySQL |
| Lead Software Engineer | TypeScript, React |
| Front-End Engineer | TypeScript, React, JavaScript |
| Apply training knowledge | TypeScript, React, Redux |
| Training in United Kingdom | JavaScript, React |
| Promoted | Java |
| First Job | C |
| Internship | Java |
| Fly back home, Fly to Japan, Education | none |

"Apply training knowledge" and "Training in United Kingdom" are included because the descriptions are about the work, and the projects of those years are Iris and Rakuten Travel. The two "Fly" entries and Education are not roles.

### One chip, a third size

Add `size="label"` to `TagChip`: `text-sm`, a full rounding, the secondary surface and its text, and the shared border. Timeline and journey both use that size, words only, in a wrapping row under the description. Do not use `compact`.

The row is a `ul`. Each name is an `li` so the list is announced as a list. No heading is added, so the page keeps a single `h1` and the section keeps its `h2`.

## Risks / Trade-offs

- [A role's real tools differ from the table] → The table is the list to ship. Change it in this design before implementation if a name is wrong.
- [The label size drifts from the project chip] → It is the same component. Only the size classes differ, the way `compact` already does.
- [The stop card grows] → The names wrap. The canvas height stays as it is.

## Migration Plan

No data migration. Add the arrays and render them. To roll back, remove the field and the two rows.

## Open Questions

None. The table above is the list.
