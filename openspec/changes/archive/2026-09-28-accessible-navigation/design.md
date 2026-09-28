# Design

## Context

See proposal.md for why. The compact header (viewport under 960px) renders an icon-only `<button>` in `components/header.tsx` that toggles `isMenuOpen`. `components/mobile-nav.tsx` is always mounted and hides itself with `display: none` when closed. `components/theme-switch.tsx` is an icon-only `<button>` that calls `toggleTheme`. Neither button has text, `aria-label`, or `aria-expanded`. Desktop links already have visible names and stay unchanged.

## Goals / Non-Goals

**Goals:**

- Meet the accessible-navigation spec with the existing buttons and the existing open/close and theme behavior.
- Keep the visual design icon-only.

**Non-Goals:**

- Skip link, focus trap, focus restore, logo alt text, and the nested `h1`.
- Changing when the compact header appears, or how the menu animates.
- Fixing the theme provider's blank render before mount.

## Decisions

### Name the buttons with `aria-label`

Use `aria-label` on each `<button>`. The labels are the strings in the spec: "Open menu" / "Close menu", and "Switch to dark mode" / "Switch to light mode".

A visually hidden `<span>` would also work. `aria-label` keeps the markup to the existing button and matches an icon-only control. Visible text labels would change the layout, which this change does not ask for.

### Mark the icons as decorative

Set `aria-hidden` on the menu and theme icons. The button label is the accessible name. Without this, some icon implementations expose their own name and the control is announced twice.

### Point the menu button at the menu

Give the mobile `<nav>` a stable `id` of `mobile-navigation`. The button sets `aria-controls="mobile-navigation"` and `aria-expanded` from `isMenuOpen`. The button stays in `header.tsx`; the id stays on the nav in `mobile-nav.tsx`. Share the id string as one exported constant from `mobile-nav.tsx` so the two files cannot drift.

`aria-expanded` is required even though the spec's name already changes, because the control is a disclosure. Do not add `aria-pressed` on the theme button. Its name already states the next theme, and a pressed state would describe the current theme as a toggle position instead of an action.

### Leave the closed menu in the DOM

The overlay already uses `display: none` when closed. That remains. `aria-controls` may reference an element that is hidden.

## Risks / Trade-offs

- [Theme button is absent until the theme context mounts] → The name applies as soon as the button renders. This change does not remove the blank first paint.
- [English-only labels] → The site copy is English. A later locale change would replace these strings with the rest of the UI copy.
- [Desktop and mobile share `layoutId="activeSection"`] → Only one header variant renders at a time. This change does not touch that.

## Migration Plan

Ship with the next UI deploy. There is no data migration. Rollback is reverting the three component edits.
