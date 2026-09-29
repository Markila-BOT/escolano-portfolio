# Design

## Context

See `proposal.md` for motivation. The introduction in `components/intro.tsx` is a client section: portrait, one `h1` with the greeting and `RoleTitleLoop`, the positioning sentence, and the Contact link. `three` is not installed. Motion stays on `framer-motion` 11. The chosen scope is a contained stage after the Contact link, not a full-viewport replacement.

The reference was checked on the live site and in its public source.

### What is live now

`https://gyanendra.vercel.app/` is Next.js on Vercel. The HTML for `/` renders a static "Full-stack software developer" line. It does not contain the cube instruction, a canvas, or the voxel scene. The interactive hero is not what the current deployment ships.

### Where the hero was actually made

The implementation is local source in `https://github.com/gyanendracd/Portfolio`, not an npm import.

- `154ce4d` "Hero v1" (2026-02-16) introduces the hero.
- Later commits on the same file: `e875e62` "add download resume", `d6393a4` "add red touch", `70e596c` "action button", and `a332f42` "num num" (2026-02-20), which is the file examined here.
- `src/components/HeroPage/index.jsx` renders one full-viewport wrapper around `Skiper36`.
- `src/components/skiper36.tsx` is the hero. It is a `"use client"` component. The repo also contains sibling copies `skiper15.tsx`, `skiper35.tsx`, `skiper59.tsx`, and `src/components/ui/skiper-ui/skiper40.jsx`. The name matches the Skiper UI block "Interactive3d Hero" at `https://www.skiper-ui.com/v1/skiper36`. That page installs it with `pnpm dlx shadcn add @skiper-ui/skiper36` and says it was adapted from the Three.js voxel painter. This portfolio's copy is the file in the GitHub repo, not a registry install.

That repo's `package.json` dependencies for this hero are:

- `next` 16.1.6, `react` 19.2.3, `react-dom` 19.2.3
- `tailwindcss` 4
- `framer-motion` 12.34.0 and `motion` 12.34.0
- `three` 0.182.0

There is no `@react-three/fiber` and no `@react-three/drei`. The scene is raw Three.js inside `useEffect`.

### How `Skiper36` is put together

The component stacks four layers in a `relative h-full w-full` frame:

1. Two glass panels on the left, absolutely positioned, with a red left border. They read "Hello I'm / Gyanendra Pal Singh" and "I'm a | " plus a `TextLoop` of "Software Developer" and "3D Artist". That loop is a separate feature and is already adapted here.
2. One instruction chip, absolutely positioned at the top right: `Click: add cube` and `Shift + Click: remove cube`. It is a DOM node (`div` / `strong`), `z-10`, `font-mono`, gold text (`#FFD700`) on `bg-black/10` with `backdrop-blur-sm`. It is not painted into the WebGL buffer. Drag, zoom, and pan are enabled in the canvas props and are not written in that chip.
3. `InteractiveMeshCanvas`, absolutely filling the frame (`top-0 h-full w-full`), behind the text.
4. `FloatingActions` and two positioning paragraphs along the bottom. Those belong to other checklist items and stay out of this change.

`HeroPage` calls the canvas with `backgroundColor="#141414"`, `cubeColor="#666666"`, `rollOverColor="#000000"`, `cubeSize={30}`, `gridSize={800}`, `initialCubesCount={8}`, and pan, zoom, and rotate all enabled. The component defaults differ (`cubeSize` 50, `gridSize` 1000, four cubes, pan off). The hero uses the call-site values.

### How `InteractiveMeshCanvas` works

This is the Three.js example `webgl_interactive_voxelpainter` (`https://threejs.org/examples/webgl_interactive_voxelpainter.html`, source `examples/webgl_interactive_voxelpainter.html`), wrapped in React and given props. The example page itself says "click: add voxel, shift + click: remove voxel". The same names and the same snap math are in `skiper36.tsx`.

Setup, all inside one `useEffect`:

- A `PerspectiveCamera` with a 45 degree field of view, near 1, far 10000, placed at the `cameraPosition` prop (default `{ x: 500, y: 500, z: 800 }`) and pointed at the origin.
- A `Scene` whose background is `backgroundColor`.
- A roll-over `BoxGeometry` with a transparent `MeshBasicMaterial`. It starts `visible: false` and previews where the next cube would land.
- A solid `BoxGeometry` and `MeshLambertMaterial` reused for every placed cube.
- A `GridHelper`. The hero forces center lines `#000000` and grid lines `#777777`, with `gridOpacity`.
- An invisible `PlaneGeometry` the size of the grid, rotated `-Math.PI / 2` so it lies on the ground. Raycasts hit this plane and any cube. The plane is the first entry in the `objects` array and is never deleted.
- `AmbientLight(0x606060, 3)` and a `DirectionalLight(0xffffff, 3)`.
- A `WebGLRenderer` with antialias and alpha, pixel ratio capped at 2, sized to the container, and appended as a canvas child.
- `OrbitControls` from `three/examples/jsm/controls/OrbitControls.js`, bound to that canvas. `enablePan`, `enableZoom`, and `enableRotate` come from props. A `change` listener calls `render`. There is no `requestAnimationFrame` loop. The scene draws once, then again only when the pointer, the controls, or the window size changes.

Pointer math uses the container rectangle, not the window:

- `pointer.x = ((clientX - rect.left) / rect.width) * 2 - 1`
- `pointer.y = -((clientY - rect.top) / rect.height) * 2 + 1`
- `raycaster.setFromCamera(pointer, camera)` then `intersectObjects(objects, false)`.

On move, the hit point plus the face normal is snapped onto the grid:

`position.copy(point).add(normal).divideScalar(cubeSize).floor().multiplyScalar(cubeSize).addScalar(cubeSize / 2)`

That places the roll-over cube on the cell under the pointer. If the ray misses, the preview hides.

On pointer down, the same raycast runs. If Shift is down and the hit is not the ground plane, the mesh is `scene.remove`d and spliced out of `objects`. Otherwise a new `Mesh` sharing `cubeGeo` and `cubeMaterial` is snapped the same way, added to the scene, and pushed onto `objects`.

Shift is tracked with `keydown` / `keyup` on `document` and `event.keyCode === 16`. That is the deprecated key code for Shift.

Startup places `initialCubesCount` cubes at `Math.random()` grid indexes from -10 to 9, sitting on the ground (`y = cubeSize / 2`).

Cleanup removes the listeners, calls `controls.dispose()` and `renderer.dispose()`, disposes the geometries and materials, and removes the canvas. The shared cube material is disposed once, which is correct because every voxel uses that one material.

## Goals / Non-Goals

**Goals:**

- Reproduce the voxel painter's raycast, grid snap, Shift-remove, and OrbitControls behavior inside a bounded introduction stage.
- Write every enabled control in DOM text, including drag, scroll, and pan, which the reference leaves unlabeled.
- Keep the stage from moving or covering the portrait, greeting, role titles, positioning sentence, and Contact link.
- Match light and dark surfaces, and keep the stage from animating by itself.

**Non-Goals:**

- Installing Skiper UI, React Three Fiber, drei, `motion`, or Motion Primitives.
- Copying the reference's full-viewport frame, red glass panels, gold chip, "Hello I'm Gyanendra", "3D Artist" title, `FloatingActions`, or the two positioning paragraphs.
- Playing a sound for cube or camera changes.
- Making cube placement the keyboard-only path. The reference is pointer plus Shift.

## Decisions

### Use raw Three.js, loaded only on the client

Add `three` with pnpm. Build the stage as a client component used by `components/intro.tsx`. Create the renderer inside an effect, or load the stage with `next/dynamic` and `ssr: false`, so the server render of the introduction never constructs a WebGL canvas. `OrbitControls` is imported from `three/examples/jsm/controls/OrbitControls.js`. If Next cannot transpile that path, set `transpilePackages: ["three"]` in `next.config.js`. Do not add a React renderer.

Three approaches were considered:

1. **Raw Three.js in an effect — selected.** It is how `skiper36.tsx` and the upstream voxel painter work, and it avoids a second scene graph.
2. **`pnpm dlx shadcn add @skiper-ui/skiper36`.** Rejected. The registry block is a full-screen demo, the install path is a Pro CLI, and it would pull the reference layout this change is not copying.
3. **React Three Fiber.** Rejected. Nothing in the reference uses it, and this repo has no other 3D scene that needs the React renderer.

### Keep the painter, change the frame

Place the stage after the Contact link, inside `#home`, with a fixed height (about 16rem, wider from `sm` up) and `max-w-full`. The canvas fills that box. The written controls are a sibling of the canvas, not a texture.

Use `event.key === "Shift"` instead of `keyCode === 16`.

Place the starting cubes on fixed grid cells instead of `Math.random()`, so the first view and the browser check are stable.

Read the page background and an accent from the existing CSS variables at mount, and again when the `dark` class on `html` changes, so the grid and cubes stay visible in both themes. Do not hardcode `#141414` or `#FFD700`.

Cap `devicePixelRatio` at 2. Do not start a continuous animation loop. Render on pointer, control, resize, and theme changes only.

On unmount, remove listeners, dispose controls, renderer, geometries, and materials, and drop the canvas.

If `WebGLRenderer` construction throws, leave the written controls in place and do not throw into the introduction.

### Leave the neighboring interactions alone

The stage's pointer listeners attach to its canvas, not to `document` or the greeting button. The Shift listeners may use `document` the way the reference does, and they must only record modifier state. They must not call `preventDefault` in a way that blocks typing in the contact form, and they must not call `playCue`.

## Risks / Trade-offs

- [Three.js increases the client bundle] → Load it only for this client stage, and do not import it from a server component.
- [A full-viewport canvas would cover the greeting and titles] → The stage is a fixed-height block after Contact.
- [Gold-on-glass instructions fail in light mode] → Use foreground and surface tokens and check both themes.
- [Random cubes make the first frame unverifiable] → Use fixed cells.
- [Shift-click is pointer-only] → The instruction is real text, and Tab still reaches the greeting and Contact. Cube editing itself stays pointer-driven, matching the reference.
- [OrbitControls wheel events steal page scroll while the pointer is over the stage] → Keep the stage short so the page can still scroll beside it, and do not attach the wheel listener to the whole introduction.
- [`three/examples/jsm` fails to bundle] → Add `transpilePackages` only if the build or dev compile reports that failure.

## Migration Plan

No data migration. Add the dependency, the stage component, and the introduction slot. Rollback removes the stage and the `three` dependency and leaves the introduction content as it is.

## Open Questions

None. The contained stage, the written controls, and the decision to add `three` without React Three Fiber are settled.
