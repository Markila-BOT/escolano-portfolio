# Proposal

## Why

The introduction currently presents one role even though the experience data supports four verified engineering titles. A restrained title loop can communicate that breadth without adding another interaction, while preserving the greeting as the hero's deliberate interactive moment.

## What Changes

- Add a title loop after "I'm Mark Escolano, a" that cycles in this order: "Senior Software Engineer", "Full Stack Engineer", "Lead Software Engineer", and "Front-End Engineer".
- Show "Senior Software Engineer" first and keep every title readable long enough before changing.
- Use a short vertical slide and fade based on the earlier public implementation from Gyanendra Pal Singh's portfolio: an indexed timer selects one child, and an enter/exit presence transition moves the old title up while the next title enters from below.
- Keep the title region stable so the name, greeting, positioning sentence, and Contact link do not move as title lengths change.
- When reduced motion is preferred, keep the first title static instead of running an automatic animation.
- Keep automatic title changes silent and out of live regions. Expose the complete set of verified titles to assistive technology without announcing every timed change.
- Keep the multilingual greeting independent: hovering or activating it must not advance the title loop.
- Mark the cycling-role checklist item complete only after implementation and browser verification.

## Capabilities

### New Capabilities

- `role-title-loop`: The introduction presents four verified career titles in a stable, accessible, reduced-motion-aware automatic loop.

### Modified Capabilities

- `multilingual-greeting`: Clarify that a greeting interaction leaves whichever role title is currently shown unchanged and does not advance the independent title loop.

## Impact

- `lib/data.ts` gains one ordered role-title constant sourced from existing experience titles.
- `components/intro.tsx` composes a focused title-loop component instead of rendering one static role.
- A small client component may be added under `components/` to own timer, visibility, accessibility, and transition behavior.
- `CHECKLIST.MD` changes only after the feature is implemented and verified.
- No new dependency, sound cue, route, API, or content claim is added. The existing `framer-motion` package provides the animation.
