# Design

## Context

`docs/technology-convention.md` already forbids a CMS, database, or content-fetch client for portfolio copy. The checklist still has an open CMS row under future enhancements. `add-writing` may add committed Markdown; that stays inside the repository.

## Goals / Non-Goals

**Goals:**

- A spec that matches the convention.
- A checklist mark of user-accepted closed that does not claim a CMS exists.

**Non-Goals:**

- Installing a CMS, building an admin UI, or moving `lib/data.ts` into a database.

## Decisions

### Spec is the change

No runtime code. On apply, set the CMS checkbox to user-accepted closed with the date and a one-line pointer to the convention and this spec. Recalculate the future-enhancements progress counts in `CHECKLIST.MD`.

### Writing exception

The spec allows committed Markdown. Do not describe that as a CMS. Do not block `add-writing`.

## Risks / Trade-offs

- Closing the row can be read as "CMS shipped". The checklist status key already says user-accepted closed is a backlog decision. Use that phrase in the note.
