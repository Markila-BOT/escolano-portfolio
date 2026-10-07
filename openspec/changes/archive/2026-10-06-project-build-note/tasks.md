# Tasks

## 1. Data

- [x] 1.1 Add a `projectBuildNote` label map whose label is Build, and verify the visible word comes from that map
- [x] 1.2 Add `buildNote` on MerchantSpring only, with the spec sentence, leave `description` and `caseStudy` in place, and verify the sentence only restates the current description and names no repository
- [x] 1.3 Verify the other fifteen projects have no `buildNote` field

## 2. Open details

- [x] 2.1 Render the Build heading and the one sentence after the case study when `"buildNote" in project`, using the existing paragraph reveal, and verify the heading is an `h4` after Outcome
- [x] 2.2 Verify opening MerchantSpring shows Problem, Role, Outcome, then Build, with no repository link and without the description paragraphs, and opening Lagoon and MatterWorx shows no Build heading

## 3. Integration

- [x] 3.1 Verify the MerchantSpring carousel card does not show the Build heading or the build-note sentence before the project is opened
- [x] 3.2 Verify Next from MerchantSpring stays open on Lagoon without the Build heading, and Previous from Lagoon stays open on MerchantSpring with Build after Outcome
- [x] 3.3 Check the public-code-or-build-note item in `CHECKLIST.MD` and recount the progress row with the existing rules
