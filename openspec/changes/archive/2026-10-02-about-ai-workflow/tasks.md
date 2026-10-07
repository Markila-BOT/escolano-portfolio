# Tasks

## 1. About copy

- [x] 1.1 Add `aboutWorkflow` in `lib/data.ts` with the paragraph from `design.md`. In `components/about.tsx`, render it as a `p` after the stack paragraph and before the closing paragraph. Remove the sentence "I still pick up new tools, design systems, and ways of working." Leave the heading "About me" and the other paragraphs. Verify with `pnpm exec tsc --noEmit`, and by reading the files: the constant matches the design paragraph, About renders it, and that sentence is gone.

## 2. Check and update the checklist

- [x] 2.1 If something is already listening on port 3000, confirm in both themes: the heading is "About me"; the automotive start, the travel site and the move to the web, and React, Next.js, Node.js, and TypeScript are still readable without hovering; the new paragraph says a normal day starts from a spec, names Claude Code, Codex, and Cursor, says tests check the change, says the engineer still owns the result, and names AI-assisted engineering, test-driven development, and spec-driven development; About does not contain "product teams" or "deployment"; the closing paragraph about time away from coding is still there. Do not start the dev server. If nothing is listening, stop and leave 2.2 unchecked.
- [x] 2.2 After 2.1 passes, check checklist line 91 and set the current-spec row to 66 done, 11 partial, 33 not started, 66/110 (60%). If 2.1 did not run, leave the line and the row as they are. Verify by recounting with section 5 skipped and sections 11 and 12 counted as future.
