# Spec Delta

## Purpose

Deliver the introductory portrait at a resolution suited to its visible size and screen density without changing its appearance or delaying discovery.

## ADDED Requirements

### Requirement: Portrait resolution follows its display size

The initial portrait SHALL expose responsive image candidates and an accurate 160 CSS pixel display-size hint. A fresh visit at device pixel ratios 1 and 2 MUST offer sufficient resolution without requiring the current 640-pixel rendition.

#### Scenario: Standard-density visit
- **WHEN** the portfolio is loaded with an empty image cache at device pixel ratio 1
- **THEN** the portrait is displayed at 160 CSS pixels and selects a candidate of at least 160 but fewer than 640 pixels

#### Scenario: High-density visit
- **WHEN** the portfolio is loaded with an empty image cache at device pixel ratio 2
- **THEN** the portrait selects a candidate of at least 320 but fewer than 640 pixels while retaining the same CSS dimensions

### Requirement: Portrait presentation and early discovery are preserved

The portrait SHALL retain its existing subject, accessible name, square reserved layout, circular crop, border and shadow in both themes. It MUST be discoverable in initial HTML with priority loading rather than deferred until JavaScript runs.

#### Scenario: Initial HTML without JavaScript
- **WHEN** a visitor loads the portfolio without JavaScript
- **THEN** the portrait has its accessible name, reserved dimensions and responsive source hints in the initial document

#### Scenario: Responsive theme views
- **WHEN** the portfolio is viewed at 320px mobile and desktop widths in light and dark themes
- **THEN** the portrait keeps its 160px square box, existing crop and styling without a new layout shift
