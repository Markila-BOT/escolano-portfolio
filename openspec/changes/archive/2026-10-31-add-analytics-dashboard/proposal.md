# Proposal

## Why

The checklist lists an analytics dashboard. What exists is a write-only beacon in `lib/visitor.ts`: after a delay it posts a payload that includes a visitor id, referrer, and UTM fields to `NEXT_PUBLIC_ANALYTICS_URL`. This repo has no store and no read API. A public dashboard of that payload would expose device-level visit data, and protected routes are not part of this site.

## What Changes

- Do not add a dashboard page, a login, or a database.
- Keep the current beacon behavior.
- Forbid any public route from rendering visitor ids, referrers, UTM values, or raw beacon bodies.
- Record the only future dashboard this repo will accept: server-side totals with no identifiers, from a collector this repository does not contain. Until that collector exists, the checklist row stays open.

## Capabilities

### New Capabilities

- `analytics-dashboard`: The boundary that keeps visit records off the public site and states when a totals-only dashboard would be allowed.

### Modified Capabilities

None. `device-visit` remains the beacon and toast contract.

## Impact

A short doc under `docs/` and tests or HTML checks that the public routes do not contain beacon field names as displayed data. No new environment variable is required for the current site to keep working. Applying this change does not check the checklist box.
