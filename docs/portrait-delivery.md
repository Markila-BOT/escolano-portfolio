# Portrait delivery evidence

Candidate measurements and verification: [portrait-delivery-comparison.md](portrait-delivery-comparison.md).

## Baseline

Raw reports: `performance/portrait-baseline/`. Build/source hashes and timestamp are in `identity.txt`. Six sequential cold Lighthouse 13.5.0 runs on Chrome 154.0.0.0, production port 3100. Settings match `portfolio-performance.md`: mobile 412×823 DPR 1.75 / CPU 4 / RTT 150ms / throughput 1638.4Kbps; desktop 1350×940 DPR 1 / CPU 1 / RTT 40ms / throughput 10240Kbps.

Browser baseline box measured 160×160px (149px content inside border), no sizes hint, currentSrc w=640/q=95. Native browser DPR was unavailable through the read-only browser interface; audit DPR is recorded above. The pasted 240px figure is not the current CSS box.

### mobile

Capture times: 2026-10-08T07:19:12.436Z, 2026-10-08T07:19:24.327Z, 2026-10-08T07:19:35.018Z

| Metric | Runs 1, 2, 3 | Median | Range |
| --- | --- | --- | --- |
| first-contentful-paint | 1212.5745, 1206.2097, 1206.0788 | 1206.2097 | 1206.0788–1212.5745 |
| largest-contentful-paint | 4416.867125, 4812.4194, 4812.1576000000005 | 4812.1576000000005 | 4416.867125–4812.4194 |
| cumulative-layout-shift | 0, 0, 0 | 0 | 0–0 |

Portrait: {"url":"http://127.0.0.1:3100/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fprofile.17779dd2.png&w=640&q=95","encodedBytes":68098,"transferBytes":68516,"estimatedWaste":56642}

Portrait: {"url":"http://127.0.0.1:3100/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fprofile.17779dd2.png&w=640&q=95","encodedBytes":68098,"transferBytes":68516,"estimatedWaste":56642}

Portrait: {"url":"http://127.0.0.1:3100/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fprofile.17779dd2.png&w=640&q=95","encodedBytes":68098,"transferBytes":68516,"estimatedWaste":56642}

### desktop

Capture times: 2026-10-08T07:19:45.648Z, 2026-10-08T07:19:56.392Z, 2026-10-08T07:20:07.044Z

| Metric | Runs 1, 2, 3 | Median | Range |
| --- | --- | --- | --- |
| first-contentful-paint | 325.7772, 325.6019, 326.6256 | 325.7772 | 325.6019–326.6256 |
| largest-contentful-paint | 914.443, 914.0047500000001, 916.5640000000001 | 914.443 | 914.0047500000001–916.5640000000001 |
| cumulative-layout-shift | 0, 0, 0 | 0 | 0–0 |

Portrait: {"url":"http://127.0.0.1:3100/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fprofile.17779dd2.png&w=256&q=95","encodedBytes":17916,"transferBytes":18334,"estimatedWaste":6993}

Portrait: {"url":"http://127.0.0.1:3100/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fprofile.17779dd2.png&w=256&q=95","encodedBytes":17916,"transferBytes":18334,"estimatedWaste":6993}

Portrait: {"url":"http://127.0.0.1:3100/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fprofile.17779dd2.png&w=256&q=95","encodedBytes":17916,"transferBytes":18334,"estimatedWaste":6993}
