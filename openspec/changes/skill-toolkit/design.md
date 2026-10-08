# Design

## Context

See proposal.md for why. `skillGroups` in `lib/data.ts` is the only source for the skill chips. `components/skills.tsx` renders those groups as an `h3` and a chip list under the `h2` My skills. There is no accordion primitive. `@radix-ui/react-dialog` is installed, and it is the wrong control for a disclosure.

## Goals / Non-Goals

**Goals:**

- One `note` on each existing skill, rendered only in My toolkit.
- Native disclosures that start closed and can stay open together.

**Non-Goals:**

- A shared accordion primitive, a new dependency, or a new navigation item.
- A sentence on the chips, a Design group, or a proficiency mark.

## Decisions

Add `note` to each skill object in `skillGroups`. The toolkit reads that same list, so the tool order cannot drift from the chips.

After the chip groups, render `SectionHeading` with the text My toolkit, then one `details` per non-empty group. Do not set `open`. The `summary` is the group label. Inside, list each skill's name and `note`. The chip list does not render `note`.

`details` allows more than one group to stay open, which matches the spec. The summary is a native control, so the keyboard and the accessible name come with it. Give the summary a minimum height of 44px on coarse pointers.

Alternative: `@radix-ui/react-accordion`. Rejected. The Radix note says to add a primitive when the control is reusable. This disclosure is one section, and `details` already opens and closes.

Alternative: a second copy of the tool list. Rejected. The chips and the toolkit would diverge the next time a tool is added.

## Risks / Trade-offs

- [MySQL and PostgreSQL share the sentence "A relational database."] → The portfolio data does not distinguish them further, and a sharper sentence would be a new claim. The spec locks that wording.
- [The category names appear twice, once as a chip heading and once as a summary] → The summary sits under the My toolkit heading, so it is a control, not a second chip heading.

## Migration Plan

Add the notes and the toolkit block. Rollback is removing `note` and the block. No dependency install.

## Open Questions

None. The sentences in the spec are the ones to ship. Edit that spec before implementation if a sentence should change.
