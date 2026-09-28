# Tasks

## 1. Copy

- [x] 1.1 Update `introCallToAction` in `lib/data.ts`. Verify `audience` is "The work is for product teams that need end-to-end implementation through deployment.", `approach` is "shipping new code with AI, spec-driven development, and TypeScript.", and `startLabel` is the single word "Contact".

## 2. Introduction

- [x] 2.1 Render the audience sentence and one start link in `components/intro.tsx`, as siblings after the greeting heading. Use `Button` `variant="pill"` with `asChild` around `next/link` to `#contact`. On click, set the active section to Contact and set `timeOfLastClick` to now. Verify the link is outside the heading whose `onMouseOver` rewrites `innerText`, the href is `#contact`, and there is no second form or email.
- [x] 2.2 Replace the "with a strong focus on frontend technologies" span with `introCallToAction.approach`, as bold text with no underline and no new gradient. Leave the greeting scramble, the nested `h1`, cycling titles, and the interactive hero untouched. Verify the scramble handler still rewrites only the inner greeting heading.

## 3. Checklist and check

- [x] 3.1 Mark the CHECKLIST.MD section 3.1 call-to-action item done and recalculate the progress row from the checkboxes. Verify that item is `[x]` and the one-line positioning, greeting, cycling titles, and interactive hero items stay `[ ]`.
- [x] 3.2 On the already-running site, confirm the audience sentence and the approach phrase are readable without hovering the greeting in light and dark, the start control matches the CV control in fill, text, and shape, keyboard focus is visible, and activating it shows the contact form. Do not start the dev server. Verify there is still one start control.
