# Proposal

## Why

The checklist asks for a career Q&A grounded in the existing write-ups. Hiring preferences, the about workflow, and the introduction already answer the questions a recruiter asks, but they are spread across the page. There is no single set of questions.

## What Changes

- Add a Questions section before Contact, with three native disclosures.
- Answers may only restate `hiringContact.availability`, `aboutWorkflow`, and `introCallToAction.positioning`. Do not add employers, metrics, or a chatbot.
- Each question is visible without JavaScript. Opening one does not lock the others closed.
- Give the section an h2, "Questions", and include it in the homepage heading list.

## Capabilities

### New Capabilities

- `career-qa`: Three disclosures whose answers are limited to existing portfolio sentences.

### Modified Capabilities

- `portfolio-discovery`: The homepage heading list includes Questions, in document order, with the existing single h1. Apply must keep a locale `lang` rule from `add-introduction-locales` if that change has already landed.

## Impact

A new section component, `app/page.tsx`, and the discovery heading assertion. No model API, no account, no new dependency. Contact and the intro CTA stay the hiring start path.
