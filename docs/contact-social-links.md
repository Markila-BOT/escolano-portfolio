# Contact social links

## Implementation

The Contact server component renders the confirmed GitHub and LinkedIn profiles from a readonly list beside hiring copy in `lib/data.ts`. Each native, always-labeled anchor appears after the email paragraph and before the existing form. Navigation uses the current tab by default; browser modifier-key behavior remains native.

The wrapping row uses existing semantic theme tokens, underlined labels, 44px minimum target dimensions and a visible focus ring. No dependency, client state, widget, floating action bar, extra form or API change was added. Hiring preferences, email, form and the single Intro Contact CTA remain intact.

## Automated verification — 2026-10-08

- Focused server-rendering test passes: exact destinations, single visible labels, current-tab behavior, placement, target classes and preserved hiring/email copy.
- All 29 Node tests pass; `pnpm lint` passes without warnings.
- Isolated production build passes compilation, lint and TypeScript validation. Production HTML assertions pass, including profile placement and preserved Contact fields/CTA.
- Existing build advisories remain: optional Sharp and outdated Browserslist data. No dependency changes were made for these unrelated advisories.
- The production snapshot avoids modifying the running development server's `.next` directory and contains no copied environment secrets.

## Browser verification

- Verified at 1280px desktop and 320px mobile in light and dark themes: no horizontal overflow, visible labels, and targets measuring 74×44px (GitHub) and 86×44px (LinkedIn).
- Tab moves email → GitHub → LinkedIn; Shift+Tab returns to GitHub. Both themes show `:focus-visible` and their semantic focus-ring colors.
- Enter opens each confirmed destination in the same tab. LinkedIn normalizes its trailing slash; no external account login or form submission occurred. Destination navigation is verified, not independent account ownership or unrestricted profile access.
- A separate local fixture served unchanged production HTML/CSS with `Content-Security-Policy: script-src 'none'`. Both profile labels/URLs remained available; native Tab focus and GitHub Enter navigation worked without page scripts. This checks profile links, not the JavaScript-dependent form or unrelated interactive controls.
- Saved evidence: [desktop](contact-social-links-desktop.png), [320px mobile](contact-social-links-mobile.png). Browser viewport overrides were reset and temporary tabs closed.

## Checklist acceptance

Only Social media links is completed for this change. Recounting every checkbox before Future enhancements corrects the previously stale summary: 103 done, 8 partial and 19 not started, or 103/130 (79%). Persistent action bar and partial CV remain unchanged. Unchecked rows containing `**partial**` count as partial; rows without checkboxes remain excluded.
