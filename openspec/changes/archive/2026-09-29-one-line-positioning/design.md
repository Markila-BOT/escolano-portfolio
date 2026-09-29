# Design

## Context

See proposal.md for why. `introCallToAction` in `lib/data.ts` holds `audience`, `approach`, and `startLabel`. `components/intro.tsx` renders the approach as a bold span in the outer heading, after "Senior Software Engineer", and renders `audience` as the paragraph under that heading. The inner greeting heading rewrites its own `innerText` on hover. The Contact link is already a pill `Button` around a hash link to `#contact`.

Text on a surface needs 4.5:1 in both themes. The role uses a gradient clip. The audience paragraph uses `text-foreground`.

## Goals / Non-Goals

**Goals:**

- Show the audience and the approach as one sentence in the existing paragraph.
- Remove the approach span from the heading so the claim is not said twice.
- Keep the sentence in foreground text, outside the greeting heading the scramble rewrites.

**Non-Goals:**

- Changing the greeting scramble, the role gradient, the nested heading, or the Contact link.
- Cycling role titles, an interactive hero, or the About section.
- A new dependency or a second start control.

## Decisions

### One positioning string replaces the two rendered strings

`introCallToAction` keeps `startLabel` and replaces `audience` and `approach` with one `positioning` string:

"I help product teams take new code all the way to deployment, writing most of it in TypeScript with AI and spec-driven development."

`Intro` renders that string in the paragraph that currently shows `audience`. The approach span leaves the heading, so the heading is the greeting, the name, and the role.

Alternative considered: keep `audience` and `approach` and concatenate them in the component. Rejected. Two fields can be rendered as two sentences again.

Alternative considered: leave the approach span in the heading and shorten only the paragraph. Rejected. The introduction would still say the approach twice.

### The sentence stays ordinary foreground text

Use the paragraph's current foreground color. Do not put the sentence in the role gradient. The gradient is large display type and is the wrong place for a sentence that has to be read in both themes.

### No new motion

Do not add an entrance animation on the sentence. The portrait and greeting motion stay as they are.

## Risks / Trade-offs

- [The sentence wraps to several lines on a narrow screen] → Keep it one sentence at the paragraph's current size. Do not shrink it below the body text.
- [The scramble rewrites the sentence] → The sentence stays outside the inner heading whose `onMouseOver` sets `innerText`.
- [The nested heading stays invalid] → This change does not restructure that heading.

## Migration Plan

No data migration. Replace the two copy fields with `positioning` and stop rendering the approach span. Restoring `audience` and `approach` in the heading and the paragraph reverts it.
