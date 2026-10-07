# Verification — 2026-10-06

## Result

All nine implementation tasks are complete. The checklist primitive-shape item is checked. Recounted current scope: 75 done, 11 partial, 31 not started, 75/117 (64%); future: 0 done, 1 partial, 14 not started.

## Automated checks

- `pnpm lint`: passed with no warnings or errors.
- `pnpm exec tsc --noEmit`: passed, including the approved drawer focus follow-up.
- Prettier check: passed for all four primitive modules, project callers, both edited convention documents, and CHECKLIST.MD.
- `git diff --check`: passed.
- Dependency correction: ESLint pinned from 9.39.5 to 8.57.1, matching installed eslint-config-next 14.2.35's peer range (^7.23.0 || ^8.0.0). Existing lint command and rules retained; package and lockfile updated. ESLint 8 is the compatibility pin for Next 14, documented in technology-convention.md.

## Browser verification

Used the existing Next server at localhost:3000 after an authorized HTTP check returned 200. Initial sandbox HTTP requests failed; no second server was needed. Browser access succeeded after the user authorized continuation and server reachability was established.

Tested at 1280×900 and 390×844, in light and dark themes:

- Drawer opens and its close button receives focus; button close and Escape restore focus to the original project card.
- Tab from the last enabled drawer control wraps to Close project; Shift+Tab from Close project wraps back inside the drawer.
- Moving Potato V3 → MatterWorx transfers focus to the enabled Next button. Moving ECUs → Lawson Smart Report transfers focus to the enabled Previous button. Both React 18 button refs work.
- DrawerClose asChild renders a single button carrying drawer-close; no nested buttons and no ref-related browser warnings.
- Carousel root, inner flex track, items, and arrows expose their corresponding slots. Arrow slots override Button's default slot.
- Carousel Next changes position from 1 to 2; mobile drag changes position from 1 to 2. Home/End reach boundaries with correct disabled states; mobile End reports 16 of 16. ArrowRight/ArrowLeft move between MatterWorx and Potato V3 and focus the selected card.
- Drawer screenshots and label chips render correctly at both widths in both themes; mobile footer controls remain visible. Submit and CV share matching fill, text color, and rounded shape in each theme. Keyboard focus rings are visible in both themes.
- No contact form submission or CV download was performed. Temporary viewport override was reset and the original dark theme restored.

## Approved follow-up

Browser checks discovered an existing focus-return failure because Projects opens the drawer without a Vaul Trigger. The user authorized the fix: retain the originating card element, focus the named close button on open, and restore the card through onCloseAutoFocus. Vaul continues to provide focus containment. Project's onOpen handler now carries the click event.

## Existing observations outside scope

The project drawer still emits existing Radix warnings for missing DialogTitle/Description wiring. These are separate from the primitive refactor and the approved focus fix; no ref-related warnings were recorded. No full WCAG audit or production build was part of this verification.

## Screenshots

- [Desktop dark drawer](evidence/desktop-dark-drawer.jpg)
- [Desktop light drawer](evidence/desktop-light-drawer.jpg)
- [Mobile dark drawer](evidence/mobile-dark-drawer.jpg)
- [Mobile light drawer](evidence/mobile-light-drawer.jpg)
- [Mobile dark carousel](evidence/mobile-dark-carousel.jpg)
- [Mobile light carousel](evidence/mobile-light-carousel.jpg)
- [Desktop dark contact](evidence/desktop-dark-contact.jpg)
- [Desktop light contact](evidence/desktop-light-contact.jpg)
