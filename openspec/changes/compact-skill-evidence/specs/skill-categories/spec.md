# Spec Delta

## MODIFIED Requirements

### Requirement: Same chips, no notes

Every chip SHALL keep its current label and icon and act as an evidence control. The chip groups MUST NOT add skills, notes under individual chips, or proficiency marks. The title SHALL stay "My skills". Evidence SHALL appear only for the selected skill in an inline panel; there SHALL be no separate repeated Skill evidence list or statuses inside unselected chips.

#### Scenario: No notes or new chips

- **WHEN** the visitor first reads the skills section
- **THEN** each chip shows its existing icon and label under My skills, with no evidence panel open and no repeated evidence list

### Requirement: Evidence preserves skill membership and context

The unified list SHALL keep the existing Languages, Tools, Databases membership and order. The selected skill's panel SHALL follow its category's chips. Visible introductory copy SHALL invite visitors to select a skill and explain that evidence describes documented usage, not proficiency, and missing evidence does not mean lack of ability. My toolkit SHALL follow the unified section with its notes and disclosures unchanged.

#### Scenario: Toolkit and evidence coexist

- **WHEN** both the unified skills section and toolkit are present
- **THEN** My skills contains one chip per skill and at most one evidence panel, followed by My toolkit with no evidence indicators inside toolkit disclosures

#### Scenario: Selecting across categories

- **WHEN** a visitor selects PostgreSQL after selecting React
- **THEN** React's panel closes and PostgreSQL's panel appears beneath the Databases chips without changing any chip order

### Requirement: Visitors can inspect status sources

Every skill SHALL be selectable to reveal its usage status. Supported skills SHALL show every matching source once with kind Experience or Project, existing title, date/year and original tag. Unlinked skills SHALL show No linked evidence and a neutral explanation, with no empty source list or fabricated content. Selecting another skill SHALL replace the current panel; reactivating the selected chip SHALL close it. All panels SHALL start closed.

#### Scenario: A visitor inspects project usage

- **WHEN** the visitor selects Framer Motion
- **THEN** its panel shows Used in projects and matching project titles, years and exact tags

#### Scenario: Missing evidence stays neutral

- **WHEN** the visitor selects HTML with no qualifying source
- **THEN** its panel shows No linked evidence and explains that no matching portfolio source is linked, without a learning claim or rating

#### Scenario: Toggle and replace

- **WHEN** the visitor selects React, selects TypeScript, and selects TypeScript again
- **THEN** React opens first, TypeScript replaces it, and the final activation leaves all panels closed

### Requirement: Visual evidence is accessible and responsive

Selected evidence status SHALL use an icon or shape with visible text. Chip controls SHALL expose their skill name, expanded state and controlled panel, support Enter and Space, retain focus on activation and show visible focus and selection. Targets SHALL be at least 44px tall. At 390px and 1280px in both themes, chips and sources SHALL wrap without horizontal overflow. Inspection MUST NOT depend on hover or motion.

#### Scenario: Keyboard evidence inspection

- **WHEN** a keyboard visitor tabs to a skill and presses Enter or Space
- **THEN** its panel toggles, expanded state updates, and focus remains on the chip with a visible ring

#### Scenario: A phone visitor sees the status

- **WHEN** the section is viewed at 390px in either theme with reduced motion
- **THEN** the visitor can tap a chip and read its status and sources without hover, required animation or sideways scrolling

#### Scenario: Collapsed and selected controls

- **WHEN** one skill is selected
- **THEN** only that chip exposes expanded state and a visible selection treatment, while every other chip remains collapsed
