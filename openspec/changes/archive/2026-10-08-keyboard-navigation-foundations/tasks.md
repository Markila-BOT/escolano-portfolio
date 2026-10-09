# Tasks

## 1. Modal mobile navigation

- [x] 1.1 Add the minimal shared React 18 Radix Dialog primitive and compose Header/MobileNav around the controlled modal, with named title, internal Close menu button, existing trigger name/expanded/content-ID relationship and semantic section links. Verify type checks and focused rendering tests for labels, refs and closed-content absence; add the modal cases to docs/keyboard-navigation.md.
- [x] 1.2 Implement close-button initial focus, Tab/Shift+Tab containment, background isolation, Escape/close dismissal and trigger focus return using primitive behavior. Preserve native section hashes, active-section updates and sound cues on link selection. Verify each case in the real browser and record focus/scroll evidence in docs/keyboard-navigation.md; add focused tests for navigation callbacks/state contracts using the existing Node harness.
- [x] 1.3 Close/reset the menu at the 960px desktop transition, release modal locks and move focus to the visible active/first desktop link only when focus was in the modal. Verify open-menu resize in both directions, ordinary closed resize and no stale reopening; add regression tests for reset/fallback logic and document observed behavior.

## 2. Main-content bypass

- [x] 2.1 Add a native first-tab Skip to main content anchor and stable programmatically focusable main landmark, with token-based focus styling above page chrome. Extend focused rendering/HTML tests for source order, target identity and tabIndex; verify actual focus and subsequent Tab with JavaScript enabled and disabled and record evidence in docs/keyboard-navigation.md.

## 3. Integration acceptance

- [x] 3.1 Verify both themes, reduced-motion immediate navigation, visible focus and existing desktop/header, theme/sound, project rail/drawer, journey and contact keyboard flows. Run focused tests, pnpm lint, formatting and isolated production/type/HTML checks without overwriting a running dev server's output; record results and any unresolved limitations in docs/keyboard-navigation.md.
- [x] 3.2 Update CHECKLIST.MD only to reflect verified keyboard support and skip-link completion, reconcile the already-single-heading subitem and recalculate progress if counts change. Keep full WCAG, comprehensive screen-reader and contrast audit rows open; verify the checklist agrees with recorded acceptance evidence and no unrelated features/dependencies changed.
