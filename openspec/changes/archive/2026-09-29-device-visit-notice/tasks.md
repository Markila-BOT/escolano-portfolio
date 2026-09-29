# Tasks

## 1. Visit identity

- [x] 1.1 Confirm `lib/visitor.ts` keeps `v-id`, `v-first`, `v-count`, `v-last`, and `v-session`, mirrors the first four to a 730-day cookie, and treats a visit as new only when the tab session is new and the last visit is missing or at least 30 minutes old. Verify on the already-running site: a first load stores count 1, a reload in that tab keeps 1, a second tab within 30 minutes keeps 1, and a new tab session whose last visit is at least 31 minutes old stores 2. Verify a storage failure does not throw into the page. Do not add a second tracker. Do not start the dev server.

## 2. Visit toast

- [x] 2.1 Confirm `VisitorNotice` is mounted once beside the existing toaster, reads `firstVisitNotice` and `returnVisitNotice` from `lib/data.ts`, waits 300 ms, and uses the duration formula from design.md. Verify the first visit shows "Hello!" and "Thanks for stopping by — enjoy the site.", the visit in task 1.1 that reaches count 2 shows "Welcome back!" and "Good to see you again — visit #2 on this device.", a continuing visit shows no visit toast, and no audio starts while the toast is visible. Verify the contact section still renders and is not submitted. Do not add a toast library and do not play a cue.

## 3. Analytics record

- [x] 3.1 Confirm one record is sent only when `NEXT_PUBLIC_ANALYTICS_URL` is set, using `sendBeacon` and a `no-cors` fetch fallback, on hide, `pagehide`, or 90 seconds, and only once. Verify the fields match the list in design.md and that the record has no canvas fingerprint, font list, GPU name, IP address, or click log. With the URL empty, verify the page does not request `ipwho.is`, `ipapi.co`, or `script.google.com`. Do not point the URL at the reference site's script.

## 4. Checklist

- [x] 4.1 Confirm checklist line 85 is already `[x]` and the progress table is 63 done, 11 partial, 35 not started, 63/109 (58%). Do not add a second line. If 1.1, 2.1, or 3.1 fails, leave this task open and uncheck line 85 before recounting. Do not recount when those numbers are already current.
