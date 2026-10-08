# Tasks

## 1. View selection

- [x] 1.1 Add view-switch and rail action copy to `lib/data.ts` and Carousel/Rail Buttons to `components/projects-interactive.tsx`, with Carousel default, pressed state, and hydration-only switch visibility; verify keyboard activation, one visible browsing view, and readable default content without JavaScript.
- [x] 1.2 Preserve the mounted carousel and independent rail selection, reinitializing Embla after returning to Carousel while restoring its snap; verify repeated view changes and resizing retain the browsing state of both views and do not leave hidden controls focusable.

## 2. Expandable rail

- [x] 2.1 Create section-specific `components/project-rail.tsx` using existing primitives and project-derived types, with all titles once in order, the first preview expanded, and activation-only single selection; verify first/last selection, repeated activation, and no selection change on hover or focus.
- [x] 2.2 Render image, title, description, tags, and a separate details action; implement compact desktop lanes at `lg` and stacked rows below it with semantic tokens and reduced-motion handling; verify the full list and long titles at 320, 768, 1024, and 1440 px in both themes without page overflow.
- [x] 2.3 Add stable title/panel relationships, expanded-state announcements, 44 px targets, and focus-visible styles; verify Tab, Enter, and Space selection, focus retention on the title, no hidden panel controls in the tab order, and instant selection with reduced motion.

## 3. Drawer integration

- [x] 3.1 Connect rail details actions to the existing drawer opener and focus-return reference; verify rail previews and carousel position stay fixed while drawer neighbors change, first/last disabled controls behave as specified, and closing returns focus to the original rail action.
- [x] 3.2 Verify sound off/on behavior for rail/view selection and drawer opening/closing, plus projects with video, screenshots, case studies, build notes, and absent website links; record the checks alongside rail usage and keyboard behavior in `docs/project-rail.md`.

## 4. Integration verification

- [x] 4.1 Run `pnpm lint`, `pnpm exec tsc --noEmit`, and `pnpm build`; run the existing `tests/portfolio-html.py` check against generated production HTML and verify JavaScript-disabled default content. Use a production server if browser verification needs one; do not start `pnpm dev` unless requested.
- [x] 4.2 Recheck existing carousel card counts, peek, drag, position text, and keyboard controls after switching back from Rail; record combined browser results in `docs/project-rail.md`, then mark the expandable-rail checklist row done and reconcile affected progress totals only when all acceptance checks pass.
