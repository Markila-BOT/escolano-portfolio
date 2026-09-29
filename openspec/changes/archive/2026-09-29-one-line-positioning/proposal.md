# Proposal

## Why

The introduction already says who the work is for and how new code gets built, but a visitor has to read both the heading and the paragraph under it. The heading carries the approach as a trailing phrase, and the paragraph repeats the audience. A positioning line should say who you help and what you build in one sentence.

## What Changes

- The introduction shows one positioning sentence that names who the work is for and what gets built.
- That sentence replaces the approach phrase inside the heading and the separate audience paragraph. The greeting, the name, the Senior Software Engineer role, and the Contact link stay.
- Assumed sentence, using only claims already required on this page: "I help product teams take new code all the way to deployment, writing most of it in TypeScript with AI and spec-driven development."
- The sentence is ordinary text in both themes, readable on load, without hovering or animating the greeting.
- The greeting scramble, cycling role titles, and an interactive hero stay out of this change. So does the About section.

## Capabilities

### New Capabilities

- None.

### Modified Capabilities

- `intro-call-to-action`: The audience and the approach are one positioning sentence. The start control is unchanged.

## Impact

- `components/intro.tsx` drops the approach phrase from the heading and shows the positioning sentence once.
- Copy stays in `lib/data.ts` with the rest of the portfolio copy.
- No new dependency, control, or route.
