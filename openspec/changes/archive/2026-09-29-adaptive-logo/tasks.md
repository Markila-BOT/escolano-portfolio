# Tasks

## 1. Asset

- [x] 1.1 Trace `public/logo.png` into an inline SVG whose interior is transparent and whose disc, monogram, and leaf ring use `currentColor`. Verify those three parts still match the PNG silhouette. If a single fill makes the mark unrecognizable, switch to the two transparent SVGs in design.md, shown with `dark:` utilities only. Verify the asset is not the PNG recolored by a CSS filter.

## 2. Header

- [x] 2.1 Render that logo at every width in `components/header.tsx`. Keep `href="#home"` and the click that sets the active section to Home and `timeOfLastClick` to now. Set the link's accessible name to "Home" and hide the graphic from assistive technology. Verify the name is "Home" and the graphic has no separate name.
- [x] 2.2 Give the link a fixed `h-12 w-12` box, place it left of the navigation and clear of the menu button, and add the focus ring from design.md. Color it with `text-foreground` so the fill follows the theme class, not `useTheme()`. Verify the target is at least 44 by 44 CSS pixels, that it does not cover navigation at 320 px, at 960 px, and at a wide desktop width, and that keyboard focus is visible in both themes.
- [x] 2.3 Keep the short scale entrance and hover scale, and skip both when `useReducedMotion` from `framer-motion` is true. Verify reduced motion shows the logo at its final size with no entrance or hover scale, and that switching theme does not move the surrounding header content.

## 3. Checklist and check

- [x] 3.1 Mark the six CHECKLIST.MD section 1.2 items done and recalculate the progress row from the checkboxes. Verify those six items are `[x]` and section 1.3 stays open.
- [x] 3.2 On the already-running site, confirm the first painted logo matches a saved dark theme, the mark meets 3:1 on the header and on the page in both themes while resting, hovered, and focused, and activating the logo link shows Home. Do not start the dev server.
