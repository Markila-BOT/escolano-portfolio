# Tasks

## 1. Role names

- [x] 1.1 Add the `tags` arrays from the table in `design.md` to the matching entries in `lib/data.ts`. Leave "Fly back home", "Fly to Japan", and "Education" without the field. Copy `tags` through `buildExperienceJourney`. Verify by printing the helper output: Internship is `["Java"]`, Senior Software Engineer starts with TypeScript and React, and the three non-roles have an empty list.

## 2. Chips in both views

- [x] 2.1 Add a `label` size to `components/ui/tag-chip.tsx` as `design.md` describes. Leave `default` and `compact` as they are. In `components/experience.tsx`, under the description in the timeline card and under the description in the journey stop card, render a `ul` of `TagChip` at `size="label"` for each name. Render nothing when the list is empty. Verify with `pnpm exec tsc --noEmit`.

## 3. Check and update the checklist

- [x] 3.1 If something is already listening on port 3000, confirm: the first three timeline cards show their names from the table; Internship shows Java; Education and both Fly entries show no chip; opening the journey and moving to Internship shows Java in the same order; the Senior stop shows TypeScript and React; the names are text, not canvas pixels; text meets 4.5:1 in both themes; a project chip still shows its icon. Do not start the dev server. If nothing is listening, stop and leave 3.2 unchecked.
- [x] 3.2 After 3.1 passes, check checklist line 99 and set the current-spec row to 65 done, 11 partial, 34 not started, 65/110 (59%). If 3.1 did not run, leave the line and the row as they are. Verify by recounting with section 5 skipped and sections 11 and 12 counted as future.
