# Design

## Context

See proposal.md for motivation. Contact is a server component composing hiring copy from `lib/data.ts`, a native email anchor and the existing client ContactForm. No social links appear in that component or Footer. The user supplied LinkedIn and confirmed Markila-BOT as the GitHub profile; account availability/ownership has not been independently audited. Existing introduction/hiring requirements remain unchanged. Tests use Node's built-in test runner with TypeScript transpilation and `tests/portfolio-html.py` checks real production HTML.

## Goals / Non-Goals

**Goals:** Keep profile content centralized, render native accessible links without client state, and prevent redundant chrome.

**Non-Goals:** Floating action bar, footer/hero duplication, CV download changes, tracking, profile scraping, third-party embeds, social login, dependency additions or deployment. Browser account restrictions at the destination are not portfolio failures.

## Decisions

1. Add a small typed readonly professional-profile data list in `lib/data.ts` beside hiring contact copy. Render it in Contact between the existing contact paragraph and form. Do not hardcode separate copies of the destinations across components. This keeps future URL updates in the existing content source rather than inventing a CMS or configuration service.
2. Use ordinary anchors with always-visible GitHub/LinkedIn labels, semantic list markup, token colors, clear focus styling and at least 44px targets. A simple centered wrapping row fits the existing 38rem Contact width. Text links are sufficient; optional existing react-icons glyphs remain decorative. No new reusable control or Radix primitive is necessary for native navigation.
3. Choose current-tab navigation as the simplest accessible default; visitors retain native modifier/middle-click options. Avoid forced new tabs and hover-only explanations. No third-party code, extra network calls or client event handler is required.
4. Extend the existing real-HTML regression check for exact destinations/labels and Contact placement; add a focused Node rendering test for native link contracts. Verify keyboard focus and responsive appearance in the running app at 320px and desktop in both themes, plus page-script-disabled rendering. Do not submit the contact form or attempt external account login as part of QA.

## Risks / Trade-offs

- A URL changes or the platform restricts access → use the user-confirmed URLs exactly and document destination restrictions separately; do not substitute guessed accounts.
- New links compete with the contact CTA → keep them a compact secondary row in Contact only, not a persistent action bar.
- Visual affordance disappears in a theme or narrow viewport → use existing tokens, visible text and focus rings; test wrapping and target size at 320px.

## Migration Plan

No data/API migration. Validate locally, using an isolated production snapshot if a dev server is running rather than overwriting its `.next`. Update only the verified social-links checklist item and progress totals. Rollback removes the profile list and Contact row together; existing email/form behavior stays unchanged.
