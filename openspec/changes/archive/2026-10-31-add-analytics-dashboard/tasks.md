# Tasks

## 1. Boundary

- [x] 1.1 Add `docs/analytics-dashboard.md` describing the write-only beacon, the fields that must not be rendered, and the totals-only future collector. Verify the doc states the checklist row stays open and that no login is added.
- [x] 1.2 Add a check that public routes do not include an analytics dashboard page or rendered visitor ids. Verify the check passes against the current `app/` routes and that `lib/visitor.ts` beacon behavior is unchanged.

## 2. Checklist

- [x] 2.1 Leave the analytics dashboard checkbox unchecked and point the row at the doc. Verify `CHECKLIST.MD` still counts the row as open. Do not start the dev server.
