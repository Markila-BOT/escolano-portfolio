# Tasks

## 1. Shared button

- [x] 1.1 Add the bordered round icon variant from design.md on `components/ui/button.tsx`, and render it from `components/theme-switch.tsx` and the menu button in `components/header.tsx`. Verify both files import `Button`, neither keeps a raw `<button>` with the copied border and blur classes, and the accessible names stay "Switch to dark mode" / "Switch to light mode" and "Open menu" / "Close menu".
- [x] 1.2 Leave CV, submit, Experience "Read More", the drawer close, and the carousel arrows on `Button`. Verify `components/cv.tsx`, `components/submit-btn.tsx`, `components/experience.tsx`, `components/project.tsx`, and `components/ui/carousel.tsx` still render `Button`, and CV and submit still use `variant="pill"`.

## 2. One icon set

- [x] 2.1 Replace the carousel's `lucide-react` arrows with chevrons from `react-icons`. Verify `components/ui/carousel.tsx` imports `react-icons` and does not import `lucide-react`.
- [x] 2.2 Remove `lucide-react` from `package.json` when no file imports it, and update the lockfile with pnpm. Verify a repo search for `lucide-react` finds no imports and `package.json` no longer lists it.

## 3. Chip and field

- [x] 3.1 Add one chip and render it from `components/skills.tsx` and both tag rows in `components/project.tsx`, with a size for the compact card tag. Verify those call sites import the chip and no longer repeat the chip class string, and both sizes still use `border-border` with `bg-card` or `bg-secondary`.
- [x] 3.2 Add one field for a single-line or multiline control and render it for the contact email and message. Verify `components/contact.tsx` imports that field for both, keeps `name`, `required`, and `maxLength`, and no longer repeats the field class string on a raw `input` and `textarea`.

## 4. Imports and exports

- [x] 4.1 Change section imports of primitives from `./ui/...` to `@/components/ui/...`. Verify `components/cv.tsx`, `components/skills.tsx`, `components/experience.tsx`, `components/submit-btn.tsx`, `components/project.tsx`, and `components/projects.tsx` contain no `./ui/` import.
- [x] 4.2 Make `components/cv.tsx` `export default function`, and make `components/ui/text-generate-effect.tsx` a named export imported by `components/project.tsx`. Verify `cv.tsx` has no trailing `export default` after a const, and `project.tsx` imports the named effect.
- [x] 4.3 Record in `docs/react-next-conventions.md` that a section imports a primitive from `@/components/ui/...`. Verify that sentence is in the components section of the doc.

## 5. Formatting

- [x] 5.1 Format `components/ui` with the repo Prettier config. Verify `pnpm exec prettier --check components/ui` exits 0.

## 6. Section titles

- [x] 6.1 Keep About, Projects, Skills, Experience, and Contact on `SectionHeading`. Verify each of those section files renders `SectionHeading` and none of them renders a raw `<h2` for the section title.
