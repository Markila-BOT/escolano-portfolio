# Tasks

## 1. MatterWorx steps

- [x] 1.1 Add "Previous part" and "Next part" on open MatterWorx details. Verify they move `aria-current` across the existing Problem, Role, and Outcome sentences and that another project does not render the controls.
- [x] 1.2 Keep all three sentences in the document before interaction and without JavaScript. Verify a no-JavaScript HTML check and a pre-activation render both include every sentence. Under reduced motion, verify the step changes without a transition.

## 2. Regression

- [x] 2.1 Verify drawer Previous and Next still change projects and are not the part controls. Run `pnpm lint` and `pnpm exec tsc --noEmit`. Do not start the dev server and do not add a dependency.
