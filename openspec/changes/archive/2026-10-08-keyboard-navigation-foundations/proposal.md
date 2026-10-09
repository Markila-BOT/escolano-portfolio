# Proposal

## Why

The full-screen mobile navigation currently only hides and shows links; it has no focus containment, Escape dismissal or focus restoration. Keyboard visitors also have no way to bypass the header and reach the main content directly.

## What Changes

- Make the compact navigation a named modal dialog with predictable initial focus, Tab/Shift+Tab containment, Escape dismissal and a reachable close button.
- Restore focus to the menu trigger on compact-menu dismissal, preserve section-link navigation, and safely release focus when switching to desktop.
- Add a first-tab, focus-visible skip link that moves focus to the main content, including without JavaScript.
- Verify keyboard behavior in both themes and reduced-motion mode; document evidence and update only the verified checklist scope.
- Preserve the current visual design, section order, sound cues and desktop navigation. No claim of complete WCAG compliance.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `accessible-navigation`: Extend the existing named-control contracts with modal mobile-menu focus behavior and a main-content bypass link.

## Impact

Targets `components/header.tsx`, `components/mobile-nav.tsx`, `app/layout.tsx`, `app/page.tsx`, a shared dialog primitive under `components/ui`, focused tests and verification documentation. Reuse installed `@radix-ui/react-dialog` through a React 18-compatible shared primitive; no dependency additions. Implementation will update the keyboard-navigation checklist item only after focused validation, leaving broader accessibility audits open.
