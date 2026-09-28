# CSS and styling

Styling is Tailwind 3 utility classes. The only stylesheet is `app/globals.css`. It holds the semantic tokens. Do not add a CSS module, a styled-component, or a new global rule for one component.

Library choices are in [technology-convention.md](technology-convention.md).

## Tokens

`app/globals.css` defines the palette on `:root` and `.dark`. Tailwind exposes it as `bg-background`, `text-foreground`, `bg-card`, `text-card-foreground`, `text-muted-foreground`, `bg-primary`, `text-primary-foreground`, `bg-secondary`, `bg-accent`, `bg-muted`, `border-border`, `bg-destructive`.

New and edited UI uses those tokens so light and dark stay one theme. The theme class is `dark` on `<html>`, toggled by `context/theme-context.tsx`.

Older sections still use raw `gray-*`, `zinc-*`, and hex blobs such as `#fbe2e3`. That is debt. Do not copy it into new code. When you touch one of those components, move it onto the tokens.

Prefer `dark:` when a token is not enough. Do not branch colors in JavaScript with `theme === "light"`.

## Class composition

- Merge classes with `cn()` from `lib/utils.ts`. It is `clsx` plus `tailwind-merge`, so a later class overrides an earlier one.
- Variants on a primitive use `cva` in `components/ui`, as `button.tsx` does.
- Prettier sorts Tailwind classes (`prettier-plugin-tailwindcss`). `.prettierrc` lists `clsx`, `cn`, and `cva` as `tailwindFunctions`. Do not sort classes by hand.

## Layout and motion

- Mobile first. Add `sm:`, `md:`, and `lg:` on top of the base class.
- Page sections stay inside the widths already set in `app/page.tsx` (`max-w-[52rem]`, projects wider).
- Motion uses Framer Motion. Reuse `fadeInAnimationVariants` in `lib/animations.ts` before adding a new variant.
- New motion respects `prefers-reduced-motion`.

## Files

- `tailwind.config.ts` is `darkMode: ["class"]` and maps the CSS variables. Add a color there only when it belongs to the shared palette.
- `components.json` records the shadcn setup (`baseColor: stone`, `cssVariables: true`). Keep generated primitives on those tokens.
