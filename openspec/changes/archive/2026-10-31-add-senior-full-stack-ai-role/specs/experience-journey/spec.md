# Spec Delta

## MODIFIED Requirements

### Requirement: The journey follows the experience data in order

The journey SHALL show one stop for each Experience entry, oldest first, from "Education" to the current role. The last stop SHALL be "Senior Full Stack Engineer (AI Engineer)". A person SHALL travel between stops. Between two stops in the same country, the person SHALL walk. Between two stops in different countries, the person SHALL fly in a plane. The country SHALL be the last part of the entry's location. The journey SHALL open at the first stop.

#### Scenario: The journey starts at the beginning

- **WHEN** the visitor switches to the journey
- **THEN** the person stands at the "Education" stop and the page shows stop 1 of 13

#### Scenario: A change of country is a flight

- **WHEN** the visitor travels from "Promoted" in Makati, Philippines to "Fly to Japan" in Tokyo, Japan
- **THEN** the person travels by plane

#### Scenario: The same country is a walk

- **WHEN** the visitor travels from "Internship" in Taguig, Philippines to "First Job" in Makati, Philippines
- **THEN** the person walks

#### Scenario: The current role is a walk inside the Philippines

- **WHEN** the visitor travels from "Senior Software Engineer" in Quezon City, Philippines to the last stop
- **THEN** the person walks, and the last stop is "Senior Full Stack Engineer (AI Engineer)" in Quezon City, Philippines

### Requirement: The current stop and the controls are real text

While the journey is shown, the page SHALL show, as real text outside the canvas, the current stop's title, location, date, and description, and its position as "Stop N of M", where M is the number of Experience entries (13 today). It SHALL offer Previous and Next buttons. Previous SHALL be disabled at the first stop and Next SHALL be disabled at the last. On a viewport at least 960 CSS pixels wide, written controls SHALL name the arrow keys or WASD, drag, and scroll. On a narrow viewport, they SHALL name tap, drag, and scroll, and MUST NOT tell the visitor to use a keyboard. The text SHALL be readable in light and dark mode without hovering, and a change of stop SHALL be announced to assistive technology.

#### Scenario: The stop is readable without the canvas

- **WHEN** the visitor moves to the "Training in United Kingdom" stop
- **THEN** the page shows that title, "Manchester, United Kingdom", "2018", its description, and the stop number as text

#### Scenario: A narrow screen does not ask for a keyboard

- **WHEN** the visitor shows the journey on a viewport 390 CSS pixels wide
- **THEN** the written controls name tap and do not mention a keyboard

#### Scenario: The ends are disabled

- **WHEN** the person is at the last stop
- **THEN** Next is disabled and Previous is enabled
