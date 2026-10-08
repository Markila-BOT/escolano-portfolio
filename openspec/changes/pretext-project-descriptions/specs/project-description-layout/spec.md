# Spec Delta

## Purpose

Keep project drawer descriptions readable and faithful while enhancing them with responsive measured lines and a restrained reveal when browser layout support is available.

## ADDED Requirements

### Requirement: Measured descriptions preserve content

Each drawer description SHALL retain its full wording, paragraph order, punctuation, and meaningful whitespace. Enhancement SHALL preserve semantic paragraphs, reading order, text selection, and copying without duplicate text announcements.

#### Scenario: Text fidelity
- **WHEN** a visitor reads or copies an enhanced description
- **THEN** it contains the same content in the same order as the original paragraph and assistive technology encounters it once

### Requirement: Lines follow available text width

Enhanced descriptions SHALL wrap using measured line breaks at the current content width and loaded font metrics. Resizing and text zoom SHALL recompute wrapping without clipping or horizontal overflow from 320 px upward. Line computation SHALL NOT repeatedly measure rendered word or line elements to determine breaks.

#### Scenario: Resize and zoom
- **WHEN** the open drawer is resized or text is enlarged
- **THEN** line breaks update to the new text width and font size while all words remain readable

### Requirement: Ordinary text is a reliable fallback

Paragraphs SHALL render complete readable text before enhancement and when measurement, font loading, or package loading fails. Their server-rendered form SHALL remain readable without JavaScript and SHALL NOT depend on hidden or empty measured spans.

#### Scenario: Measurement unavailable
- **WHEN** a paragraph has no usable width or its measurement cannot finish
- **THEN** ordinary browser wrapping displays the complete text without delaying reading

#### Scenario: Server-rendered paragraph
- **WHEN** the paragraph's server-rendered output is viewed with JavaScript disabled
- **THEN** its complete text remains visible in semantic paragraph markup

### Requirement: Reveal remains readable and bounded

Measured lines SHALL use a reveal that finishes within 500 ms for the whole paragraph and stays readable throughout. Reduced motion SHALL show settled text immediately. Resizing SHALL NOT restart the reveal. Line-layout enhancement SHALL NOT introduce a visible jump in surrounding drawer content.

#### Scenario: Reduced motion or resize
- **WHEN** reduced motion is enabled or an already revealed paragraph is resized
- **THEN** wrapping updates without replaying an entrance animation

### Requirement: Project changes replace layout safely

Drawer neighbor navigation SHALL replace descriptions with the selected project's content and line layout. Results from earlier projects or widths SHALL NOT overwrite the current paragraph. Closing and reopening SHALL retain existing focus, media, and navigation behavior.

#### Scenario: Rapid neighbor navigation
- **WHEN** a visitor moves through several projects while fonts or measurements are pending
- **THEN** only the final selected project's descriptions are shown and the drawer stays open
