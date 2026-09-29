# Tasks

## 1. Copy

- [x] 1.1 Replace `audience` and `approach` on `introCallToAction` in `lib/data.ts` with one `positioning` string: "I help product teams take new code all the way to deployment, writing most of it in TypeScript with AI and spec-driven development." Keep `startLabel` as "Contact". Verify those two old fields are gone and `positioning` is that sentence.

## 2. Introduction

- [x] 2.1 In `components/intro.tsx`, render `positioning` in the paragraph under the heading and remove the approach span from the heading. Keep the paragraph's foreground color. Leave the greeting scramble, the role gradient, the nested heading, and the Contact link as they are. Verify the heading shows the greeting, the name, and the role, the positioning sentence is outside the heading whose hover rewrites `innerText`, and the Contact link still goes to `#contact`.

## 3. Checklist and check

- [x] 3.1 Mark the CHECKLIST.MD section 3.1 one-line positioning item done and recount the Progress table. Current spec excludes section 5 and sections 11 and later. A line that contains **partial** stays partial. Verify that item is `[x]`, the call-to-action item stays `[x]`, and the greeting, cycling titles, and interactive hero items stay `[ ]`.
- [ ] 3.2 On the already-running site, confirm one sentence is readable in light and dark without hovering the greeting, it names product teams, shipping new code through deployment with AI and spec-driven development, and that most of that code is TypeScript, and that claim is not repeated in a second sentence. Confirm Contact still shows the contact form. Do not start the dev server, and do not submit the form.
