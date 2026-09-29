# Proposal

## Why

The introduction still changes language on hover, but the 220 ms crossfade and the soft tick are too gentle for the interactive moment. The change should feel like a glitch, last about 1.5 seconds, and use a matching glitch cue for visitors who have opted into sound.

## What Changes

- The three greetings stay: "Welcome!🇬🇧🇺🇸 👋", "Mabuhay!🇵🇭 👋", and "ようこそ🇯🇵 🙇". On load, the first is readable without interaction.
- One pointer entry advances to the next greeting in that order, wraps after the last, and settles there. The visitor must leave before another hover can advance it. Touch and keyboard activation provide the same one-step change.
- The short crossfade becomes a glitch of the real greeting text that lasts about 1.5 seconds. The glitch distorts presentation of those strings. It does not invent random letters, so flags, emoji, and Japanese stay intact.
- When the visitor prefers reduced motion, the next greeting appears at once, without the glitch.
- A glitch burst of about 1.5 seconds plays once when the greeting changes, but only while the existing interaction-sound choice is on. It does not play on load or repeat while the pointer remains over the greeting.
- The page keeps one heading. The greeting is not a second heading, and the moment does not rewrite the name, the role, or the positioning sentence.
- Cycling role titles, an interactive hero, Pretext typography, more languages, an automatic loop, and a new library stay out of this change.

## Capabilities

### New Capabilities

- `multilingual-greeting`: The introduction greeting advances once per hover or activation through the three existing greetings, using a glitch of about 1.5 seconds that settles on the next greeting.

### Modified Capabilities

- `interaction-sound`: A successful greeting change gains one glitch burst of about 1.5 seconds while interaction sound is on.

## Impact

- `components/intro.tsx` replaces the crossfade with the glitch while retaining one accessible heading and control.
- `lib/interaction-sprite.ts` and `public/sounds/interactions.mp3` replace the short greeting tick with the longer glitch burst. `context/sound-context.tsx` keeps the existing `playCue` path.
- No new dependency or route. The positioning sentence and the Contact link stay as they are.
