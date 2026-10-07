# Proposal

## Why

Each role in Experience is a sentence and a place. The projects already name the tools, and [Brittany Chiang](https://brittanychiang.com) puts that list on the role itself. A visitor reading the timeline, or the 3D journey, cannot see which tools belong to which role.

## What Changes

- Add a short list of technology names to each role in `experiencesData`. Show those names as text chips under the description on the timeline, and again on the journey's stop card.
- Leave the three entries that are not roles without chips: "Fly back home", "Fly to Japan", and "Education".
- Reuse the existing chip. Role chips are words only. Project chips keep their icons.
- Check checklist line 99 after the chips are verified in the browser, and recount. Until then the line stays open.

## Capabilities

### New Capabilities

- `experience-role-tags`: Each role shows its technology names as text chips on the timeline and on the journey stop, and a non-role entry shows none.

### Modified Capabilities

- None. The journey still shows the title, location, date, and description. The chips are added under that text. Skill chips and project tags keep their current requirement.

## Impact

- `lib/data.ts` gains a `tags` array on the role entries. The names come from the projects of that period, listed in `design.md`.
- `lib/experience-journey.ts` copies `tags` onto each stop.
- `components/experience.tsx` renders the chips in the timeline card and in the stop card.
- `components/ui/tag-chip.tsx` gains a readable label size. The compact project-card size stays as it is.
- No new package. The 3D scene does not draw the names.
- Checking line 99 moves the progress row from 64/110 (58%) to 65/110 (59%).
