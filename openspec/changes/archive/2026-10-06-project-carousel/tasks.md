# Tasks

## 1. First view and peek

- [x] 1.1 In `components/projects.tsx`, set each slide to about 85% below `md`, 46% from `md`, and 30% from `lg`, scroll one slide at a time, and trim the last snap so the end has no empty gap. Remove the extra `gap-4` on `CarouselContent`. Keep every `projectsData` entry, in order, and keep the heading "My projects". Verify by reading the file: the three widths are set, `gap-4` is gone, and the list is still `projectsData.map`.

## 2. Controls and position

- [x] 2.1 Add a position function in `lib/data.ts` that formats the 1-based index and the total as `1 of 16`. In `components/projects.tsx`, remove `hidden md:block`, put Previous, that text, and Next in one row under the track, and override the absolute placement so the buttons sit in the row and do not cover a project image. Keep the accessible names "Previous slide" and "Next slide", and keep them on `Button` with the `react-icons` chevrons. Read the index from the carousel api on `select` and `reInit`. Verify with `pnpm exec tsc --noEmit`, and by reading the files: the function is not a hardcoded total, the buttons are outside the track, and `carousel.tsx` still uses `Button` and `react-icons`.

## 3. Reduced motion

- [x] 3.1 In `components/project.tsx`, skip the pointer tilt when `prefers-reduced-motion: reduce` matches. Leave the gradient cycle and the drawer. Verify by reading the file: the tilt values are not applied under reduced motion, and the drawer trigger is still there.

## 4. Check and update the checklist

- [x] 4.1 If something is already listening on port 3000, confirm at 320 px, at `md`, and at `lg`: the heading is "My projects"; the first view shows one, two, and three full cards, with the first project first; the next card peeks until the end, and the last view has no empty gap; Previous and Next are visible, do not cover a project image, and are named "Previous slide" and "Next slide"; Previous is disabled at the start and Next is disabled at the end; the position text starts at place 1 with the project total and updates after Next; a drag and ArrowRight on Next move the first visible project; with reduced motion, hovering a card does not tilt, and activating a card still opens its details; moving to the end shows every project once, in list order. Do not start the dev server. If nothing is listening, stop and leave 4.2 unchecked.
- [x] 4.2 After 4.1 passes, check checklist line 107 and set the current-spec row to 67 done, 11 partial, 32 not started, 67/110 (61%). If 4.1 did not run, leave the line and the row as they are. Verify by recounting with section 5 skipped and sections 11 and 12 counted as future.
