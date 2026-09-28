# Proposal

## Why

`public/logo.png` is a navy emblem. On the navy theme it drops below the contrast the rest of the header already meets, and a CSS filter would repaint the bitmap instead of giving the brand a real light and dark asset. The logo link is also unnamed as Home, shown only on wide screens, and has no reserved hit area or reduced-motion path.

## What Changes

- Replace the header bitmap with a transparent brand asset that keeps the same silhouette in light and dark.
- Show the asset that matches the active theme, without painting the other variant first.
- Keep the mark at least 3:1 against the header and the page in both themes, including hover and focus.
- Name the logo link "Home", treat the graphic as decorative, and keep a visible keyboard focus treatment.
- Give the link a 44×44 px target and place it so it does not cover navigation from 320 px through desktop widths.
- Keep the entrance and hover motion small, turn that motion off when the visitor prefers reduced motion, and reserve the logo's box so it does not shift layout.

## Capabilities

### New Capabilities

- `adaptive-logo`: The header logo stays recognizable in both themes, names Home, and remains a reachable control at every width in this page.

### Modified Capabilities

- None. `unified-theme` already covers text and surface contrast, and `accessible-navigation` already names the menu and theme controls. Neither requirement describes the logo.

## Impact

- `components/header.tsx`, which today renders `public/logo.png` only at the desktop breakpoint, with alt text "Logo".
- A new transparent logo asset used by that header. No new dependency, and no change to the theme provider, the mobile menu names, or the theme switch.
- `CHECKLIST.MD` section 1.2, once the behavior above is in place.
