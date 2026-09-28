# Design

## Context

See proposal.md for why. The header in `components/header.tsx` renders `public/logo.png` through `next/image` only when the viewport is at least 960 px. The image alt is "Logo". The link goes to `#home` and sets the active section to Home. Its box uses `sm:h-[initial]`, so the rendered size is not fixed. There is a short scale-in and a `hover:scale-110`, and no reduced-motion check anywhere in the repo.

The bitmap is a 500×500 navy emblem with a black interior. On the light header it reads. On the navy page and on `bg-background/80` it does not. `docs/css-conventions.md` says new color follows the semantic tokens and `dark:` classes, and does not branch on `theme === "light"` in JavaScript. `context/theme-context.tsx` applies the `dark` class in the same effect that allows the tree to render, so the first paint of the header already has the saved theme class. `next.config.js` does not set `dangerouslyAllowSVG`.

## Goals / Non-Goals

**Goals:**

- One transparent asset whose fill follows the active theme class.
- A Home link with a reserved 48 px box, visible focus, and motion that turns off when requested.

**Non-Goals:**

- Changing how `ThemeContextProvider` waits to render, or adding a blocking theme script.
- Renaming the menu button or the theme switch.
- Interaction sound, a new emblem, or a new dependency.
- Enabling `dangerouslyAllowSVG`.

## Decisions

### One inline SVG colored by `currentColor`

Trace `public/logo.png` into an inline SVG. The black interior becomes transparent cutouts. The disc, monogram, and leaf ring stay as the positive shapes and use `currentColor`, with the link set to `text-foreground`. Light foreground is the existing navy; dark foreground is the existing light text, which already clears 4.5:1 on the page, so the solid mark clears 3:1.

The header stops importing the PNG. Hover does not change the fill, so the hover appearance keeps the same contrast. Focus uses `focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2` and `ring-offset-background`, the same ring token the buttons use.

Alternative considered: two image files swapped with `theme === "dark"`. Rejected. That branches color in JavaScript, which the CSS convention forbids, and it can paint the light asset if the theme state and the class ever disagree.

Alternative considered: `filter` on the PNG. Rejected by the checklist and the proposal.

Alternative considered: `next/image` with an SVG file. Rejected. SVG optimization needs `dangerouslyAllowSVG`, which this change will not turn on.

### Two SVG variants only if one fill loses the mark

If a single `currentColor` fill makes the leaf ring or the monogram unrecognizable against the PNG, ship two transparent SVGs instead: the navy mark for light, and the same shapes in the light foreground for dark. Show them with `dark:hidden` and `hidden dark:block` inside one fixed box. Do not read `useTheme()` to choose a source. Do not draw a new symbol.

### The link is present at every width

Render the logo link in both the desktop and the compact header, outside the `isDesktop` split that currently hides it. Keep `href="#home"` and the existing click that sets the active section to Home and `timeOfLastClick` to now. Set `aria-label="Home"` on the link and `aria-hidden` on the SVG.

The link box is `h-12 w-12` (48 px, above the 44 px minimum) at every breakpoint. Drop `sm:h-[initial]`. Place it on the left, clear of the centered navigation pill and clear of the menu button at `right-4`. Check 320 px, the 960 px desktop breakpoint, and a wide desktop width.

### Motion uses the library already on the page

Keep the existing short scale entrance and `hover:scale-110`. Read `useReducedMotion` from `framer-motion`. When it is true, render the logo at full opacity and scale 1, and do not apply the hover scale. The fixed box is what prevents layout shift when the asset loads or the theme class changes.

## Risks / Trade-offs

- [A hand trace drifts from the PNG] → Compare the SVG silhouette to `public/logo.png` before the header drops the bitmap. If the monogram or leaf ring is no longer the same mark, use the two-variant fallback in this design.
- [The header is `bg-background/80` over the glow blobs, so a flat swatch can pass while the live header fails] → Check 3:1 on the rendered header and on the page, in both themes, including focus.
- [A logo on the left at 320 px crowds the full-width bar] → The menu button stays at the right. The 48 px logo stays in the left inset. If they meet, move the logo, not the menu button.
- [The mount gate in the theme provider is what makes the first paint match the saved theme] → This change relies on that gate and does not redo it. The logo still must not choose its color from React theme state.

## Migration Plan

Add the SVG and point the header at it. Leave `public/logo.png` in the repo until the header no longer references it and the contrast check passes, then stop using it. Rollback is restoring the `next/image` import of that PNG.

## Open Questions

None. The single-fill SVG is the approach, and the two-variant SVG is the fallback if the trace fails the silhouette check.
