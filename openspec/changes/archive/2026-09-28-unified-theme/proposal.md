# Proposal

## Why

Light and dark mode already toggle, but the page and the project drawer do not share a palette. Sections use gray utilities and hex blobs, while the drawer primitives use the shadcn tokens in `app/globals.css`. A visitor who switches theme sees two different systems, and some surfaces stay light in dark mode.

## What Changes

- Every section reads one semantic palette (background, surface, text, muted text, border, accent) in both modes.
- Project cards and the project drawer use that palette. Cards no longer stay `bg-gray-200` / `text-gray-800` in dark mode. The drawer stops repeating the page's hex blobs.
- Contact fields use that palette. Dark mode no longer forces white fields and black text.
- The experience timeline reads the palette. Its colors are not chosen in JavaScript with `theme === "light"`.
- The CV control and the submit control are one button. A palette change updates both.
- Header, mobile nav, theme switch, skill chips, and footer share the same surface and muted text.
- Text and UI boundaries on those surfaces meet WCAG 2.1 AA contrast in both modes (4.5:1 for text, 3:1 for large text and boundaries).

The theme toggle's accessible name and the mobile menu's name and expanded state stay as specified in `accessible-navigation`.

Out of scope: one icon library, one import path, one export style, Prettier on generated `components/ui` files, and extracting a shared section heading, tag chip, or form field. Those are the later checklist items, not this change.

## Capabilities

### New Capabilities

- `unified-theme`: One palette for page sections, chrome, project cards, the project drawer, contact fields, the experience timeline, and the shared CV and submit button, in both light and dark mode, at AA contrast.

### Modified Capabilities

- None. `accessible-navigation` requirements do not change.

## Impact

- Styles: `app/globals.css`, `app/layout.tsx`, and the section and chrome components that still use raw gray, zinc, or hex colors (`components/header.tsx`, `components/mobile-nav.tsx`, `components/theme-switch.tsx`, `components/skills.tsx`, `components/footer.tsx`, `components/project.tsx`, `components/contact.tsx`, `components/experience.tsx`, `components/cv.tsx`, `components/submit-btn.tsx`, `components/section-divider.tsx`).
- No new dependencies. Tokens already exist on `:root` and `.dark`.
- Brand word colors inside About and Intro copy stay, unless a restyled surface behind them fails the contrast ratios above.
