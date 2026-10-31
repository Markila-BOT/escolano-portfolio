# Proposal

## Why

The owner closed this change on 2026-10-31. Introduction locales are not needed. The greeting still cycles English, Filipino, and Japanese. Page copy and `lang` stay English. A locale control would invent translations the owner has not written.

## What Changes

- Do not add a locale control, a translation catalog, or a saved locale.
- Do not change `lang`. It stays `en` on the server-rendered page.
- Leave the greeting cycle and the role loop on their current specs.
- Mark the multi-language checklist row user-accepted closed. That is a backlog decision, not a translation.

## Capabilities

### New Capabilities

- `introduction-locales`: Locale selection for the introduction and section chrome, with English as the no-JavaScript document.

### Modified Capabilities

- `portfolio-discovery`: The document language is `en` by default and becomes `fil` or `ja` only after that locale is selected. The heading list stays About, Projects, Skills, Experience, and Contact unless `add-career-qa` has already added Questions; apply must merge, not drop, that heading.
- `intro-call-to-action`: The English positioning sentence and hiring sentence remain the default and the no-JavaScript text. A selected locale may show a same-claim translation of those two sentences.

## Impact

`lib/data.ts` or a sibling catalog, `app/layout.tsx` `lang`, header labels, and intro copy. No `next-intl` or other i18n package. `multilingual-greeting` and `role-title-loop` behavior stay put. This change conflicts on the discovery heading requirement with `add-career-qa`; whichever applies second re-reads the spec and keeps both the locale rule and the Questions heading.
