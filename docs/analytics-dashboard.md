# Analytics dashboard

The portfolio records a visit with a write-only beacon in `lib/visitor.ts`. When `NEXT_PUBLIC_ANALYTICS_URL` is set, the page posts one form body after a delay, on hide, or on leave. This repository does not store that body and has no read API.

The checklist row stays open. No dashboard page is served, and no login is added.

## Fields that stay off the page

Public routes must not render these beacon fields, or the raw POST body:

| Field | What it is |
| --- | --- |
| `visitorId` | Device identifier |
| `referrer` | Referring URL |
| `utmSource`, `utmMedium`, `utmCampaign` | Campaign parameters |
| `screen` | Screen size |
| raw body | The whole posted payload |

The existing visit toast may still show the visit count. That count is not the visitor id.

## A later dashboard

A dashboard is allowed only as server-rendered totals from a collector outside this repository. Those totals contain no visitor id, referrer, UTM value, screen size, or raw payload. This site does not add a sign-in route to view them. Until that collector exists, do not check the analytics dashboard row.

## Verification

```sh
node --test tests/analytics-dashboard.test.cjs
```

The check reads `app/` and confirms there is no analytics route and no rendered `visitorId`. It also confirms the beacon still posts to `NEXT_PUBLIC_ANALYTICS_URL`. It does not start the dev server.
