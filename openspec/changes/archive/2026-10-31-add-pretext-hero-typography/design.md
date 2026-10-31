# Design

## Context

`@chenglou/pretext` is loaded for drawer descriptions. The convention says it stays on drawer demand. The hero uses `react-wrap-balancer` in `components/intro-greeting.tsx` and must stay readable in the initial HTML under `hero-initial-paint`. The greeting glitch and the role-title loop have their own specs. Mobile LCP is already over budget.

## Goals / Non-Goals

**Goals:**

- Benchmark before any hero effect.
- Ship one portrait wrap only if the 15kB gzip and 100ms LCP gates pass.
- Keep one heading and no-JavaScript text.

**Non-Goals:**

- Pretext on the role-title loop.
- Replacing the greeting glitch.
- A new font or animation library.

## Decisions

### Measure first

Add a small bench script that imports pretext the way the hero would, prepares the three greetings and the positioning sentence with Geist metrics in whole pixels, and prints prepare time and gzip size of the pretext chunk. Run Lighthouse or the existing lab method once on the current production build and once with the effect. Record both in `docs/pretext-hero.md`. If either gate fails, stop. Do not leave the effect half-wired.

### Load after paint

Dynamic-import pretext from a client child of the intro. The server HTML is the current heading and sentence. Measurement failure leaves that HTML. Do not use `getBoundingClientRect` for breaks. Cache preparations in module scope keyed by text and font.

### One effect

Apply `layoutNextLineRange` only to the positioning sentence so lines shorten beside the portrait. Reveal with the existing Framer Motion variants, disabled under `prefers-reduced-motion`. Greeting text can be prepared and cached, but its visible transition stays the current glitch. `react-wrap-balancer` remains on other headlines.

### Convention

If the effect ships, update the pretext bullet in `docs/technology-convention.md` to allow the hero client chunk in addition to the drawer. If it does not ship, leave that bullet unchanged.

## Risks / Trade-offs

- The hero is on the LCP path. The gate exists because a drawer-only library can still hurt the homepage when imported there.
- Portrait wrap can collide with the 320px layout. If the measured lines overflow, do not ship the wrap; record that as a failed visual check even when the byte and LCP gates pass.
