# Design

## Context

See `proposal.md` for motivation. The current introduction renders one large gradient `Senior Software Engineer` string inside the only `h1`. The same component now owns a 1.5-second interactive greeting glitch, so another animation must remain quieter, must not alter heading semantics, and must not cause `react-wrap-balancer` to reflow the hero.

The requested reference was investigated at the deployed site and in its public source:

- The current `gyanendra.vercel.app` and `gyanendra.in` deployments use Next.js on Vercel and now render a static `Full-stack software developer` title. The response identifies Next.js, and the shipped hero chunk contains a literal static title rather than timer or title-loop code.
- The earlier implementation remains in `gyanendracd/Portfolio`, introduced by commit `154ce4d` (`Hero v1`, 2026-02-16). Its stack is Next.js 16.1.6, React 19.2.3, Tailwind CSS 4, `motion` 12.34.0, and Three.js 0.182.0.
- Its hero writes `I'm a`, renders a red `|`, and passes two children—`Software Developer` and `3D Artist`—to a local `TextLoop`.
- That `TextLoop` is the Motion Primitives implementation. It converts children to an array, stores `currentIndex`, and starts a `setInterval` when `trigger` is true. Every two seconds it computes `(current + 1) % items.length`.
- A keyed `motion.div` inside `AnimatePresence mode="popLayout"` renders only the current item. Default variants are `initial: { y: 20, opacity: 0 }`, `animate: { y: 0, opacity: 1 }`, and `exit: { y: -20, opacity: 0 }`, with a 0.3-second transition and `initial={false}`.
- The reference does not implement reduced-motion handling, document-visibility pausing, stable width reservation, or a non-live accessible representation of every title.

Sources:

- Live reference: https://gyanendra.vercel.app/
- Public repository: https://github.com/gyanendracd/Portfolio
- Reference loop source: https://github.com/gyanendracd/Portfolio/blob/master/components/motion-primitives/text-loop.tsx
- Reference hero use: https://github.com/gyanendracd/Portfolio/blob/master/src/components/skiper36.tsx
- Upstream component documentation: https://motion-primitives.com/docs/text-loop

## Goals / Non-Goals

**Goals:**

- Reproduce the reference's simple indexed timer and vertical presence transition with this project's existing stack.
- Keep the four selected titles sourced from one typed data constant.
- Isolate timer, visibility, reduced-motion, and transition behavior from the already complex introduction.
- Keep the hero's visual geometry and accessible heading stable.

**Non-Goals:**

- Copying the reference's Three.js interactive mesh, red pipe, typography, or dark glass panels.
- Adding `motion`, Motion Primitives, a typewriter package, or another animation runtime.
- Making titles clickable, hover-driven, random, editable, or synchronized to sound.
- Changing the greeting strings, positioning sentence, Contact link, or experience entries.

## Decisions

### Adapt the mechanism, not the package

Create a focused client component such as `components/role-title-loop.tsx`. It accepts the four-title tuple and an `isPaused` flag, owns the active index, and uses `AnimatePresence` plus `motion` from the installed `framer-motion` 11 package.

Three approaches were considered:

1. **Local Framer Motion component — selected.** It reproduces the reference's behavior with an existing dependency and gives direct control over accessibility, pausing, and layout.
2. **Copy Motion Primitives verbatim.** Rejected because the copied source imports `motion/react` from Motion 12, introducing a second motion package and runtime solely for one small effect.
3. **CSS keyframes.** Rejected because four dynamic items, visibility pausing, reduced motion, and deterministic wraparound are clearer with a small React state machine; CSS would duplicate content or require brittle delay calculations.

### Use a slower editorial cadence

Keep the reference's transition geometry—20 px upward exit, 20 px upward entry path, opacity fade, and no first-render animation—but adapt the cadence:

- Display interval: 4 seconds.
- Transition duration: 0.35 seconds.
- Presence mode: `wait`, so outgoing and incoming titles do not overlap.
- Easing: a standard ease-out curve already supported by Framer Motion.

The reference's 2-second interval is too active beside a 1.5-second greeting glitch. Four seconds leaves the title settled for more than ten times the transition duration and makes the title loop secondary to the greeting.

### Keep layout dimensions deterministic

The title-loop wrapper remains inline within the sentence after `a`. It uses a relative inline-grid or inline-block container with:

- an invisible, in-flow sizing copy of the widest title;
- one absolutely positioned animated title occupying the same grid area;
- stable line height and centered alignment;
- width wrapping rules that match the existing title at narrow viewports.

The sizing copy is decorative and hidden from assistive technology. Reserving the largest title's dimensions prevents the `h1`, positioning paragraph, and Contact link from moving when title lengths differ. Browser checks cover 390 px mobile and desktop widths.

### Separate visual timing from accessible content

The animated layer is `aria-hidden`. A visually hidden, non-live text node exposes the complete stable phrase:

`Senior Software Engineer, Full Stack Engineer, Lead Software Engineer, and Front-End Engineer`

No `aria-live`, `role="status"`, focus, button semantics, or sound is added. A screen reader receives the title set once as part of the heading instead of hearing an unsolicited announcement every four seconds.

### Pause rather than compete

The loop runs only when:

- reduced motion is not requested;
- `document.visibilityState` is `visible`; and
- the greeting is not glitching.

The introduction passes its existing `isGlitching` state as `isPaused`. The title component listens for `visibilitychange`, clears its interval whenever paused, and starts a new full four-second interval when resumed. It keeps the current index rather than resetting to the first title. This ensures a greeting interaction cannot appear to advance the role, satisfying the updated multilingual-greeting contract.

For reduced motion, the component renders only the first title and never starts an interval. This is simpler and calmer than swapping text instantly every four seconds.

### Store titles with introduction content

Add `introRoleTitles` beside `introGreetings` and `introCallToAction` in `lib/data.ts`, validated as a readonly tuple in this exact order:

1. Senior Software Engineer
2. Full Stack Engineer
3. Lead Software Engineer
4. Front-End Engineer

The strings intentionally match existing `experiencesData` titles. The loop does not derive them from the experience array at runtime because presentation order is an introduction-content decision, not chronological history.

## Risks / Trade-offs

- [The automatic loop distracts from the greeting] → Use a four-second display interval, a 0.35-second transition, no sound, and pause during the greeting glitch.
- [Different title widths move the hero] → Reserve the widest title in normal flow and animate within that fixed region.
- [Long titles wrap differently on mobile] → Size and verify the region at 390 px and desktop widths, allowing consistent wrapping instead of forcing off-screen whitespace.
- [Timed text creates repeated screen-reader announcements] → Hide animated copies and expose one stable, non-live description containing every title.
- [Intervals continue in background tabs] → Stop the timer on `visibilitychange` and restart with a complete interval on return.
- [A second motion runtime increases bundle and behavior risk] → Use installed `framer-motion`; do not install `motion` or Motion Primitives.
- [The current live reference no longer demonstrates the loop] → Record both facts: the deployment is now static, while the earlier public source and upstream component document the exact implementation being adapted.

## Migration Plan

No data migration. Add the title tuple and local loop component, compose it into the existing heading, and verify before checking the checklist item. Rollback restores the static `Senior Software Engineer` element, removes the loop component and title tuple, and leaves the greeting implementation untouched.

## Open Questions

None.
