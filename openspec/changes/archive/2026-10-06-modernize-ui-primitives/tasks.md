# Tasks

## 1. Button and label shape

- [x] 1.1 Update Button and Label with named ref-forwarding render functions, derived props where appropriate, and default `button`/`label` slots. Preserve ButtonProps, buttonVariants, asChild, styles, and caller overrides. Verify with `pnpm exec tsc --noEmit` and inspect the diff for unchanged exports and variants.
- [x] 1.2 Update docs/radix-ui-conventions.md to explain named implementations, slot markers, and React 18 forwardRef compatibility. Verify that it no longer implies removing ref forwarding and remains consistent with technology and React conventions.

## 2. Drawer shape

- [x] 2.1 Modernize Drawer wrappers and add the eight rendered drawer slots listed in design.md, including ref-forwarding Trigger and Close wrappers. Preserve Root defaults, Portal composition, handle markup, and all exports. Verify with `pnpm exec tsc --noEmit` and inspect that no host wrappers were added and all ref-bearing exports still forward their refs.
- [x] 2.2 On an already-running app, verify opening a project, closing via DrawerClose asChild and Escape, focus containment, focus return, and Previous/Next focus refs. Inspect rendered drawer slots and confirm no nested buttons or ref warnings. Record results; leave this task pending if no running app is available, and do not start pnpm dev unless requested.

## 3. Carousel shape

- [x] 3.1 Add the five carousel slots in design.md and named ref-forwarding implementations while retaining Embla viewport ownership, CarouselApi, orientation, opts, plugins, setApi, arrow states, icons, and local keyboard handling. Verify with `pnpm exec tsc --noEmit` and review unchanged API and event behavior in the diff.
- [x] 3.2 On an already-running app, verify arrows, swipe, ArrowLeft/ArrowRight/Home/End, boundary disabled states, and selected-project focus. Inspect that previous/next markers override Button's default marker and content marks the track. Record results; keep pending if no running app is available without starting pnpm dev.

## 4. Integration and checklist

- [x] 4.1 Format the touched files using the repository Prettier configuration, then run `pnpm lint` and `pnpm exec tsc --noEmit`. Verify all checks pass and dependency changes are limited to the user-authorized ESLint 8.57.1 compatibility pin; document that pin in docs/technology-convention.md and record any pre-existing failures separately.
- [x] 4.2 Verify shared button appearance, label rendering, drawer layout, and carousel layout on mobile and desktop in both themes, including visible keyboard focus. Use an already-running app without submitting the contact form; record evidence and keep pending if runtime verification is unavailable.
- [x] 4.3 After the preceding checks pass, update CHECKLIST.MD section 1.4 to describe the four modernized primitives and the React 18 ref exception, check the selected item, and recount its Progress table using the existing counting rules. Verify only this feature's checkbox changes and the totals match the current checklist.
