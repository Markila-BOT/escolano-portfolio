# Spec Delta

## MODIFIED Requirements

### Requirement: Same chips, no notes

Every chip SHALL keep its current label and icon. The chip groups MUST NOT add a chip, a one-line note under a chip, or a proficiency mark. The section title SHALL stay "My skills". A separate Skill evidence block SHALL present documented usage after the chip groups; it MUST NOT display subjective proficiency ratings.

#### Scenario: No notes or new chips
- **WHEN** the visitor reads the skills section
- **THEN** each chip shows only its existing icon and label, the title is "My skills", and evidence indicators appear in their separate block

## ADDED Requirements

### Requirement: Evidence preserves skill membership and context

Skill evidence SHALL list the same skills in Languages, Tools, Databases order and existing within-group order. It SHALL follow the chips and precede My toolkit when present. The block SHALL explain that statuses describe documented usage, not proficiency, and missing evidence does not mean lack of ability. Toolkit notes and disclosures SHALL remain unchanged.

#### Scenario: Toolkit and evidence coexist
- **WHEN** both evidence and toolkit are present
- **THEN** chips come first, Skill evidence comes second, and My toolkit comes third, with no evidence indicators inside toolkit disclosures

### Requirement: Usage status requires explicit evidence

Each skill SHALL show Used professionally if an explicit skill tag matches a documented work-role entry, otherwise Used in projects if it matches a portfolio project tag, otherwise No linked evidence. Professional status SHALL take precedence while retaining both source kinds. Matches SHALL use exact names or declared spelling aliases. Skill-list membership, dependencies, related technologies, and general descriptions MUST NOT establish usage.

#### Scenario: Explicit professional use
- **WHEN** React matches the Senior Software Engineer role tag and project tags
- **THEN** its status is Used professionally and its evidence contains the matching role and projects

#### Scenario: Project-only use
- **WHEN** Framer Motion matches project tags but no work-role tags
- **THEN** its status is Used in projects without implying employment or expertise level

#### Scenario: Aliases preserve exact source wording
- **WHEN** Next.js matches the declared alias NextJS in a role or project
- **THEN** it receives the supported status and the evidence displays the source's original NextJS tag

#### Scenario: An underlying technology is not inferred
- **WHEN** HTML has no matching role or project tag even though React is documented
- **THEN** HTML shows No linked evidence

#### Scenario: Removed evidence downgrades the status
- **WHEN** the last qualifying professional match for a skill is removed
- **THEN** its status becomes Used in projects if project matches remain, or No linked evidence otherwise

### Requirement: Visitors can inspect status sources

Each supported skill SHALL provide an inline evidence disclosure that starts closed. Opening it SHALL show every matching source once, identified as Experience or Project, with the existing title, date or year, and original matching tag. Missing-evidence skills SHALL show No linked evidence as plain text without an empty disclosure. Stale references MUST NOT create positive statuses or fabricated source content.

#### Scenario: A visitor inspects project usage
- **WHEN** the visitor opens Framer Motion's evidence
- **THEN** matching project titles, years, and the exact Framer Motion tags are visible

#### Scenario: Missing evidence stays neutral
- **WHEN** a skill has no qualifying source
- **THEN** it has a neutral No linked evidence indicator and no empty evidence control, learning claim, or numeric rating

### Requirement: Visual evidence is accessible and responsive

Statuses SHALL combine a distinguishable icon or shape with visible text; color alone MUST NOT convey status. Disclosure controls SHALL expose the skill and status, support keyboard operation, show focus, and have at least 44px touch height. At 390px and 1280px in both themes, labels and source text SHALL remain readable without horizontal overflow. Evidence MUST NOT require hover, animated meters, or custom canvas rendering.

#### Scenario: Keyboard evidence inspection
- **WHEN** a keyboard visitor focuses a supported skill and activates its disclosure
- **THEN** its source list opens inline, the control exposes its expanded state, and focus remains on the control

#### Scenario: A phone visitor sees the status
- **WHEN** the block is viewed at 390px in either theme with reduced motion
- **THEN** status labels and evidence can be read and operated without hover, animation, or sideways scrolling
