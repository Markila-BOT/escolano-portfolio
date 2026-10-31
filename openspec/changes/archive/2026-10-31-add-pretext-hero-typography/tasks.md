# Tasks

## 1. Benchmark

- [x] 1.1 Measure pretext gzip size on the hero path and prepare time for the three greetings and the positioning sentence. Verify `docs/pretext-hero.md` records those numbers and the current production LCP.
- [x] 1.2 Compare a production build that includes the effect with the current build. Verify the doc records the LCP delta. If hero-path gzip exceeds 15kB or LCP is more than 100ms slower, stop and leave the hero checklist rows open.

## 2. Effect, only if the gate passes

- [ ] 2.1 Dynamic-import pretext after first paint, prepare each string once, and rerun layout on width changes without `getBoundingClientRect`. Verify the initial HTML still contains the heading, first role, positioning sentence, and Contact link with JavaScript disabled.
- [ ] 2.2 Flow the positioning sentence around the portrait and reveal lines with Framer Motion, disabled for reduced motion. Verify one h1 remains, the greeting glitch and role loop tests still pass, and a 320px view does not overflow. Update the technology-convention pretext bullet only if this task ships.
- [ ] 2.3 Run `pnpm lint`, `pnpm exec tsc --noEmit`, and `pnpm build`. Verify they pass. Do not start the dev server.
