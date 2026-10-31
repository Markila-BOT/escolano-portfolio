# Design

## Context

MatterWorx already renders Problem, Role, and Outcome from `caseStudy` in the drawer. Previous and Next change the open project. The 3D journey is a separate section and already loads Three.js on request. The drawer must not iframe external sites for this proof.

## Goals / Non-Goals

**Goals:**

- One walkthrough on MatterWorx only.
- Steps use the existing three sentences.
- No-JavaScript readers still see all three.

**Non-Goals:**

- A second Three.js scene, a live embed, or walkthroughs on other projects.

## Decisions

### Progressive control

In the drawer, when `project.title === "MatterWorx"`, add Previous and Next step buttons. Keep Problem, Role, and Outcome in the document at all times, including after hydration. Activating a step scrolls that block into view and sets `aria-current="step"` on it. Do not unmount or hide the other sentences.

### Copy

Read `project.caseStudy`. Do not add a second copy of the sentences in the component.

### Motion

Use the existing Framer Motion only for a short highlight. Under `prefers-reduced-motion`, skip the highlight and only move `aria-current`.

## Risks / Trade-offs

- A highlight-only walkthrough is quieter than a live demo. It meets the constraint that no sentence is invented and no third-party frame is loaded.
- Drawer Previous/Next for projects must not be confused with step Previous/Next. Name the step controls "Previous part" and "Next part".
