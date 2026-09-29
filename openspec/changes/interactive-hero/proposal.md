# Proposal

## Why

The introduction can be read and the greeting can be changed, but the visitor cannot change the hero itself, and nothing on screen says how. The checklist item asks for the interactive hero from Gyanendra Pal Singh's portfolio: a scene the visitor can edit, with the controls written beside it.

## What Changes

- Add a contained voxel stage inside the introduction. Click adds a cube, Shift-click removes one, drag rotates the view, scroll zooms, and a drag with the pan gesture moves the view.
- Write those controls in real text on the stage. The sentence is visible without hovering and is not drawn inside the canvas.
- Keep the portrait, greeting, role-title loop, positioning sentence, and Contact link where they are. The stage does not replace them and does not sit full-viewport behind them.
- Add `three` as the only new dependency. Do not add React Three Fiber, drei, Motion 12, or a Skiper UI package.
- Do not play an interaction sound for adding, removing, or moving the view.
- Mark the checklist item done only after the stage is verified in the browser. Leave every other checklist item as it is.

## Capabilities

### New Capabilities

- `interactive-hero`: A contained introduction stage where the visitor places and removes cubes, moves the camera, and can read the controls on screen.

### Modified Capabilities

- None. The greeting, role-title loop, positioning sentence, Contact link, and sound cues keep their current requirements. The stage must not intercept those controls.

## Impact

- `components/intro.tsx` gains the stage without replacing the portrait, heading, positioning sentence, or Contact link.
- A new client component owns the canvas, the pointer and keyboard handlers, and the written instruction.
- `three` is added with pnpm. `OrbitControls` comes from `three/examples/jsm`, not a second package.
- No new route, API, or content claim. The checklist item in section 3.1 stays open until browser verification passes.
