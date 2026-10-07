# Tasks

## 1. Case study data

- [x] 1.1 Add `projectCaseStudy` labels (`problem`, `role`, `outcome`) in `lib/data.ts` and verify the three values are Problem, Role, and Outcome
- [x] 1.2 Add `caseStudy` with the spec's restatements on MatterWorx, Potato V3, Owner Web App, Workflow, Chat-Admin, House Elf, MerchantSpring, Rakuten Travel, Iris, and ADT(Alliance Diagnostic Tool), leave `description` in place, and verify each sentence only restates that project's current description
- [x] 1.3 Leave Valuation, LookingGlass, Lagoon, WebOTX, ECUs Non-Toyota-Diesel, and Lawson Smart Report without `caseStudy`, and verify those six objects have no `caseStudy` field

## 2. Open details

- [x] 2.1 Add `components/project-case-study.tsx` that renders Problem, Role, and Outcome as `h4` headings in that order, each body through the existing paragraph reveal, and verify the three headings appear in that order
- [x] 2.2 In the drawer description card, render the case study when `"caseStudy" in project` and the description paragraphs otherwise, and verify MatterWorx shows the three headings without the description paragraphs while Valuation still shows its paragraphs and no such headings

## 3. Integration

- [x] 3.1 Verify a carousel card for a featured project does not show Problem, Role, or Outcome before it is opened
- [x] 3.2 Verify Next from Valuation opens Owner Web App with Problem, Role, and Outcome, and Next from House Elf opens LookingGlass with description paragraphs and without those headings
- [x] 3.3 Check the featured-work case-study item in `CHECKLIST.MD` and verify the progress row is recounted with section 5 skipped and sections 11 and 12 counted as future
