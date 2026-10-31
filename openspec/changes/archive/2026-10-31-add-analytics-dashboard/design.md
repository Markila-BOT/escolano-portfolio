# Design

## Context

`lib/visitor.ts` posts a form body that includes `visitorId`, referrer, and UTM fields to `NEXT_PUBLIC_ANALYTICS_URL`. There is no read path and no database. Protected routes are out of scope for this portfolio. `device-visit` already specifies the beacon and the toast.

## Goals / Non-Goals

**Goals:**

- No public rendering of those fields.
- A written rule for a future totals-only dashboard.
- The checklist row stays open.

**Non-Goals:**

- A dashboard page, auth, a new analytics vendor, or a change to the beacon payload.

## Decisions

### Document the boundary

Add `docs/analytics-dashboard.md`. Describe the beacon as write-only, list the fields that must not be rendered, and state that a dashboard waits on an external aggregate that returns counts only. Link it from the checklist note when the row is touched. Do not check the row.

### Guard test

Add a source or HTML assertion that `app/` pages do not include a route named analytics and that rendered copy does not print `visitorId`. Do not snapshot the beacon module's field names as if they were UI.

## Risks / Trade-offs

- This change does not deliver a dashboard. It stops a public one from being treated as the completion of the checklist item.
- A collector could be added later without rewriting `device-visit` if it only consumes the existing POST.
