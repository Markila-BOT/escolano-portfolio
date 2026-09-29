# Radix UI

A reusable interactive component is a Radix primitive, styled with this site's tokens. Follow the `radix-ui-design-system` skill for composition, keyboard behavior, and focus. This file is the project reference. When the skill's examples use npm, Stitches, or `interface`, follow this file and the other docs in `docs/` instead.

Library roles are in [technology-convention.md](technology-convention.md). Tokens are in [css-conventions.md](css-conventions.md). Naming and contrast are in [accessibility-conventions.md](accessibility-conventions.md).

## When to use it

Use the skill and this file when the new piece is a reusable control: it opens, closes, labels, selects, or composes (dialog, dropdown, tabs, tooltip, accordion, popover, select).

Do not use it for a static section or a one-off layout. Jobs already assigned stay where they are:

| Job | Keep using |
| --- | --- |
| Form success and failure | `react-hot-toast` |
| The project drawer | `vaul` in `components/ui/drawer.tsx` |
| The project carousel | `embla-carousel-react` |
| Section icons | `react-icons` |
| Icons already inside `components/ui` | `lucide-react` |

## Packages already here

| Package | Where |
| --- | --- |
| `@radix-ui/react-slot` | `components/ui/button.tsx`, for `asChild` |
| `@radix-ui/react-label` | `components/ui/label.tsx` |
| `@radix-ui/react-dialog` | Installed for a dialog. No dialog component exists yet |
| `vaul` | `components/ui/drawer.tsx` |

Add the next primitive with `pnpm add @radix-ui/react-<name>`, one package, only when nothing in the table covers the job. Record that package in [technology-convention.md](technology-convention.md) in the same change. Do not install a styled kit, and do not add a second library for a job this table already names.

## Where the component lives

- Put it in `components/ui/<name>.tsx`.
- Named exports. Match the shape of `label.tsx`: `forwardRef`, `ElementRef`, and `ComponentPropsWithoutRef`.
- Add `"use client"` only when the primitive needs state, effects, or a browser API.
- New props types use `type`. Leave `interface` only on a generated file that already has one, such as `button.tsx`.
- Merge classes with `cn()` from `lib/utils.ts`. Variants use `cva`, as `button.tsx` does.
- A section imports the primitive from `@/components/ui/...`. Do not import `@radix-ui/*` from a section.

## Behavior to keep

Radix supplies the behavior. This site supplies the appearance.

- Compose `Root`, `Trigger`, `Portal`, `Content`, and `Close`. Do not rebuild open state, focus trap, or keyboard handling that the primitive already provides.
- Pass `asChild` when the trigger should be the existing `Button`.
- Do not remove keyboard support, ARIA, or focus return. A control that shows only an icon still has an `aria-label`.
- Style with semantic tokens (`bg-background`, `text-foreground`, `bg-popover`, `text-popover-foreground`, `border-border`). Light and dark come from the `dark` class on `<html>`. Do not branch colors with `theme === "light"`.
- Do not add a CSS module or a new global rule for one component.
