# Proposal

## Why

The introduction can be read, and the greeting and role titles can change, but the visitor cannot change the hero itself, and nothing on screen says how. The checklist item asks for the interactive hero from Gyanendra Pal Singh's portfolio: a scene the visitor can edit, with the controls written beside it.

## What Changes

- Put a contained voxel stage in the introduction, after the Contact link. Click adds a cube, Shift-click removes one, drag rotates the view, scroll zooms, and a pan gesture moves the view.
- Write those controls in real text on the stage. The sentence is visible without hovering and is not drawn inside the canvas.
- Keep the portrait, greeting, role-title loop, positioning sentence, and Contact link where they are. The stage does not replace them and does not sit full-viewport behind them.
- Declare `three` as a direct dependency. Do not add React Three Fiber, drei, Motion 12, or a Skiper UI package.
- Do not play an interaction sound for adding, removing, or moving the view.
- Finish the unused `components/voxel-stage.tsx` draft by mounting it. Do not add a second stage component.
- Mark the checklist item done only after the stage is verified in the browser. Leave every other checklist item as it is.

## Capabilities

### New Capabilities

- `interactive-hero`: A contained introduction stage where the visitor places and removes cubes, moves the camera, and can read the controls on screen.

### Modified Capabilities

- None. The greeting, role-title loop, positioning sentence, Contact link, and sound cues keep their current requirements. The stage must not intercept those controls.

## Impact

- `components/intro.tsx` renders the existing stage after the Contact link. The portrait, heading, positioning sentence, and Contact link stay in their current order.
- `components/voxel-stage.tsx` already builds the canvas and the written instruction, and it is not imported anywhere. This change mounts that component.
- `three` is declared with pnpm. `OrbitControls` stays an import from `three/examples/jsm`, not a second package. The lockfile already contains `three@0.186.1`, and `package.json` does not list it.
- `openspec/changes/interactive-hero` is an earlier plan whose tasks are checked. That check is not evidence the page shows the stage. This change is the one to apply.
- No new route, API, or content claim. The checklist item in section 3.1 stays open until browser verification passes.
