# Design

## Context

Hiring availability, the about workflow, and the intro positioning sentence already exist in `lib/data.ts`. The homepage heading list is specified in `portfolio-discovery` and does not include Questions yet. Native `details`/`summary` needs no Radix accordion.

## Goals / Non-Goals

**Goals:**

- Three disclosures before Contact.
- Answers are those three sources, not new claims.
- An h2 titled Questions.

**Non-Goals:**

- A chat model, a form, or generated answers.

## Decisions

### Section

Add `components/questions.tsx` as a server component. Render it in `app/page.tsx` after Experience and before Contact. Heading uses the existing section heading component.

### Sources

Questions and the short lead-in live in `lib/data.ts`. The answer body is the existing constant, rendered again, not retyped:

- availability: `hiringContact.availability`
- workflow: `aboutWorkflow`
- positioning: `introCallToAction.positioning`

Use `<details>` so they work without JavaScript. Do not set `open` on all of them by default; the questions themselves are visible as summaries. All three can be open together because native details do not form an exclusive group.

### Discovery

Update the HTML assertion that lists h2 text so Questions is included in order. Do not add a sitemap URL.

## Risks / Trade-offs

- Repeating the about paragraph makes the page longer. The summary is a question, and the answer is the existing sentence, so the duplication is the point of the section.
- `add-introduction-locales` may translate headings later. This section's h2 should read from the same heading catalog when that change exists; until then the English string "Questions" is the heading.
