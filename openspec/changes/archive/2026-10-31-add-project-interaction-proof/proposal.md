# Proposal

## Why

Project details play video or show a case study, and the checklist still marks interactive demos partial. The reference sites use one interaction as the proof. This site already has a 3D career journey; another WebGL world, or an iframe of a private product, is the wrong proof.

## What Changes

- Add one keyboard-operable walkthrough on MatterWorx, the first featured case study.
- The walkthrough steps through that project's existing Problem, Role, and Outcome sentences, in that order. It must not add a sentence.
- With JavaScript off, and before the visitor starts the walkthrough, all three sentences stay visible as they are today.
- Do not iframe another origin, load Three.js for this proof, or change the experience journey.

## Capabilities

### New Capabilities

- `project-interaction-proof`: One in-drawer walkthrough that restates a single project's existing case study, one part at a time, without hiding the full text from no-JavaScript readers.

### Modified Capabilities

None. Case-study wording and drawer Previous/Next stay on their current specs.

## Impact

The project drawer for MatterWorx only. Other projects keep today's details. No new dependency. Reduced motion shows the selected part immediately.
