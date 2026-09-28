# Tasks

## 1. Palette tokens

- [x] 1.1 Add `--glow-warm` and `--glow-cool` on `:root` and `.dark` in `app/globals.css` as teal and blue tints, and map them in `tailwind.config.ts`. Verify both themes define both variables and the config exposes both utilities.
- [x] 1.2 Replace the stone values with the navy and teal palette in design.md. Verify `--card` differs from `--background` in both themes.
- [x] 1.3 Delete `tailwind.config.js`, and make `addVariablesForColors` skip values containing `var(`. Verify on the running page that `.bg-background`, `.bg-card`, and `.bg-primary` exist in the stylesheet, and that `--background` computes to an HSL triple.
- [x] 1.4 Add `font-sans` to the body. Verify the computed body font is Geist.

## 2. Page shell

- [x] 2.1 In `app/layout.tsx`, set the body to `bg-background` and `text-foreground`, and point both glow elements at the glow utilities. Verify `app/layout.tsx` contains no `gray-50`, `gray-900`, `#fbe2e3`, `#dbd7fb`, `#f64a8a`, or `#af9fca`.

## 3. Chrome

- [x] 3.1 Move the header bar, menu button, theme switch, mobile panel, footer, section divider, and skill chips onto `bg-background` / `bg-card`, `text-muted-foreground`, `border-border`, and `bg-accent` for the active item, as design.md describes. Verify those files contain no `bg-gray-`, `bg-white`, `text-gray-`, or `dark:bg-gray-` surface classes, and the theme button still exposes "Switch to dark mode" / "Switch to light mode" with `aria-hidden` icons.

## 4. Projects

- [x] 4.1 Move the project card, its title and year, its tags, the drawer surface, drawer borders, drawer tag chips, and the internal-project label onto `bg-card`, `text-card-foreground`, `text-muted-foreground`, and `border-border`. Point the drawer glows at the same utilities as the page. Verify `components/project.tsx` contains no `bg-gray-200`, `text-gray-800`, `bg-zinc-`, `border-gray-500`, or hex glow classes, and `components/ui/text-generate-effect.tsx` uses `text-foreground` instead of `text-black` / `dark:text-white`.

## 5. Contact and the shared button

- [x] 5.1 Add one pill variant on `components/ui/button.tsx` and render it from `components/cv.tsx` and `components/submit-btn.tsx`. Verify the fill, shape, and hover classes exist only in `button.tsx`, both callers import `Button`, and the submit control still shows its spinner and disabled state while pending.
- [x] 5.2 Move the contact email field, message field, and surrounding form text onto `bg-background`, `text-foreground`, and `border-input`. Verify `components/contact.tsx` contains no `dark:bg-white`, `dark:text-black`, or `text-gray-700`.

## 6. Experience timeline

- [x] 6.1 Set each timeline entry's `contentStyle` and `iconStyle` from `hsl(var(--card))`, `hsl(var(--border))`, and `hsl(var(--foreground))`, and set the description to `text-muted-foreground`. Verify `components/experience.tsx` contains no `theme === "light"` color branch and no `#f3f4f6`.

## 7. Contrast

- [x] 7.1 Measure body text, muted text, card title, field text, timeline text, header label, and button label against their surfaces in both themes. Verify each text pair is at least 4.5:1 and each boundary is at least 3:1. If a pair fails, change the shared token that failed and re-measure. Do not add a one-off gray utility on the component.
