# Design

## Context

See proposal.md for why. The greeting is a button inside the only heading. One mouse pointer entry advances `introGreetings` once; pointer leave re-arms it; touch and keyboard activation advance once. The current transition is a Framer Motion crossfade of about 220 ms. `SoundContext` already exposes `playCue`, loads `public/sounds/interactions.mp3` only while sound is on, and maps sprite regions in `lib/interaction-sprite.ts`. The greeting region is `[1300, 80]`, an 80 ms tick appended after the error cue, which ends at 1140 ms. Framer Motion 11.18.2 is already installed. The player uses `interrupt: true`.

## Goals / Non-Goals

**Goals:**

- Replace the crossfade with a glitch of the exact greeting strings that lasts about 1.5 seconds.
- Replace the tick with one glitch burst of about 1.5 seconds on the existing sprite.
- Keep one change per mouse pointer entry, and keep touch and keyboard on the same one-step change.

**Non-Goals:**

- A new animation or audio library.
- Random-letter substitution, new languages, automatic cycling, or a second audio player.
- Changing the positioning sentence, the Contact link, or the other cue regions.

## Decisions

### One change per pointer entry

Keep the current trigger rules. Pointer entry advances once for a mouse and records that the pointer is inside; pointer leave re-arms it. Mouse clicks do not cause a second change. Touch activation and keyboard-generated clicks still advance once. Ignore another trigger until the glitch finishes, about 1500 ms. The button stays inside the single heading. Its accessible name is the incoming greeting from the start of the change. Animated layers stay hidden from assistive technology.

### Glitch the exact strings with Framer Motion

Do not add a dependency. Framer Motion can keyframe clip-path slices, horizontal offset, a short skew, and opacity on copies of the real greeting. A glitch-text package was considered and rejected: those packages typically swap in random characters, which would break Japanese, flags, and emoji, and the project already has a motion library.

Run the effect for 1500 ms. Show offset slices of the outgoing and incoming greeting strings, with small horizontal jitter, a short skew, and an opacity flicker, then leave only the incoming greeting. Every painted glyph comes from one of those two strings. Keep the button full width, overflow hidden, and on a stable line height so the name, role, and positioning sentence do not move.

Read `prefers-reduced-motion` at trigger time. When it matches, set the next index immediately and do not mount the glitch. Reduced motion does not mute sound.

### Replace the tick with one glitch burst

Keep a single `greeting` cue. Change its sprite from `[1300, 80]` to a region of about 1500 ms that still starts at 1300 ms, after the error cue. Synthesize one glitch burst: short noise slices, dropouts, and a stepped tone. It is one shot, not a loop, and it ends with the visual glitch.

Decode the current file, keep the PCM through the existing cues, discard the 80 ms tick, append the burst, and re-encode with the same mono MP3 settings used for the current sprite. Do not concatenate MP3 frames with stream copy. Verify the first 1.1 seconds still match the existing cues, the error region still ends at 1140 ms, and the greeting region does not overlap it.

Call `playCue("greeting")` only after a trigger has successfully selected the next greeting. That call stays a no-op while sound is off, and the file is still not requested before opt-in. Leave `interrupt: true` as it is: this longer cue can cut a cue already playing, and a later cue can cut it.

## Risks / Trade-offs

- [Touch browsers synthesize hover before click] → Only pointer-enter for a mouse changes the greeting; touch uses activation.
- [A 1.5 second lock feels slow if the visitor retriggers] → Ignore triggers until the glitch ends, then require a fresh pointer entry.
- [Slice offsets move the name] → Clip the effect inside the greeting button and keep its line height fixed.
- [The glitch cue is much longer than the other cues] → Keep it one shot at the existing player volume, and leave the other regions unchanged.
- [interrupt cuts a cue in progress] → Accept that. Do not add a second player to overlap them.
- [Reduced motion still hears the burst] → The sound toggle remains the only audio control. The visual glitch is what reduced motion skips.
- [Re-encoding shifts the old cues] → Compare the decoded envelope of the first 1.1 seconds before replacing the file.

## Migration Plan

No data migration. To roll back, restore the 220 ms crossfade, restore the greeting sprite to `[1300, 80]`, and restore the previous tick segment.

## Open Questions

None.
