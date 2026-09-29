# Tasks

## 1. Title data and loop component

- [x] 1.1 Add `introRoleTitles` beside the other introduction content in `lib/data.ts` as a readonly tuple in this exact order: "Senior Software Engineer", "Full Stack Engineer", "Lead Software Engineer", and "Front-End Engineer". Verify every string exactly matches an existing `experiencesData` title and no experience entry is changed.
- [x] 1.2 Add a focused client-side role-title loop component using the installed `framer-motion` package, not `motion` or another dependency. Implement a four-second index interval, modulo wraparound, `AnimatePresence` with one keyed visible title, 20 px vertical enter/exit travel, opacity, a 0.35-second transition, and no initial animation. Reserve the widest title in normal flow, keep animated copies out of the accessibility tree, expose one stable non-live description containing all four titles, and render only the first title when reduced motion is preferred. Pause while its `isPaused` input is true or `document.visibilityState` is hidden; on resume, preserve the current title and wait a complete interval. Run `pnpm exec tsc --noEmit` and confirm it exits 0.

## 2. Introduction integration

- [x] 2.1 Replace the static role in `components/intro.tsx` with the title-loop component while retaining the existing gradient treatment, one `h1`, "I'm Mark Escolano, a", the positioning sentence, and the Contact link. Pass the greeting's existing `isGlitching` state to pause the title loop. Verify the greeting still cycles independently, hovering or activating it does not advance or restart the current title, and no title change calls `playCue`.
- [x] 2.2 Verify the title region reserves stable dimensions for all four titles at 390 px and desktop widths, including wrapped text, without moving the greeting, name, positioning sentence, or Contact link. Verify the animated copies are `aria-hidden`, the stable role description is not an `aria-live` region, keyboard navigation is unchanged, and `pnpm exec tsc --noEmit` still exits 0.

## 3. Browser verification and checklist

- [x] 3.1 On the already-running site, confirm "Senior Software Engineer" is visible first, each title stays settled for about four seconds, the transition moves upward and fades for about 0.35 seconds, all four titles appear in order and wrap to the first, and the title region does not shift neighboring introduction content at mobile and desktop widths. Confirm the loop pauses in a hidden tab, resumes from the same title after a complete interval, pauses through the 1.5-second greeting glitch, adds no sound cue, and keeps Contact working without submitting the form. Under reduced motion, confirm only "Senior Software Engineer" remains static. Do not start the dev server.
- [x] 3.2 Mark only the CHECKLIST.MD section 3.1 cycling-role-titles item done after task 3.1 passes, then recount the Progress table. Current spec excludes section 5 and sections 11 and later; a line containing **partial** remains partial even if checked. Verify the cycling-title item is `[x]`, the interactive-hero item remains `[ ]`, and the table matches the recounted totals.
