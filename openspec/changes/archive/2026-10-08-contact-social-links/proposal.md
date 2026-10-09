# Proposal

## Why

Contact currently offers email and a form but no professional profile links. Adding the user's confirmed GitHub and LinkedIn profiles gives hiring visitors direct access to public code and professional background without extra interface clutter.

## What Changes

- Add visibly labeled GitHub and LinkedIn links in Contact, between the contact copy and form.
- Use the confirmed destinations: `https://github.com/Markila-BOT` and `https://www.linkedin.com/in/mark-escolano-2715ab129/`.
- Keep links server-rendered, keyboard accessible, responsive and readable in both themes without JavaScript or hover.
- Preserve the email, hiring preferences, form and introduction's single Contact CTA.
- Update the social-links checklist item only after verification. No floating action bar, CV work, social embeds or new dependencies.

## Capabilities

### New Capabilities

- `professional-social-links`: Public professional profile destinations and accessible link presentation in Contact.

### Modified Capabilities

None. Existing hiring/contact and introduction CTA contracts remain unchanged.

## Impact

Targets static content in `lib/data.ts`, presentation in the server component `components/contact.tsx`, focused rendering/production HTML tests, verification documentation and `CHECKLIST.MD`. Uses the existing styling and icon dependencies if icons are included; no API, credential, account integration or tracking changes.
