# Tasks

## 1. Dependency

- [ ] 1.1 Declare `three` as a direct dependency with pnpm and verify `package.json` and `pnpm-lock.yaml` list it. Keep the `OrbitControls` import in `components/voxel-stage.tsx` on `three/examples/jsm/controls/OrbitControls.js`. If that path fails to compile, set `transpilePackages: ["three"]` in `next.config.js`. Verify `pnpm exec tsc --noEmit` exits 0. Do not add React Three Fiber, drei, `motion`, or a Skiper UI package.

## 2. Mount the existing stage

- [ ] 2.1 Render `VoxelStage` from `components/intro.tsx` after the Contact link inside `#home`. Do not add a second stage component. Keep the portrait, greeting, role-title loop, positioning sentence, and Contact link in their current order. Verify the written instruction names click, Shift-click, drag, scroll, and pan, is not `aria-hidden`, and the canvas is `aria-hidden`. Verify a stage handler does not call `playCue`, Shift is read with `event.key === "Shift"`, and a pointer move beyond 6px does not add or remove a cube. Verify `pnpm exec tsc --noEmit` exits 0.

## 3. Browser verification and checklist

- [ ] 3.1 On the already-running site, at 390 px and desktop, confirm the stage sits after Contact, a grid and at least one cube are visible first, the written controls are readable in light and dark mode without hovering, click adds a snapped cube, Shift-click removes one, a drag rotates without editing cubes, scroll zooms, and pan moves the view. Confirm the portrait, greeting, role titles, positioning sentence, and Contact stay put, Tab still reaches the greeting and Contact, sound on adds no cue, and reduced motion leaves the view still until the visitor moves it. Do not start the dev server. Do not submit the contact form.
- [ ] 3.2 After task 3.1 passes, mark only the CHECKLIST.MD section 3.1 interactive-hero item done and recount the Progress table. Current spec excludes section 5 and sections 11 and later. A line containing **partial** remains partial even if checked. Verify that item is `[x]` and the table matches the recounted totals. Leave task 3.2 open if the server is down or task 3.1 fails.
