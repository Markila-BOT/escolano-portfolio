# Design

## Context

See proposal.md for why. MerchantSpring already has a `description` array and a `caseStudy`. The open drawer shows the case study and does not map the description. The carousel card in `components/project.tsx` shows the image, title, year, and tags. Optional fields on a project are narrowed with `in`, the same way as `videoUrl` and `caseStudy`. Copy lives in `lib/data.ts`.

## Goals / Non-Goals

**Goals:**

- One Build note on MerchantSpring, after the case study, using a label from the data file.
- The sentence is fixed by the spec and only restates the current description.

**Non-Goals:**

- A repository URL, a second project, or a note built from the technology tags.
- Changing the case study, the description paragraphs, the carousel card, or neighbor controls.

## Decisions

Add `buildNote` only on MerchantSpring, and a `projectBuildNote` label map whose `label` is `Build`. The component reads the label from that map.

Alternative: hardcode the heading in the component. Rejected. The other visible words on this card already come from `lib/data.ts`.

The sentence is: "It pulls the latest numbers, notes, and charts into a brand report for the accounts those teams manage across those marketplaces."

Alternative: repeat a description paragraph or a case-study sentence under the new heading. Rejected. The case study already occupies those sentences, and the spec forbids rendering the description paragraphs beside it.

When `"buildNote" in project`, the description card renders the note after the case study: an `h4` with the label, then the existing paragraph reveal. MerchantSpring has both fields, so the case study stays and the description array is still not mapped. A project without the field renders nothing extra.

Alternative: a title check for MerchantSpring inside the drawer. Rejected. A renamed title would drop the note, and the component would own a list the spec already fixes in data.

The carousel `Project` component does not receive the note.

Neighbor navigation already replaces the open project. The branch reads the project that is open, so Next from MerchantSpring is Lagoon with no note, and Previous from Lagoon brings the note back. Do not change `project-drawer-navigation`.

## Risks / Trade-offs

- [The note overlaps the outcome, because the description has no separate implementation paragraph] → Keep it to the one spec sentence, under Build, and do not paste the description or the case study again.
- [`as const` makes `buildNote` absent on the other projects] → Narrow with `"buildNote" in project`. Do not cast.
- [A later edit of the description can leave the note behind] → The description stays in the file. The spec scenario is the check that the sentence still only restates it.

## Migration Plan

Add the label, the field, and the branch. Rollback is removing `buildNote`, the label, and the branch. No data migration and no dependency install.

## Open Questions

None. The project, the form, and the no-URL rule are already chosen.
