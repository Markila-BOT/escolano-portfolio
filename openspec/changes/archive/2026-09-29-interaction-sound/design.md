# Design

## Context

See proposal.md for why. There is no audio in the repo. `components/theme-switch.tsx` is a `Button` `variant="chrome"` `size="icon"`, fixed at `bottom-5 right-5` with `h-12 w-12`. Its accessible name is the theme it will switch to. Header, mobile, and logo links set the active section in their click handlers. `lib/hooks.ts` also sets the active section when a section scrolls into view. Each project in `components/project.tsx` is a Vaul `Drawer` with no `onOpenChange`. `components/contact.tsx` calls `toast.error` or `toast.success` after `sendEmail`. `docs/technology-convention.md` says to add a dependency only when the table has no library for the job, and to install with pnpm. Nothing in that table plays audio.

## Goals / Non-Goals

**Goals:**

- One remembered on/off control and one sprite, played only after opt-in and only for the actions in the spec.

**Non-Goals:**

- A cue for scrolling a section into view, hovering, the greeting scramble, or the sound control itself.
- Muting based on `prefers-reduced-motion`. Sound stays a separate choice.
- Adding `howler` directly, or a second player.
- Moving the theme switch.

## Decisions

### `use-sound` is the only new dependency

Install `use-sound` with pnpm. Do not add `howler` to `package.json`. It arrives as a dependency of `use-sound`. Play cues through the sprite id argument that hook already accepts. Call the `stop` handle it returns when the visitor turns sound off.

Alternative considered: call Howler from the app. Rejected. The checklist forbids a second direct dependency, and the convention says not to add a library the chosen wrapper already brings.

### The preference lives in a client context that does not blank the page

A small context, same shape as the theme context, holds `soundOn` and `toggleSound`. The initial value is `false` on the server and the first client render. An effect then reads local storage key `sound`. That avoids a hydration mismatch and avoids the theme provider's `return null` gate. Turning sound on writes `"on"`. Turning it off writes `"off"` and calls `stop` before the player unmounts.

The player hook mounts only while `soundOn` is true, with `preload` left to that mount. While the choice is off, the module may be in the client bundle, but the sprite URL is not requested.

Alternative considered: read local storage during render. Rejected. The server and the client would disagree when the saved choice is on.

### One original sprite

Add `public/sounds/interactions.mp3`, a short original sprite with no speech and no third-party recording. Map ids `navigate`, `theme`, `open`, `close`, `success`, and `error`. Do not play a cue from the effect that applies the saved choice.

### The control matches the theme switch and sits above it

Use `Button` `variant="chrome"` `size="icon"` with `h-12 w-12`, which is above the 44 px minimum and matches the theme switch. Fix it at `bottom-20 right-5` so it stacks above `bottom-5 right-5` with a gap. The icon comes from `react-icons` and is `aria-hidden`. The accessible name is "Turn sound on" or "Turn sound off". The button's existing focus ring stays.

### Cues attach to the existing handlers

- Header, mobile, and logo link clicks call `navigate` after the existing active-section update. `useSectionInView` does not.
- `toggleTheme` calls `theme` only when sound is already on. The sound control's own click does not play a cue.
- `Drawer` `onOpenChange` calls `open` or `close`. That covers the card, the close button, overlay, and Escape.
- The contact action calls `success` or `error` next to the existing toast.

Each call is skipped when sound is off, and none of these handlers wait on audio.

## Risks / Trade-offs

- [A browser blocks playback until a gesture] → Every cue is started from a click or from the form action the visitor just submitted. The load effect never calls play.
- [The sprite is missing or the path 404s] → The interactions still finish. Playback failure must not throw into the click handler.
- [Vaul calls `onOpenChange` twice for one gesture] → Play on the transition only, and ignore a repeat of the same open state.
- [The sound button crowds the theme switch on a short screen] → Keep the theme switch where it is. If the two boxes meet, move the sound control up, not the theme switch.

## Migration Plan

Add the dependency, the sprite, the context, and the control. Wire the four call sites. Rollback is removing those call sites and the dependency. No stored data needs a migration beyond ignoring the `sound` local storage key.

## Open Questions

None. One sprite is the choice. A small set of files is allowed by the spec only if a single sprite cannot be produced.
