# Design

## Context

See proposal.md for why. The introduction in `components/intro.tsx` is a portrait, a scrambled greeting, and one sentence: Mark is a senior software engineer with a strong focus on frontend technologies. A separate audience sentence says the work is for product teams that need frontend engineering. Contact lives only in `components/contact.tsx` (`#contact`), with the email, the form, and `CVButton` (`variant="pill"`). Header links in `components/header.tsx` are `next/link` hash links that set `setActiveSection` and `setTimeOfLastClick` on click.

`Button` already supports `asChild` through Radix `Slot`. The pill variant is `h-12` (48px) and `w-32`. Copy for sections lives in `lib/data.ts`. The page is supposed to have one `h1`; the introduction currently nests a second `h1` inside `motion.h1`, and the inner heading's `onMouseOver` rewrites `innerText`. The frontend-focus span sits in the outer heading, outside that inner heading.

## Goals / Non-Goals

**Goals:**

- Replace the frontend-only audience sentence and the frontend-focus span with the end-to-end audience and the approach phrase.
- Keep one start link to `#contact` with the same click bookkeeping the header uses.
- Paint the link with the existing pill variant so it matches the CV control.

**Non-Goals:**

- Rewriting the greeting scramble, adding cycling role titles, or building an interactive hero.
- A second contact form, a new mailto, or moving the CV into the introduction.
- Fixing the nested `h1`, or the gradient on "Senior Software Engineer".
- Changing `unified-theme`, `accessible-navigation`, or `uniform-components` requirements.

## Decisions

### Audience and approach copy live in `lib/data.ts`

`introCallToAction` holds three strings. `Intro` reads them.

- `audience`: "The work is for product teams that need end-to-end implementation through deployment."
- `approach`: "shipping new code with AI, spec-driven development, and TypeScript."
- `startLabel`: "Contact"

The approach phrase replaces the span that says "with a strong focus on frontend technologies," including the underline on "frontend". Render it as the same bold text as the surrounding sentence. Do not add a new gradient or a new underline. The visible start label stays one word so it fits the pill's `w-32`. Do not add an `aria-label` that disagrees with the visible text.

Alternative considered: leave the frontend span and only widen the audience sentence. Rejected. The two lines would disagree about what the work is.

### The start control stays a hash link styled as the pill

`Button` with `variant="pill"` and `asChild` already wraps `next/link` to `#contact`, and the click already sets the active section to Contact and `timeOfLastClick` to now. Keep that. The audience sentence stays a sibling after the greeting heading. The approach phrase stays in the outer heading, outside the inner heading whose `onMouseOver` rewrites `innerText`.

### No new motion on the call to action

Leave the portrait and greeting motion as they are. Do not add an entrance animation on the new sentence or link.

## Risks / Trade-offs

- [The pill's `w-32` clips a long label] → Keep the visible label as "Contact". Do not widen the CV and submit buttons.
- [The approach phrase makes the heading taller] → Keep it one clause. Do not add a second heading.
- [Hash navigation plus `scroll-smooth` fights the section observer] → The click already sets `timeOfLastClick`. Do not remove `scroll-smooth` in this change.
- [The nested `h1` stays invalid] → The audience sentence stays outside that heading. Untangling the greeting heading is a separate change.

## Migration Plan

No data migration. Replace the audience string and the frontend-focus span. Revert those two strings to remove the revision.
