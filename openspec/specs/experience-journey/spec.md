# experience-journey Specification

## Purpose

Let the visitor switch the Experience section between the timeline and a 3D journey through the same entries, with the travel controls written on the page.

## Requirements

### Requirement: Experience shows the timeline first and offers one switch

The Experience section SHALL show the timeline with its Read More control when the page loads. The section SHALL offer one button that switches to the 3D journey and, from the journey, switches back to the timeline. The button's accessible name SHALL name the view it switches to: "Show 3D journey" or "Show timeline". The 3D scene MUST NOT load before the visitor switches to the journey. Switching back SHALL show the timeline with the same number of entries it showed before the switch. The section heading SHALL stay "My experience" in both views.

#### Scenario: Timeline first, nothing 3D loaded

- **WHEN** the visitor scrolls to Experience and has not pressed the switch
- **THEN** the timeline and Read More are shown, the switch is named "Show 3D journey", and no 3D scene is loaded

#### Scenario: Read More survives a round trip

- **WHEN** the visitor presses Read More once, switches to the journey, and switches back
- **THEN** the timeline shows six entries, as it did before the switch

### Requirement: The journey follows the experience data in order

The journey SHALL show one stop for each Experience entry, oldest first, from "Education" to the current role. A person SHALL travel between stops. Between two stops in the same country, the person SHALL walk. Between two stops in different countries, the person SHALL fly in a plane. The country SHALL be the last part of the entry's location. The journey SHALL open at the first stop.

#### Scenario: The journey starts at the beginning

- **WHEN** the visitor switches to the journey
- **THEN** the person stands at the "Education" stop and the page shows stop 1 of 12

#### Scenario: A change of country is a flight

- **WHEN** the visitor travels from "Promoted" in Makati, Philippines to "Fly to Japan" in Tokyo, Japan
- **THEN** the person travels by plane

#### Scenario: The same country is a walk

- **WHEN** the visitor travels from "Internship" in Taguig, Philippines to "First Job" in Makati, Philippines
- **THEN** the person walks

### Requirement: The current stop and the controls are real text

While the journey is shown, the page SHALL show, as real text outside the canvas, the current stop's title, location, date, and description, and its position as "Stop N of M", where M is the number of Experience entries (12 today). It SHALL offer Previous and Next buttons. Previous SHALL be disabled at the first stop and Next SHALL be disabled at the last. On a viewport at least 960 CSS pixels wide, written controls SHALL name the arrow keys or WASD, drag, and scroll. On a narrow viewport, they SHALL name tap, drag, and scroll, and MUST NOT tell the visitor to use a keyboard. The text SHALL be readable in light and dark mode without hovering, and a change of stop SHALL be announced to assistive technology.

#### Scenario: The stop is readable without the canvas

- **WHEN** the visitor moves to the "Training in United Kingdom" stop
- **THEN** the page shows that title, "Manchester, United Kingdom", "2018", its description, and the stop number as text

#### Scenario: A narrow screen does not ask for a keyboard

- **WHEN** the visitor shows the journey on a viewport 390 CSS pixels wide
- **THEN** the written controls name tap and do not mention a keyboard

#### Scenario: The ends are disabled

- **WHEN** the person is at the last stop
- **THEN** Next is disabled and Previous is enabled

### Requirement: Travel is by key or button, and looking never travels

While focus is inside the journey, Right, Up, D, and W SHALL move to the next stop, and Left, Down, A, and S SHALL move to the previous stop. Previous and Next SHALL do the same. A drag SHALL turn the view and a scroll on the canvas SHALL zoom. A drag or a zoom MUST NOT change the stop. Arrow keys MUST NOT scroll the page while focus is inside the journey, and MUST behave as usual when focus is elsewhere. Switching views, traveling, looking, and zooming MUST NOT play a sound.

#### Scenario: A key moves one stop

- **WHEN** focus is inside the journey at stop 1 and the visitor presses the right arrow
- **THEN** the person travels to stop 2, the page shows stop 2's text, and the page does not scroll

#### Scenario: Looking stays on the stop

- **WHEN** sound is on and the visitor drags and scrolls on the canvas
- **THEN** the view changes, the stop stays the same, and no sound plays

### Requirement: The journey moves only when asked and degrades to text

The view MUST NOT move until the visitor travels, drags, or zooms. When reduced motion is preferred, the person SHALL appear at the next stop without a walking or flying animation. If the 3D scene cannot be created, the stop text, Previous, Next, and the switch back SHALL still work. Switching back to the timeline SHALL release the 3D scene. Focus MUST NOT enter the canvas.

#### Scenario: Reduced motion jumps

- **WHEN** the visitor prefers reduced motion and presses Next
- **THEN** the person appears at the next stop without moving through the space between

#### Scenario: The scene cannot be drawn

- **WHEN** the 3D scene cannot be created
- **THEN** the visitor can still read every stop with Previous and Next and can switch back to the timeline
