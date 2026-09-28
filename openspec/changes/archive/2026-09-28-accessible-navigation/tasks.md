# Tasks

## 1. Mobile menu control

- [x] 1.1 Export a shared `mobile-navigation` id from `components/mobile-nav.tsx`, set it on the mobile `<nav>`, and verify the nav element id matches that constant
- [x] 1.2 On the compact-header menu button in `components/header.tsx`, set `aria-label` to "Open menu" when closed and "Close menu" when open, set `aria-expanded` from `isMenuOpen`, set `aria-controls` to the shared id, mark the icon `aria-hidden`, and verify those attributes in the button markup for both states

## 2. Theme toggle

- [x] 2.1 On the theme button in `components/theme-switch.tsx`, set `aria-label` to "Switch to dark mode" when the theme is light and "Switch to light mode" when the theme is dark, mark the icon `aria-hidden`, and verify those attributes in the button markup for both themes

## 3. Integration

- [ ] 3.1 At a viewport under 960px, confirm the closed menu button is named "Open menu" and not expanded, the open menu button is named "Close menu" and expanded, both reference the mobile nav, and the theme button name matches the theme it will switch to
