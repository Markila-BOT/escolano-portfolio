# Design

## Context

See proposal.md for why the four service chips go. `skillGroups` in `lib/data.ts` renders the chips. Both WealthPark-era entries in `experiencesData` store the same technology names, and the timeline and the journey read that array. `resolveSkillEvidence` matches a chip label to a tag exactly. MerchantSpring has AWS and does not have the four service labels. The project filter is built from project tags, so those four labels are not filter options.

The main specs under `openspec/specs/` still end Tools at Cursor and still lock the 2023 role to six names. Two unarchived changes, `add-tools-and-experience` and `add-playwright-typeorm-react-aria`, already modify those requirements and still name the four services.

## Goals / Non-Goals

**Goals:**

- Delete the four labels from the one skills list and from the two role tag arrays.
- Leave AWS evidence as the two roles, then MerchantSpring.
- Make the skill-evidence test and `docs/skill-evidence.md` describe 28 skills.

**Non-Goals:**

- Changing the AWS note, the AWS icon, or the AWS label.
- Editing MerchantSpring, Azure DevOps, Stripe, Playwright, TypeORM, React Aria, or any other chip.
- Editing role descriptions, or naming WealthPark on the timeline.
- Adding a filter option or a new dependency.

## Decisions

1. Delete the four skill objects and the eight tag strings. Do not fold S3, SES, SQS, or SNS into the AWS note. The note is not rendered, and the request is to have one AWS item.
   Alternative: keep the chips and hide them in the UI. That leaves selectable skills and evidence rows the visitor was asked to drop.

2. Keep the `FaAws` import. AWS still uses it. The four removed chips were the other `FaAws` uses.

3. In `tests/skill-evidence.test.cjs`, drop the four labels from `professional` and delete them from the roles-only loop. Leave Azure DevOps in that loop. Leave AWS in the loop that expects the two roles and then MerchantSpring. Set the count to 28.
   Alternative: assert that resolving a removed label throws. The function still returns unlinked evidence for an unknown label, and the portfolio test iterates `skillGroups`, so a missing chip is covered by the count and the membership list.

4. The deltas list the full post-change Tools order and the full post-change role names, including chips this change does not add. Archive copies a MODIFIED requirement over the main spec. A delta that only said "remove four names" would restore "Tools ends at Cursor" if it were written against the stale main spec.

## Risks / Trade-offs

- [Archiving `add-tools-and-experience` or `add-playwright-typeorm-react-aria` after this change] → those deltas still require the four service names and would put the chips back. Archive those two changes first, then archive this one last. This change does not edit their artifacts.
- [The AWS chip no longer tells a visitor which services were used] → accepted. The chip stays "AWS", and the four names are not moved into a note or a description.

## Migration Plan

Edit the portfolio records, the skill-evidence test, and the skill-evidence doc. No deploy step and no stored user data. Rollback is reverting that commit.

## Open Questions

None.
