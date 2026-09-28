# Accessibility

Target WCAG 2.1 AA. Interactive UI is keyboard reachable, named, and visible in both themes. Color tokens are in [css-conventions.md](css-conventions.md).

## Name every control

- A button or link that shows only an icon has an `aria-label` that says what it does (`Close menu`, `Visit Valuation`).
- Decorative icons are `aria-hidden`.
- A control that opens or closes something sets `aria-expanded` and `aria-controls` to the id of the panel it owns. The mobile menu already does this (`mobileNavigationId`).
- The theme toggle names the theme it will switch to, not the icon.

## Structure

- The page has one `h1`. Section titles are `h2`.
- Use a `<button>` for an action and a `<link>` for navigation. Do not put a click handler on a `<div>`.
- Keep the focus ring. Do not remove `outline` unless a visible `focus-visible` style replaces it.
- A dialog or the mobile menu traps focus and returns focus to the control that opened it.

## Theme

- Text on a surface meets 4.5:1. Large text and UI boundaries meet 3:1. Check both light and dark.
- State is not communicated by color alone. The internal-project state has text, not only an icon.

## Motion

- New animation is decorative. It must still be usable when `prefers-reduced-motion: reduce` is set.
