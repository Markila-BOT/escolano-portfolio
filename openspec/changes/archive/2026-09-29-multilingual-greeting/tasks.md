# Tasks

## 1. Greeting copy

- [x] 1.1 Add the three greetings to `lib/data.ts` as a named constant, in this order: "Welcome!🇬🇧🇺🇸 👋", "Mabuhay!🇵🇭 👋", "ようこそ🇯🇵 🙇". Verify `components/intro.tsx` reads that constant and no longer declares its own greeting list.

## 2. Accessible greeting baseline

- [x] 2.1 In `components/intro.tsx`, remove the nested `h1` and the handler that writes `innerText`. Render one `Button` inside the remaining heading, before "I'm Mark Escolano,", on its own line, with heading size and color and without the `pill` or `chrome` variant. Keep its visible transition hidden from assistive technology and expose the settled or incoming greeting as its accessible name. Verify there is one `h1`, and the button does not rewrite the name, the role, or the positioning sentence.
- [x] 2.2 When `prefers-reduced-motion: reduce` matches at activation time, show the next greeting immediately and do not start a scramble. Verify a reduced-motion activation changes the greeting with no interval, and a normal activation still settles on the full next greeting. Run `pnpm exec tsc --noEmit` and confirm it exits 0.

## 3. Checklist and check

- [x] 3.1 Mark the CHECKLIST.MD section 3.1 greeting item done and recount the Progress table. Current spec excludes section 5 and sections 11 and later. A line that contains **partial** stays partial. Verify that item is `[x]`, and the cycling titles and interactive hero items stay `[ ]`.
- [x] 3.2 On the already-running site, confirm the first greeting is "Welcome!🇬🇧🇺🇸 👋" in light and dark without interaction. Activate it and confirm it settles on "Mabuhay!🇵🇭 👋", then "ようこそ🇯🇵 🙇" with the Japanese, flag, and bow intact, then back to "Welcome!🇬🇧🇺🇸 👋". Confirm keyboard focus is visible and Enter or Space advances once. Confirm the name, the role, and the positioning sentence stay put, and Contact still shows the form. Do not start the dev server, and do not submit the form.

## 4. Glitch hover and cue revision

- [x] 4.1 Replace the 220 ms crossfade in `components/intro.tsx` with a Framer Motion glitch of the exact greeting strings lasting about 1500 ms: horizontal slice offsets, a short skew, and an opacity flicker. Do not add a dependency, and do not replace characters with random letters. A mouse pointer entry advances once, pointer leave re-arms it, and mouse click does not advance it a second time. Touch and keyboard activation still advance once. Ignore new triggers until the glitch ends. Preserve one heading and the visible focus ring, keep neighboring hero text stable, and swap immediately under reduced motion. Run `pnpm exec tsc --noEmit` and confirm it exits 0.
- [x] 4.2 Replace the 80 ms greeting tick in `public/sounds/interactions.mp3` with one glitch burst of about 1500 ms, starting at 1300 ms so it does not overlap the error cue that ends at 1140 ms. Update the `greeting` sprite to that region. Decode, edit PCM, and re-encode; do not concatenate MP3 frames with stream copy. In the greeting control, call `playCue("greeting")` once only after a trigger successfully selects the next greeting. Verify no second player or audio file is added, no audio is requested before opt-in, loading never plays the cue, sound off stays silent, remaining over the greeting does not repeat it, and the navigate, theme, open, close, success, and error regions still match their previous timing.
- [x] 4.3 On the already-running site, verify one mouse entry glitches for about 1.5 seconds and settles on each greeting in order, remaining hovered does not advance or replay the cue, leaving and re-entering advances once, and mouse click does not double-advance. Verify touch-equivalent activation plus Enter or Space, a visible keyboard focus ring, exact Japanese/flag/emoji text with no random letters, an immediate reduced-motion swap, one heading, stable neighboring hero text, light and dark readability, one gated glitch cue of about 1.5 seconds while sound is on, silence while sound is off, and Contact still shows the form. Do not start the dev server, and do not submit the form.
