# Proposal

## Why

The header and mobile menu are already on the page, but the controls that open the menu and switch theme are icon-only buttons with no accessible name. A screen reader user hears an unlabeled button in both cases, so the navigation the checklist already treats as present is not usable without sight.

## What Changes

- Give the mobile menu button an accessible name that matches whether the menu is closed or open.
- Expose that button's expanded state and associate it with the mobile menu.
- Give the theme toggle an accessible name that matches the current theme and the action the button will take.
- Keep the icons decorative so they are not announced twice.

## Capabilities

### New Capabilities

- `accessible-navigation`: Named, stateful controls for the mobile menu and the theme toggle.

### Modified Capabilities

- None. There are no existing specs.

## Impact

- `components/header.tsx`: the icon-only menu button below 960px.
- `components/mobile-nav.tsx`: the overlay the menu button controls. It needs an id the button can reference. Link labels stay as they are; they already have visible text.
- `components/theme-switch.tsx`: the fixed icon-only theme button.
- No new dependencies. Desktop nav links, the logo alt text, the skip link, focus trapping, and the nested `h1` stay out of this change.
