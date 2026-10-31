# Tasks

## 1. Bar

- [x] 1.1 Add the persistent CV, GitHub, and LinkedIn links using `professionalSocialLinks` and `https://escolano-cv.vercel.app/`. Verify a render test checks the three hrefs, visible labels, and that Contact still renders its own profile links and CV button.
- [x] 1.2 Show each label on hover and keyboard focus, with a 44px target and a visible focus style in both themes. Verify the test or CSS assertion covers focus-visible labels and that icons are `aria-hidden`.

## 2. Placement

- [x] 2.1 Place the bar so a 320px viewport does not cover the theme switch, sound switch, header, or main content, and so the open mobile menu does not leave the bar as a competing control. Verify at 320px and desktop in both themes without starting the dev server if one is not required; use the production build only if a server is already the project's existing verification path.
- [x] 2.2 Run `pnpm lint` and `pnpm exec tsc --noEmit`. Verify both pass and no PDF was added.
