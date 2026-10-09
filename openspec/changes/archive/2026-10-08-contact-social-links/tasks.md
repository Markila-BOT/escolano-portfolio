# Tasks

## 1. Contact profile links

- [x] 1.1 Add the confirmed GitHub and LinkedIn profile data beside hiring copy and render one native, always-labeled link per profile between Contact copy and form. Preserve server rendering and existing hiring/email/form paths. Add focused Node rendering tests for exact URLs, names, current-tab behavior and placement, plus production HTML assertions; verify those tests pass and document the implementation in docs/contact-social-links.md.
- [x] 1.2 Apply existing semantic tokens, visible keyboard focus and minimum 44×44px targets in a responsive wrapping row. Verify Tab/Enter behavior, labels, focus visibility and no overflow at 320px and desktop in both themes, and native link availability with page scripts disabled; record browser evidence in docs/contact-social-links.md without submitting forms or logging into external accounts.

## 2. Integration acceptance

- [x] 2.1 Run focused/all existing Node tests, pnpm lint, formatting and production/type/HTML checks using an isolated build if development is running. Verify no extra client state, third-party widget, dependency or floating action bar was introduced and existing Contact CTA/email/form behavior remains intact; record results and limitations in docs/contact-social-links.md.
- [x] 2.2 Mark only the verified Social media links checklist item complete and recalculate progress totals; verify the checklist agrees with the recorded evidence while the persistent action bar and CV items remain unchanged.
