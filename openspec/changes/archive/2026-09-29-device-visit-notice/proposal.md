# Proposal

## Why

A return visit looks the same as a first one, and nothing records that a device came back. The checklist item asks for the visit behavior from Gyanendra Pal Singh's portfolio: one toast per device visit, and an analytics record of that visit.

## What Changes

- Count a visit on this device. The first visit in a tab, and a return after 30 minutes in a new tab session, each count as one visit. A refresh in the same tab, or another tab inside that 30 minutes, keeps the current count.
- Show one toast for a new visit. The first visit says hello. A later visit says welcome back and includes the visit number on this device. A continuing visit shows no toast.
- Send one analytics record for the page view when a destination URL is configured. The record is the visit, the page, the referrer, and a coarse device description. It does not include a canvas fingerprint, a font list, the GPU, or an IP lookup.
- Keep the existing contact toasts. Do not add a second toast library, and do not play a sound for the visit notice.
- The working tree already contains this behavior. Apply confirms it against the spec. Do not add a second tracker.

## Capabilities

### New Capabilities

- `device-visit`: A per-device visit count, one toast for each new visit, and one analytics record of that visit when a destination is configured.

### Modified Capabilities

- None. Loading the page still must not play a cue, including when the saved sound choice is on. The greeting, role titles, theme, and contact form keep their current requirements.

## Impact

- `lib/visitor.ts` stores the device id and visit count, and builds the analytics record.
- `components/visitor-notice.tsx` shows the toast through the existing `react-hot-toast` toaster and schedules the beacon.
- `lib/data.ts` holds the hello and welcome-back sentences. `app/layout.tsx` mounts the notice beside the toaster.
- The beacon URL is `NEXT_PUBLIC_ANALYTICS_URL`. When it is empty, the toast and the local count still work and no request is sent. The URL is this site's endpoint, not the reference site's script.
- Checklist line 85 is already marked done after a browser check. Apply must not add a second checklist line or recount that item again.
