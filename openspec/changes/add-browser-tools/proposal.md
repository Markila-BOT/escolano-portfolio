# Proposal

## Why

Visitors currently have no browser utilities to use directly on the portfolio. A small Tools page offers immediate practical value without waiting for blog integration or requiring accounts and backend services.

## What Changes

- Introduce `/tools` on this portfolio with three utilities: JSON formatter, word/character counter, and URL component encoder/decoder.
- Process utility input locally in memory, with explicit copy/reset actions, accessible validation, and responsive light/dark presentation.
- Make Tools discoverable through the homepage introduction shortcut owned by `add-intro-tools-shortcut`, remove the shared footer Tools link, and provide working homepage-section links from the new route.
- Add route-specific search/share metadata and include the real Tools page in the sitemap.
- Replace the checklist's deferred Tools note with separately tracked implementation status only after verification; blog integration and interactive project demos remain separate and incomplete.
- Scope assumption: the user's approval refers to the proposed `/tools` route and the three suggested utilities, not a separate blog deployment.

## Capabilities

### New Capabilities

- `browser-tools`: Public utility directory and local text transformations, including bounded inputs, accessible errors, and clipboard feedback.

### Modified Capabilities

- `portfolio-discovery`: Extend the homepage-only sitemap contract to include `/tools`, and require route-specific canonical and share identity for Tools.

## Impact

New `app/tools/page.tsx`, focused client components, and pure TypeScript utility functions; targeted integration with shared header/mobile navigation, footer, metadata, and sitemap. Existing Node tests and browser checks gain coverage. No new dependencies, network transformation APIs, persistent input storage, or changes to the contact action are planned. The referenced live Tools page could not be fetched during planning; the checklist description informs the concept, not an assumed visual or functional clone.
