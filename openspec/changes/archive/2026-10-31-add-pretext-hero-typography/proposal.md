# Proposal

## Why

Drawer descriptions already use `@chenglou/pretext`. The hero still wraps with `react-wrap-balancer` and does not use measured line ranges. The checklist asks for a benchmark first, then one flagship effect, a reduced-motion fallback, and a semantic heading that stays readable with JavaScript off.

## What Changes

- Benchmark pretext on the hero against the current production build before shipping an effect. Record bundle cost, prepare time, and resize cost.
- Do not ship the effect if the hero path adds more than 15kB gzip of pretext code on first load, or if a local production LCP run is more than 100ms slower than the current build. In that case leave the checklist rows open and keep the current hero.
- If the budget passes, prepare the three greeting strings and the positioning sentence once, and rerun layout only when width changes. Do not read layout with `getBoundingClientRect`.
- One flagship effect: the positioning sentence flows around the portrait using measured line ranges. Animate those lines with the existing Framer Motion dependency.
- Keep one semantic heading, readable no-JavaScript content, Geist metrics in whole pixels, and a static reduced-motion fallback. The role-title loop stays on its current animation.

## Capabilities

### New Capabilities

- `pretext-hero`: Measured hero lines for the greeting and positioning sentence, gated by a recorded benchmark, with one portrait-wrap effect.

### Modified Capabilities

- `hero-initial-paint`: Client measurement must not delay, hide, or replace the initial readable introduction. The current paint budgets stay in force.

## Impact

`components/intro.tsx`, `components/intro-greeting.tsx`, and `docs/technology-convention.md` if pretext is allowed on the hero and not only on drawer demand. `react-wrap-balancer` remains for headlines outside this effect. `multilingual-greeting` and `role-title-loop` keep their current behavior. No second font package and no second animation library.
