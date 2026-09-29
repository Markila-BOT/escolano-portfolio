# Design

## Context

The introduction in `components/intro.tsx` is the portrait, one `h1` with the greeting and `RoleTitleLoop`, the positioning sentence, and the Contact link. `components/voxel-stage.tsx` already implements a bounded painter and a written instruction, and nothing imports it. `package.json` does not list `three`. The lockfile already has `three@0.186.1`. `openspec/changes/interactive-hero` checked its tasks, and the checklist item is still open. This change mounts the existing stage. It does not start a second one.

The reference was read from the public source, not from the current deployment.

### What is live now

`https://gyanendra.vercel.app/` is Next.js on Vercel. The HTML for `/` renders a static "Full-stack software developer" line. It does not contain the cube instruction, a canvas, or the voxel scene. The interactive hero is not what the current deployment ships.

### Where the hero was actually made

The implementation is source in `https://github.com/gyanendracd/Portfolio`, commit `a332f42` ("num num", 2026-02-20) on `src/components/skiper36.tsx`. The file was introduced in `154ce4d` "Hero v1" (2026-02-16) and edited by `e875e62` "add download resume", `d6393a4` "add red touch", and `70e596c` "action button".

`src/components/HeroPage/index.jsx` renders one `h-screen w-full` wrapper around `Skiper36`. There is no React Three Fiber and no drei. The scene is raw Three.js inside `useEffect`.

That repo's dependencies for this hero are Next.js 16.1.6, React 19.2.3, Tailwind CSS 4, `framer-motion` 12.34.0, `motion` 12.34.0, and `three` ^0.182.0.

The filename matches the Skiper UI block "Interactive3d Hero" at `https://www.skiper-ui.com/v1/skiper36`. That page installs the block with `pnpm dlx shadcn add @skiper-ui/skiper36` and says it was adapted from the Three.js voxel painter. The portfolio copy is the file in the GitHub repo, not a registry install in this project.

### How `Skiper36` is put together

`Skiper36` is a `"use client"` component. It stacks four layers in a `relative flex h-full w-full flex-col justify-end overflow-hidden` frame whose page color is `#383838`:

1. Two glass panels on the left, absolutely positioned, with a 5px red left border, white mono type, `bg-black/10`, and `backdrop-blur-sm`. The upper panel reads "Hello I'm" and "Gyanendra Pal Singh" at `text-6xl`. The lower panel reads "I'm a", a red "|", and a `TextLoop` of "Software Developer" and "3D Artist". That loop is a separate feature and is already adapted here.
2. One instruction chip, absolutely positioned at the top right (`right-8 top-20 z-10`): `<strong>Click</strong>: add cube <strong>Shift + Click</strong>: remove cube`. It is a DOM `div`, `font-mono text-sm`, gold text (`#FFD700`) on `bg-black/10` with `backdrop-blur-sm`. It is not painted into the WebGL buffer. Drag, zoom, and pan are enabled in the canvas props and are not written in that chip.
3. `InteractiveMeshCanvas`, absolutely filling the frame (`top-0 h-full w-full`), behind the text.
4. `FloatingActions` and two positioning paragraphs along the bottom. Those belong to other checklist items and stay out of this change.

`HeroPage` calls the canvas with `backgroundColor="#141414"`, `cubeColor="#666666"`, `rollOverColor="#000000"`, `cubeSize={30}`, `gridSize={800}`, `initialCubesCount={8}`, and pan, zoom, and rotate all enabled. The component defaults differ (`cubeSize` 50, `gridSize` 1000, four cubes, pan off, background `#1C1C22`). The hero uses the call-site values. `textColor` is accepted and then unused. The grid colors are hardcoded `#000000` and `#777777` inside the effect, with the `textColor` arguments commented out.

### How `InteractiveMeshCanvas` works

This is the Three.js example `webgl_interactive_voxelpainter` (`https://threejs.org/examples/webgl_interactive_voxelpainter.html`), wrapped in React and given props. The example page says "click: add voxel, shift + click: remove voxel". The same snap math is in `skiper36.tsx`.

Setup, all inside one `useEffect`:

- A `PerspectiveCamera` with a 45 degree field of view, near 1, far 10000. Its first aspect ratio is `window.innerWidth / window.innerHeight`, not the container. It is placed at the `cameraPosition` prop (default `{ x: 500, y: 500, z: 800 }`) and pointed at the origin. Resize later sets the aspect from the container.
- A `Scene` whose background is `backgroundColor`.
- A roll-over `BoxGeometry` with a transparent `MeshBasicMaterial`. It starts `visible: false` and previews where the next cube would land.
- A solid `BoxGeometry` and `MeshLambertMaterial` reused for every placed cube.
- A `GridHelper` with center lines `#000000`, grid lines `#777777`, and `gridOpacity`.
- An invisible `PlaneGeometry` the size of the grid, rotated `-Math.PI / 2` so it lies on the ground. Raycasts hit this plane and any cube. The plane is the first entry in the `objects` array and is never deleted.
- `AmbientLight(0x606060, 3)` and a `DirectionalLight(0xffffff, 3)` aimed from `(1, 0.75, 0.5)`.
- A `WebGLRenderer` with antialias and alpha, pixel ratio capped at 2, sized to the container, and appended as a canvas child.
- `OrbitControls` from `three/examples/jsm/controls/OrbitControls.js`, bound to that canvas. `enablePan`, `enableZoom`, and `enableRotate` come from props. A `change` listener calls `render`. There is no `requestAnimationFrame` loop. `animationIdRef` is declared and cancelled on cleanup, and nothing ever stores an id in it. The scene draws once, then again only when the pointer, the controls, or the window size changes.

Pointer math uses the container rectangle, not the window:

- `pointer.x = ((clientX - rect.left) / rect.width) * 2 - 1`
- `pointer.y = -((clientY - rect.top) / rect.height) * 2 + 1`
- `raycaster.setFromCamera(pointer, camera)` then `intersectObjects(objects, false)`.

On move, the hit point plus the face normal is snapped onto the grid:

`position.copy(point).add(normal).divideScalar(cubeSize).floor().multiplyScalar(cubeSize).addScalar(cubeSize / 2)`

That places the roll-over cube on the cell under the pointer. If the ray misses, the preview hides.

On pointer down, the same raycast runs immediately. If Shift is down and the hit is not the ground plane, the mesh is `scene.remove`d and spliced out of `objects`. Otherwise a new `Mesh` sharing `cubeGeo` and `cubeMaterial` is snapped the same way, added to the scene, and pushed onto `objects`. Because this runs on pointer down, a drag that also rotates the camera can add or remove a cube. The local draft does not copy that.

Shift is tracked with `keydown` / `keyup` on `document` and `event.keyCode === 16`. That is the deprecated key code for Shift.

Startup places `initialCubesCount` cubes at `Math.random()` grid indexes from -10 to 9, sitting on the ground (`y = cubeSize / 2`).

Cleanup removes the listeners, calls `controls.dispose()` and `renderer.dispose()`, disposes the cube and roll-over geometries and materials and the plane geometry, and removes the canvas. It does not dispose the plane material or the grid.

## Goals / Non-Goals

**Goals:**

- Show the painter in the introduction, with the controls written in DOM text, including drag, scroll, and pan, which the reference leaves unlabeled.
- Keep a drag from also adding or removing a cube.
- Keep the stage from moving or covering the portrait, greeting, role titles, positioning sentence, and Contact link.
- Match light and dark surfaces, and keep the camera still until the visitor moves it.

**Non-Goals:**

- Installing Skiper UI, React Three Fiber, drei, `motion`, or Motion Primitives.
- Copying the reference's full-viewport frame, red glass panels, gold chip, "Hello I'm Gyanendra", "3D Artist" title, `FloatingActions`, or the two positioning paragraphs.
- Playing a sound for cube or camera changes.
- Making cube placement the keyboard-only path. The reference is pointer plus Shift.
- Replacing `components/voxel-stage.tsx` with a second painter.

## Decisions

### Mount the draft that is already in the repo

`components/voxel-stage.tsx` is the adaptation. `VoxelStage` renders the sentence "Click to add a cube. Shift-click to remove a cube. Drag to rotate. Scroll to zoom. Pan to move the view." in a `text-foreground` paragraph, then a fixed `h-64` viewport. The canvas is `aria-hidden`. The component does not import the sound context.

`intro.tsx` imports and renders `VoxelStage` after the Contact link, inside `#home`. The portrait, greeting, role-title loop, positioning sentence, and Contact link stay in their current order. The canvas is created in an effect, so the server render of the introduction does not construct a WebGL canvas.

Declare `three` in `package.json` with pnpm so the existing lockfile entry is a direct dependency. Keep the `OrbitControls` import from `three/examples/jsm/controls/OrbitControls.js`. Add `transpilePackages: ["three"]` in `next.config.js` only if that import fails to compile.

Three approaches were considered:

1. **Mount the existing raw Three.js stage — selected.** It already follows the voxel painter, and it is unused.
2. **`pnpm dlx shadcn add @skiper-ui/skiper36`.** Rejected. The registry block is a full-screen demo, the install path is a Pro CLI, and it would pull the reference layout this change is not copying.
3. **React Three Fiber.** Rejected. Nothing in the reference uses it, and this repo has no other 3D scene that needs the React renderer.

### Keep the painter's math, and separate a click from a drag

The draft already does this. Keep it.

- Cube size 30, matching the reference call site. Grid size 480 with 16 divisions, so the grid fits the short stage. The reference grid is 800 units inside a full viewport.
- Camera aspect comes from the container on every resize, including the first frame. The reference's first frame uses the window.
- Starting cubes sit on fixed cells `(0, 0)`, `(1, 0)`, and `(0, 1)`, not `Math.random()`.
- Pointer coordinates use the container rectangle and the same snap formula as `skiper36.tsx`.
- Shift uses `event.key === "Shift"`, and blur clears it. The reference uses `keyCode === 16`.
- Pointer down records the point. Pointer up adds or removes only when the pointer moved 6px or less. A longer move is a camera drag and does not edit cubes. The reference adds or removes on pointer down.
- `OrbitControls` has rotate, zoom, and pan enabled, damping and auto-rotate off, and renders on `change`. There is no animation loop.
- Scene colors are read from the existing CSS variables when the theme class changes. Do not hardcode `#141414` or `#FFD700`.
- Pixel ratio stays capped at 2. Unmount removes listeners and disposes the controls, renderer, geometries, and materials.
- If `WebGLRenderer` construction throws, the written instruction stays and the introduction does not throw.

### Leave the neighboring interactions alone

Pointer listeners attach to the canvas, not to the greeting button. The Shift listeners stay on `document` and only record modifier state. They must not call `preventDefault` in a way that blocks typing in the contact form, and they must not call `playCue`.

## Risks / Trade-offs

- [Three.js increases the client bundle] → Load it only from this client stage, and do not import it from a server component.
- [A full-viewport canvas would cover the greeting and titles] → The stage is a fixed-height block after Contact.
- [Gold-on-glass instructions fail in light mode] → The instruction uses foreground text on the page surface.
- [Random cubes make the first frame unverifiable] → The draft uses fixed cells.
- [The reference adds a cube on pointer down, so a drag also edits the scene] → The draft edits only on a short pointer up.
- [Shift-click is pointer-only] → The instruction is real text, and Tab still reaches the greeting and Contact.
- [OrbitControls wheel events steal page scroll while the pointer is over the stage] → The stage stays one short block, and the wheel listener is not attached to the whole introduction.
- [`three/examples/jsm` fails to bundle] → Add `transpilePackages` only if the compile reports that failure.
- [The earlier change's checked tasks look finished] → The stage is not imported, and `package.json` does not list `three`. Apply this change.

## Migration Plan

No data migration. Declare the dependency, mount the existing stage, and verify it. Rollback removes the import and the `three` dependency and leaves the introduction content as it is. The unused stage file can go with that rollback.

## Open Questions

None. The contained stage, the written controls, and the decision to use the existing `three` painter without React Three Fiber are settled.
