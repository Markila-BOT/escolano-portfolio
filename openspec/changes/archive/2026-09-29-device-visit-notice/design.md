# Design

## Context

See proposal.md for why. The checklist item points at [Gyanendra Pal Singh](https://gyanendra.vercel.app/). The public repository [gyanendracd/Portfolio](https://github.com/gyanendracd/Portfolio) at `62379c2` does not contain a visit tracker or a toast. The live site, whose canonical URL is `https://gyanendra.in`, is a later Next.js app. The behavior below was read from that production build on 29 September 2026, from the layout chunks that register `VisitorTracker`, `getVisitorData`, and `AlertHost`.

This portfolio already toasts contact success and failure with `react-hot-toast`, mounted once in `app/layout.tsx` at the top right. Sound defaults to off, and loading the page must not play a cue. There is no preloader and no second route.

The working tree already has `lib/visitor.ts`, `components/visitor-notice.tsx`, the notice copy in `lib/data.ts`, and the notice mounted in the layout. Apply checks that code against this design. It does not add a second tracker.

## Goals / Non-Goals

**Goals:**

- Match the visitor-visible visit rule and the two toast sentences.
- Send one coarse visit record when this site has its own analytics URL.
- Leave the contact toasts, the sound cues, and the introduction interactions alone.

**Non-Goals:**

- Canvas fingerprinting, font enumeration, GPU unmasking, plugin names, click text, scroll depth, section ids, or an IP and city lookup.
- Sending any record to the reference site's Google Apps Script.
- A custom alert host, a second toast library, or a sound for the visit notice.
- Waiting for a preloader. This page does not have one.

## Reference

`VisitorTracker` runs after the intro is ready and skips chromeless routes. A module flag stops a second run on the same document. It calls `getVisitorData()`, logs the id, fingerprint, and visit number, and, only when the visit is new, waits 300 ms and calls `showAlert`:

- Count greater than 1: title `Welcome back!`, description `Good to see you again — visit #N on this device.`
- Otherwise: title `Hello!`, description `Thanks for stopping by — enjoy the site.`
- Variant and icon are both `info`.

A second effect always starts tracking. The analytics URL is `NEXT_PUBLIC_ANALYTICS_URL`. When it is empty, the page warns that `npm run dev` must be restarted after `.env.local` is set. When it is set, one `application/x-www-form-urlencoded` body is sent with `navigator.sendBeacon`. If the beacon throws or returns false, it falls back to `fetch` with `mode: "no-cors"` and `keepalive: true`. The send runs when the document becomes hidden, on `pagehide`, or 90 seconds after load, and a module flag allows only one send.

The device record uses four local storage keys, `v-id`, `v-first`, `v-count`, and `v-last`, each mirrored to a cookie. The cookie lasts `63072000000` ms (730 days), uses `SameSite=Lax`, and adds `Secure` on `https`. `sessionStorage` key `v-session` stores the visitor id for the tab. A visit is new only when that session key is not already this id and the last visit is missing or at least `1800000` ms (30 minutes) old. The first id is `crypto.randomUUID()`, with a timestamp fallback. The count increments only for a new visit.

The reference payload is much wider than the toast. It hashes the user agent, screen, timezone, a canvas data URL, the unmasked WebGL renderer, and a measured font list. The canvas is 240 by 60 and draws the string `portfolio-fp-😊`. Fonts are detected by measuring a hidden span against a fixed family list. It also reads `WEBGL_debug_renderer_info`, `navigator.plugins`, and device memory and CPU cores. Location and the network provider, including the IP, come from `https://ipwho.is/` and, if that fails, `https://ipapi.co/json/`. It records max scroll percent, section ids that cross a 0.4 intersection threshold, up to 30 click labels, tab-switch count, navigation timing, the user-agent device type, browser, and OS, the connection's effective type, downlink, and round-trip time, Do Not Track, and the `utm_source`, `utm_medium`, and `utm_campaign` query values. `getVisitorFlat()` flattens that object into form fields whose `type` is `visitor`.

The toast itself is a custom `AlertHost`, not `react-hot-toast`. It is a polite live region, centered at the top on small screens and at the bottom from the `lg` breakpoint. It springs in. Its duration is `min(12000, max(3000, 1500 + 55 * text length))` milliseconds. When sound is enabled, an info alert plays a short Web Audio tone at 660 Hz. That tone is not copied here.

## Decisions

1. Keep the visit rule, the 300 ms delay, the two sentences, and the duration formula. The sentences live in `lib/data.ts` as `firstVisitNotice` and `returnVisitNotice`. The component reads them. Alternative: hardcode the sentences in the component. Rejected because portfolio copy belongs in `lib/data.ts`.

2. Store the same keys (`v-id`, `v-first`, `v-count`, `v-last`, `v-session`) and the same 30-minute and 730-day windows. Read local storage first, then the cookie. Write both. Alternative: local storage only. Rejected because the reference keeps the id when one of the two stores is cleared.

3. Cache the visit on the module for the document. A second read in the same page load returns the same `isNewVisit` flag, so a remount does not increment the count again. Alternative: count inside the effect with no cache. Rejected because a remount would double-count.

4. Show the toast with the existing `react-hot-toast` instance. Do not move the toaster and do not add an alert host. The visit toast is one polite status with the title and description. Contact toasts stay on the same toaster. Alternative: port `AlertHost` and its spring. Rejected because this site already has one toaster, and a second notice system would stack with the contact result.

5. Do not play a cue for the visit toast. The reference plays 660 Hz when its sound flag is on. This site's sound spec already says loading the page plays nothing, including when the saved choice is on. The visit notice is part of loading.

6. Send a smaller record to `NEXT_PUBLIC_ANALYTICS_URL` with the same beacon-then-fetch path, once per page load, on hide, `pagehide`, or 90 seconds. Fields: `type`, `localTime`, `visitorId`, `visitCount`, `firstSeen`, `lastSeen`, `isNewVisit`, `landingPage`, `exitPage`, `entryUrl`, `referrer`, `utmSource`, `utmMedium`, `utmCampaign`, `timeOnPage`, `device`, `browser`, `os`, `screen`, `language`, `timezone`. Device type, browser, and OS come from the user-agent checks the reference uses (tablet, mobile, or desktop; Edge, Opera, Chrome, Firefox, Safari, or Unknown; Windows, Android, iOS, macOS, Linux, or Unknown). When the URL is empty, skip the send and do not warn on the console. Alternative: call `ipwho.is` and hash a canvas. Rejected. That is identification beyond the visit count, and the reference endpoint is not this site's.

7. Do not log the visitor id. The reference prints it. A console line is not part of the toast or the record.

## Risks / Trade-offs

- [An empty analytics URL means no off-device record] → The toast and the local count still work. The owner sets `NEXT_PUBLIC_ANALYTICS_URL` to their own endpoint and restarts the dev server so Next.js inlines it. Do not point it at the reference script.
- [A 30-minute return in the same tab does not count] → That matches the reference session key. Closing the tab and returning after 30 minutes does count.
- [`no-cors` hides the response] → The sender cannot tell whether the endpoint accepted the body. One attempt is enough. Do not retry.
- [The contact toaster and the visit toast share one stack] → A visit toast and a contact result can both be visible. They use the same library, so one does not cover the other with a second fixed layer.
- [Checklist line 85 is already checked] → Apply does not add another line and does not recount.

## Migration Plan

No stored visits exist from before these keys. The first load after this change is visit 1 on that device. Rollback is removing `VisitorNotice` from the layout. The keys can stay. They are not read by anything else.

## Open Questions

None. The destination URL is configured outside the repo. An empty value is the specified behavior, not a blocker.
