# Tasks

## 1. Player

- [x] 1.1 Add `use-sound` with pnpm. Verify `package.json` lists `use-sound` and does not list `howler` as a direct dependency.
- [x] 1.2 Add one original sprite at `public/sounds/interactions.mp3` and a sprite map for `navigate`, `theme`, `open`, `close`, `success`, and `error`. Verify the file is one sprite, has no speech, and is not a third-party recording.

## 2. Control

- [x] 2.1 Add a client sound context whose first render is off, then read local storage key `sound` in an effect. Do not return null from the provider. Verify a first visit stays off, a saved choice appears after mount, and applying that choice does not play a cue.
- [x] 2.2 Render a `Button` `variant="chrome"` `size="icon"` at `h-12 w-12`, fixed above the theme switch, with a `react-icons` icon marked hidden and the accessible name "Turn sound on" or "Turn sound off". Verify the target is at least 44 by 44 CSS pixels and does not cover the theme switch at 320 px or at a desktop width.

## 3. Cues

- [x] 3.1 Play `navigate` from the header, mobile, and logo link clicks, `theme` from the theme switch when sound is already on, `open` and `close` from the project drawer `onOpenChange`, and `success` or `error` beside the contact toasts. Mount the player only while sound is on. Verify each of those actions plays only while sound is on, scrolling a section into view does not play, and each action still finishes while sound is off.
- [x] 3.2 Call `stop` when sound is turned off, including a cue already playing. Verify the cue stops, the sprite is not requested while sound stays off, and a load with sound saved on does not play until the visitor triggers a cue.

## 4. Checklist and check

- [x] 4.1 Mark the six CHECKLIST.MD section 1.3 items done and recalculate the progress row from the checkboxes. Verify those six items are `[x]` and section 1.2 stays `[x]`.
- [x] 4.2 On the already-running site, confirm the default is off, the saved choice returns, the names and placement match the spec, a cue plays only while sound is on, turning sound off stops a cue in progress, and the page still navigates, switches theme, opens a project, and submits with sound off. Do not start the dev server.
