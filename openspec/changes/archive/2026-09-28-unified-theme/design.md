# Design

## Context

See proposal.md for why. Tokens already exist on `:root` and `.dark` in `app/globals.css`, and `tailwind.config.ts` maps them (`bg-background`, `bg-card`, `text-foreground`, `text-muted-foreground`, `border-border`, `bg-accent`). `darkMode` is `["class"]`. `context/theme-context.tsx` toggles `dark` on `<html>`. `components/ui` already uses those tokens. Page sections do not.

`docs/css-conventions.md` is the styling rule for this work: utilities only, `cn()` for composition, no new stylesheet, no color branch on `theme === "light"`.

## Goals / Non-Goals

**Goals:**

- Move the surfaces named in the spec onto the existing tokens.
- Give the two decorative glows one pair of tokens, shared by the page and the drawer.
- Make the CV control and the submit control render the same `Button` variant.

**Non-Goals:**

- A new component library, icon set, import style, or export style.
- A shared tag-chip or form-field component.
- Retheming the brand gradients inside About and Intro copy, unless a measured pair on a restyled surface fails contrast.
- Changing how the theme is stored, or the theme control's accessible name.

## Decisions

### One Tailwind config

A leftover `tailwind.config.js` sat beside `tailwind.config.ts`. Tailwind 3 loads `.js` before `.ts`, so no token utility, `darkMode` setting, font mapping, or plugin from the `.ts` file was generated. Delete `tailwind.config.js`. The `addVariablesForColors` plugin skips colors whose value contains `var(`, so it cannot write `--background: hsl(var(--background))` over the tokens.

Geist sets `--font-geist-sans` on `<body>`, but preflight sets `font-family` on `<html>`, where the variable is undefined. The body gets `font-sans`.

### Navy and teal palette

The page moves to `bg-background`, `text-foreground`, `bg-card`, `text-card-foreground`, `text-muted-foreground`, `border-border`, `bg-accent`, and `border-input`. The token values follow Brittany Chiang's portfolio, the most-cited entry in the emmabostian developer-portfolios list: navy `#0a192f` page, `#112240` card, `#1d2d50` secondary, `#ccd6f6` text, `#8892b0` muted, `#64ffda` primary. Light mode inverts it: `#f6f8fb` page, white card, `#e6ecf5` secondary, navy text, `#4a5670` muted, `#0f766e` primary. Borders are `#8390a6` in light mode and `hsl(220 21% 50%)` in dark mode.

Alternative considered: keep the shadcn stone tokens. Rejected. Card equal to background read flat, and the black pill buttons had no accent.

### Glows are two tokens, not hex in components

Add `--glow-warm` and `--glow-cool` on `:root` and `.dark`, mapped in `tailwind.config.ts`. They are teal and blue tints: pale in light mode and deep in dark mode, because the glows render at full opacity. `app/layout.tsx` and the project drawer both use those utilities. Delete the duplicated hex classes.

Alternative considered: reuse the single `accent` token for both orbs. Rejected. The page has two distinct orbs, and one stone accent cannot represent both.

### Timeline colors are CSS variables

`VerticalTimelineElement` `contentStyle` and `iconStyle` get `hsl(var(--card))`, `hsl(var(--border))`, and `hsl(var(--foreground))` instead of `theme === "light"` hexes. Variables update when the `dark` class changes, so the entries do not need to re-render to switch theme. Entry description text uses `text-muted-foreground`.

Alternative considered: keep the JavaScript branch and point it at token hexes. Rejected. The branch is the bug the checklist names, and it goes stale if a token changes.

### One button variant for CV and submit

Add one variant on the existing `components/ui/button.tsx` (pill shape, primary fill, the current hover scale). `components/cv.tsx` and `components/submit-btn.tsx` render that variant. Submit keeps its pending spinner and disabled state. Do not leave a copied class string in either file.

Alternative considered: a new `CtaButton` component. Rejected. `Button` already owns variants.

### Chrome uses the same surface recipe

Header bar, menu button, theme switch, and mobile panel: `bg-background/80`, `border-border`, `backdrop-blur`. Inactive nav and footer: `text-muted-foreground`. Active nav pill: `bg-accent` `text-accent-foreground`. Skill chips: `bg-card` `text-card-foreground` `border-border`, matching the tag row in the drawer. `theme ===` remains only to choose the sun or moon icon and the accessible name.

### Contrast is measured on the touched pairs

After the class changes, check body text, muted text, card title, field text, and timeline text against their surfaces in both themes. Also check header text on the header surface, and the button label on the button fill. Fix by adjusting the token that failed, not by adding a one-off `dark:` gray on that component.

## Risks / Trade-offs

- [Light mode shifts from `gray-50` to a cool off-white] → Accept it. Adjust `--background` only if contrast fails.
- [The logo image is dark and low contrast on navy] → Out of scope. It is a raster asset, not a token.
- [Blurred glows sit under text and are hard to measure] → Measure text against the page background, not against the glow. Glows stay `pointer-events` none and behind content, as they are now.
- [The timeline library paints inline styles that beat utilities] → Put the variables in those inline styles so the library cannot fall back to its default light card.
- [Card and drawer class edits are wide] → Limit edits to color classes. Leave layout, motion, and the optional video and link behavior alone.

## Migration Plan

One change set. No data migration. Rollback is reverting the token class replacements. The theme still toggles if a class is wrong; only the color is wrong.

## Open Questions

None. Token source, glow tokens, timeline variables, and the shared button variant are decided above.
