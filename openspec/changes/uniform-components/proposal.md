# Proposal

## Why

`unified-theme` already makes sections, chrome, cards, and the drawer read one navy and teal palette. The pieces that paint that palette are still copied. A later palette change has to be repeated on each copy, and two icon libraries and two import styles sit next to the shared primitives.

## What Changes

- Every control that acts as a button renders `components/ui/button.tsx`. CV, submit, Experience "Read More", and the drawer close already do. The theme switch and the mobile menu button still hand-roll a `<button>`. The checklist note that CV and submit hand-roll their own is stale.
- Carousel arrows come from `react-icons`, the same library sections already use. `lucide-react` leaves the carousel. Remove the dependency if nothing else imports it.
- Section and UI primitive imports use `@/components/ui/...`. Relative `./ui/...` imports in sections go away.
- A section exports `export default function`. A `components/ui` module uses a named export. `cv.tsx` and `text-generate-effect.tsx` stop using a const plus a trailing default export. `text-generate-effect.tsx` becomes a named export because it lives in `components/ui`.
- `components/ui` files are formatted with the repo Prettier config, including semicolons.
- Skill chips and project technology tags render one chip. Contact email and message render one field. Section titles keep the existing `SectionHeading`. Surfaces that are cards keep using `components/ui/card.tsx` where a card is already the surface.

Colors, contrast, the theme toggle name, and the mobile menu name stay as specified in `unified-theme` and `accessible-navigation`.

## Capabilities

### New Capabilities

- `uniform-components`: One button, one icon library, one chip, and one form field, composed on top of the palette `unified-theme` already ships.

### Modified Capabilities

- None. `unified-theme` and `accessible-navigation` requirements do not change.

## Impact

- `components/theme-switch.tsx`, `components/header.tsx`, `components/ui/carousel.tsx`, `components/cv.tsx`, `components/ui/text-generate-effect.tsx`
- Imports in `components/skills.tsx`, `components/experience.tsx`, `components/submit-btn.tsx`, `components/project.tsx`, `components/projects.tsx`
- New chip and field modules under `components/`, reused by Skills, Projects, and Contact
- Prettier pass on `components/ui`
- `lucide-react` removed from `package.json` when the carousel no longer imports it
