# Performance monitor

Repeat the accepted lab budgets against a production build. The command is `pnpm performance:monitor`. It runs `pnpm build`, then `pnpm start` on `127.0.0.1:3100`, then `scripts/audit-performance.sh`. It does not start `pnpm dev`.

Lighthouse stays the pinned `pnpm dlx lighthouse@13.5.0` invocation in `scripts/audit-performance.sh`. It is not a `package.json` dependency. Profiles stay the mobile and desktop settings recorded in `docs/portfolio-performance.md`: three runs each.

Raw JSON goes to `.performance-reports/<timestamp>/`, which is gitignored. `summary.json` in that directory names FCP, LCP, CLS, and TTI for both profiles. Compare those runs with the accepted medians in `scripts/evaluate-performance-monitor.cjs`.

Fail only when all three runs agree. A previously passing budget fails when every run misses it. FCP, LCP, and TTI also fail when every run is more than 100ms worse than the accepted median. CLS fails when every run is more than 0.01 worse. Mobile LCP above 2.5s and at or below 3.50s is `known-miss` and does not fail the command. Mobile LCP above 3.50s on all three runs fails. The command does not edit `CHECKLIST.MD`.

To judge an existing report directory without building:

```sh
node scripts/evaluate-performance-monitor.cjs <report-directory>
```
