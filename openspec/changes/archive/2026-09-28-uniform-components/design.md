# Design

## Context

See proposal.md for why. `unified-theme` already maps the palette through `bg-background`, `bg-card`, `text-foreground`, `border-border`, and `bg-primary`. `components/ui/button.tsx` owns variants, including `pill`. CV, submit, Experience "Read More", the drawer close, and the carousel arrows already render `Button`. The theme switch and the mobile menu button are still raw `<button>` elements with the palette classes copied on.

`docs/react-next-conventions.md` is the structure rule: a section is a default function export, a `components/ui` module is a named export, and primitives are imported from `@/components/ui/...`. Sections currently mix that path with `./ui/...`.

## Goals / Non-Goals

**Goals:**

- Render the remaining button controls through `Button` without changing their accessible names.
- Use `react-icons` for the carousel arrows and drop `lucide-react` when it has no imports.
- Give skill chips and project technology tags one chip, and the two contact fields one field.
- Make imports, exports, and `components/ui` formatting match the repo conventions.

**Non-Goals:**

- New palette values, contrast targets, or glow tokens. Those stay in `unified-theme`.
- Rebuilding the project carousel tile as `Card`. The drawer already uses `Card`.
- A new icon set, a second button component, or a shared component for the intro `h1`.
- Changing what the CV link opens, or the submit pending spinner behavior.

## Decisions

### Remaining buttons use a chrome variant

Add one variant on `components/ui/button.tsx` for the bordered, blurred, round icon control the theme switch and the mobile menu button share. Callers keep position, accessible name, and click behavior. Do not copy the fill and border classes back onto a raw `<button>`.

CV and submit stay on `variant="pill"`. Experience "Read More", the drawer close, and the carousel arrows stay on the variants they already use.

Alternative considered: pass the full class string through `className` on the default variant. Rejected. That puts the shared appearance back in two callers, which is the copy this change removes.

### Carousel arrows come from react-icons

Replace `lucide-react`'s `ArrowLeft` and `ArrowRight` in `components/ui/carousel.tsx` with the chevron icons from `react-icons`. Remove `lucide-react` from `package.json` only after no file imports it.

Alternative considered: keep `lucide-react` because the arrows already sit on `Button`. Rejected. The checklist names one icon library, and sections already use `react-icons`.

### One chip, one field

Add a chip component and render it from `components/skills.tsx` and from both tag rows in `components/project.tsx`. A size prop covers the compact card tag and the larger skill and drawer tag. The classes stay the current palette utilities: `border-border`, `bg-card` or `bg-secondary`, and the matching foreground.

Add one field component for a single-line or multiline control. `components/contact.tsx` renders it for the email input and the message textarea. Keep the current `border-input`, `bg-background`, and `text-foreground` classes, the names, and the max lengths.

Alternative considered: two components, `Input` and `Textarea`. Rejected. The checklist asks for one form field, and the two contact controls differ only by being multiline.

### Imports and exports match the convention

Primitive imports in sections use `@/components/ui/...`. `components/cv.tsx` becomes `export default function`. `components/ui/text-generate-effect.tsx` becomes a named export, and `components/project.tsx` imports that name.

### Prettier owns components/ui

Run the repo Prettier on `components/ui`. Do not hand-edit quotes or semicolons. Generated files that omit semicolons get the repo style.

### Section headings stay

About, Projects, Skills, Experience, and Contact already render `SectionHeading`. Do not add a second heading component. Confirm no section title uses a raw `h2`.

## Risks / Trade-offs

- [The chrome variant changes the theme switch or menu button size] → Start from the current height, border, and blur classes. Move only the shared ones into the variant.
- [A shared chip flattens the compact project-card tag] → Keep a size prop. Do not force the card tag to the skill-chip padding.
- [A named export of `TextGenerateEffect` breaks the drawer] → Update the single importer in `components/project.tsx` in the same change.
- [Removing `lucide-react` while an import remains] → Search the repo before removing the dependency.
