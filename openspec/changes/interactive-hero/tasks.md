# Tasks

## 1. Dependency

- [x] 1.1 Add `three` with pnpm and verify `package.json` and `pnpm-lock.yaml` list it. Import `OrbitControls` from `three/examples/jsm/controls/OrbitControls.js` in the stage component's module graph. If that path fails to compile, set `transpilePackages: ["three"]` in `next.config.js`. Verify `pnpm exec tsc --noEmit` exits 0. Do not add React Three Fiber, drei, `motion`, or a Skiper UI package.

## 2. Voxel stage

- [x] 2.1 Add a client stage component that builds the voxel painter in an effect: perspective camera, grid, invisible ground plane, shared cube geometry and material, roll-over preview, raycast from the container rectangle, grid snap, click to add, Shift-click (`event.key === "Shift"`) to remove, and OrbitControls for drag, scroll, and pan. Render only when the pointer, controls, size, or theme changes. Do not start a continuous animation loop. Place the starting cubes on fixed cells so at least one cube is visible before a click. Cap the pixel ratio at 2. On unmount, remove listeners and dispose the controls, renderer, geometries, and materials. If the renderer cannot be created, leave the component mounted without throwing. Verify `pnpm exec tsc --noEmit` exits 0.
- [x] 2.2 Render the controls as DOM text outside the canvas, naming click to add a cube, Shift-click to remove a cube, drag to rotate, scroll to zoom, and pan to move the view. Use foreground and surface tokens so the text meets 4.5:1 in light and dark mode, and read the scene colors from the existing CSS variables when the theme class changes. Give the stage a fixed height so cube edits do not change its layout size. Verify the instruction is not `aria-hidden`, the canvas does not trap focus, and the component does not call `playCue`.

## 3. Introduction integration

- [x] 3.1 Render the stage after the Contact link inside `#home`. Keep the portrait, greeting, role-title loop, positioning sentence, and Contact link in their current order. Load the canvas only on the client. Verify a click on the stage does not advance the greeting, the greeting glitch still pauses the role-title loop, and Contact still points at `#contact`. Verify `pnpm exec tsc --noEmit` exits 0.

## 4. Browser verification and checklist

- [x] 4.1 On the already-running site, at 390 px and desktop, confirm the stage sits after Contact, the portrait, greeting, role titles, positioning sentence, and Contact stay put when a cube is added and removed, a grid and at least one cube are visible first, click adds a snapped cube, Shift-click removes one, drag rotates, scroll zooms, and pan moves the view. Confirm the written controls are readable in light and dark mode without hovering, Tab still reaches the greeting and Contact, sound on adds no cue, and reduced motion leaves the view still until the visitor moves it. Do not start the dev server. Do not submit the contact form.
- [x] 4.2 After task 4.1 passes, mark only the CHECKLIST.MD section 3.1 interactive-hero item done and recount the Progress table. Current spec excludes section 5 and sections 11 and later. A line containing **partial** remains partial even if checked. Verify that item is `[x]` and the table matches the recounted totals. Leave task 4.2 open if the server is down or task 4.1 fails.
