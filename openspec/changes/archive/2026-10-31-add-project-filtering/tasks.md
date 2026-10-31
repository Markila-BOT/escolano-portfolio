# Tasks

## 1. Filter state

- [x] 1.1 Add one labeled filter in `components/projects-interactive.tsx` listing All and each distinct project tag. Verify a test selects a tag and sees only matching titles in published order, and that All restores the full list.
- [x] 1.2 Pass the filtered list to the carousel, the rail, the position total, and drawer Previous/Next. Verify Next from a filtered project opens the next match and a project outside the filter is not shown. Close the drawer when the open project falls out of the filter.

## 2. Layout checks

- [x] 2.1 Verify the controls wrap at 320px without covering cards, in both themes, and that an empty selection renders the empty sentence. Run `pnpm lint` and `pnpm exec tsc --noEmit` and verify they pass. Do not start the dev server.
