# Proposal

## Why

About still tells the automotive and web story, then stops at React, Next.js, Node.js, and TypeScript. A visitor cannot tell that the current work is AI-assisted, test-driven, and spec-driven, or how AI fits a normal day. [Bryan Elliott](https://elliottprogrammer.com) states that fit in the daily workflow. The introduction already has one sentence for product teams, deployment, TypeScript, AI, and spec-driven development, and that sentence stays there.

## What Changes

- Rewrite the About copy so the existing career story remains, and the current way of working is readable: AI-assisted engineering, test-driven development, and spec-driven development.
- Say how AI fits a normal day: work from a spec, write the change, and check it with tests, with the engineer still responsible for the result. Name Claude Code, Codex, and Cursor as the tools used for that work.
- Keep the section heading "About me". Do not add a new section, and do not change the introduction's positioning sentence.
- Check checklist line 91 after the copy is verified in the browser, and recount. Until then the line stays open.

## Capabilities

### New Capabilities

- `about-workflow`: The About section keeps the career story and states the current daily workflow: AI-assisted engineering, test-driven development, and spec-driven development.

### Modified Capabilities

- None. `intro-call-to-action` still owns the one introduction sentence. This change does not repeat that sentence and does not edit that spec.

## Impact

- About copy moves from hardcoded paragraphs in `components/about.tsx` into `lib/data.ts`, which is where portfolio copy already lives. The component renders that copy.
- No new package. The introduction, skills, and experience sections stay as they are.
- Checking line 91 moves the progress row from 65 done, 11 partial, 34 not started, 65/110 (59%) to 66 done, 11 partial, 33 not started, 66/110 (60%).
