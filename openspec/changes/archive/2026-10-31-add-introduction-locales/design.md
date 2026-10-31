# Design

## Context

`introGreetings` cycles English, Filipino, and Japanese. `app/layout.tsx` sets the document language. Copy for positioning and hiring lives in `lib/data.ts`. The greeting spec must keep working. `add-career-qa` also edits the discovery heading requirement; apply has to merge.

## Goals / Non-Goals

**Goals:**

- `en`, `fil`, and `ja` for positioning, hiring sentence, nav labels, and section headings.
- English first paint and no-JavaScript HTML.
- Saved choice after hydration.

**Non-Goals:**

- Translating projects, experience, about body, tools, or the contact form.
- A new i18n library, or using the greeting as the switch.

## Decisions

### Catalog beside the English source

Add `lib/locale-copy.ts` with the English strings imported from the existing constants and `fil` / `ja` fields only where a translation is written in that file. Missing fields fall back to English. Do not duplicate the English source into a second wording.

### First paint

The server render always emits English and `lang="en"`. A client component reads local storage after mount and then swaps the chrome strings and `document.documentElement.lang`. Do not block render on that read. Do not put the locale in the root server component in a way that hydrates mismatched text; the swap happens after paint, so the English text must be the hydration text. Accept the post-hydration update for a returning visitor rather than risk a mismatch.

### Control

A small control in the header, three buttons, `aria-pressed` for the active locale. Labels: English, Filipino, 日本語. It does not call the greeting's advance handler.

### Translations

Write Filipino and Japanese strings during apply that preserve every claim in the English sentences. If a sentence cannot be translated without adding a claim, leave that field off and keep English. Do not machine-publish unreviewed copy into the spec; the file is the review surface.

## Risks / Trade-offs

- A returning visitor sees English, then the saved locale. That is the cost of a correct hydration match.
- Heading text changes can break tests that look for "About" in English. Those tests should read the active locale or stay on the default English document.
- Merge conflict with `add-career-qa` on `portfolio-discovery`. Keep Questions in the heading list if that section exists.
