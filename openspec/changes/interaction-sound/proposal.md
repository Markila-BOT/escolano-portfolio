# Proposal

## Why

The page has no interaction sound, and nothing should play until a visitor asks for it. A sound control has to remember that choice, stay clear of the theme switch, and leave navigation, projects, and the contact form usable while audio is off.

## What Changes

- Add a sound control that turns interaction audio on and off. The choice is saved in local storage and defaults to off.
- Name the control for the state it will switch to: "Turn sound on" or "Turn sound off". Give it at least a 44×44 px target and keep it off the theme switch.
- While sound is on, play a short cue for navigation, the theme switch, opening a project, closing a project, and contact form success or error.
- Stop playback immediately when sound is turned off, including a cue already in progress.
- Request the audio file only after the visitor has opted in. Use one sprite, or a small set of files. Do not add Howler as its own dependency.
- Do not play a sound on load, including when a saved choice is on. Every interaction above still works with sound off.

## Capabilities

### New Capabilities

- `interaction-sound`: Optional short cues for navigation, theme, projects, and the contact form, gated by a remembered on/off control.

### Modified Capabilities

- None. `accessible-navigation` already names the menu and the theme toggle. This change adds a separate control and does not change those names.

## Impact

- A new client control near the theme switch in `components/theme-switch.tsx`, plus the header links, the project drawer in `components/project.tsx`, and the contact form result in `components/contact.tsx`.
- One new dependency, `use-sound`, installed with pnpm. Howler stays a transitive dependency of that package. No other new library.
- One audio sprite under `public/`, fetched only after opt-in.
- `CHECKLIST.MD` section 1.3, once the behavior above is in place.
