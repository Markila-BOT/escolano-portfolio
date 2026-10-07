# Spec Delta

## ADDED Requirements

### Requirement: One recognizable person develops through the career

The journey SHALL show the same recognizable human character at every stop, with sculpted head, torso, limbs, articulated hands, shaped hair, large expressive eyes and brows, a readable mouth, and tailored clothing materials in a cohesive animated-feature aesthetic. Clothing, accessories, and posture SHALL distinguish student, early-career, and experienced professional stages without changing the character's identity.

#### Scenario: Growth from student to senior engineer
- **WHEN** the visitor compares Education, First Job, and Senior Software Engineer
- **THEN** the same face and hair identify the person, while study accessories, early-career work attire, and experienced-professional posture distinguish the stages

### Requirement: Each stop depicts its career activity with real-world objects

Each stop SHALL contain a staged career activity, at least one recognizable building or interior structure, and at least three contextual objects. Education SHALL depict study; developer roles SHALL depict computer work; training SHALL depict learning with teammates; leadership SHALL depict team guidance; relocation SHALL depict travel. Scenes MUST NOT invent employers, qualifications, or achievements absent from the career data.

#### Scenario: Study and coding are distinguishable
- **WHEN** the visitor moves from Education to Internship
- **THEN** Education shows a study setting with books, a desk, and a bag, while Internship shows a developer workspace with a computer, keyboard, and chair

#### Scenario: Training and leadership have human context
- **WHEN** the visitor visits Training in United Kingdom and Lead Software Engineer
- **THEN** training shows teammates and a learning surface, and leadership shows colleagues and a shared planning surface with the main person guiding them

#### Scenario: Every stop has a scene
- **WHEN** the visitor navigates all 12 current stops
- **THEN** each has its own staged activity, structure, and contextual objects rather than only a platform and marker

### Requirement: Geography is recognizable and grounded in location data

Each stop SHALL display an accurate flag for the country in its location and a geographically appropriate built setting. The Philippines, Japan, United Kingdom, and Australia SHALL have distinguishable architecture, streetscape, or vegetation cues. Flags and scenery SHALL supplement the real location text and MUST NOT imply undocumented employers or precise workplace addresses.

#### Scenario: Country changes are visible
- **WHEN** the visitor visits stops in the Philippines, Japan, United Kingdom, and Australia
- **THEN** each displays its correct flag and distinct environmental cues matching its country, with the existing location text still readable outside the canvas

### Requirement: The active career scene stays readable across screen sizes and themes

The scene SHALL frame the active character, activity props, country flag, and surrounding setting together at 390 and 1280 CSS pixel viewport widths. Foreground, ground, and background SHALL have distinguishable depth through lighting, material, and spatial separation in both themes. Nearby scenery MUST NOT obscure the active character or required activity objects in the initial stop framing.

#### Scenario: A phone can show the story
- **WHEN** a visitor opens the journey at 390 CSS pixels wide in either theme
- **THEN** the active character, activity objects, flag, and setting are visible together, and the existing text and controls remain usable

### Requirement: Chapters have cinematic visual appeal

The journey SHALL use cohesive rounded assets, readable facial expressions, distinct supporting characters, detailed activity props, layered architecture, and warm lighting with soft shadows. Default chapter compositions SHALL emphasize the person and activity rather than a uniform distant overhead view. Camera motion SHALL occur only during explicit interaction and finite navigation.

#### Scenario: Representative chapters show the treatment
- **WHEN** Education, Training in United Kingdom, and Senior Software Engineer are viewed at their default frames and closer character views
- **THEN** sculpted face and hair, expressive eyes and brows, tailored clothing, distinct teammates, rounded furniture, and deliberate lighting and framing are visible where applicable

#### Scenario: Cinematic presentation keeps the story readable
- **WHEN** any chapter is viewed in either theme on a phone or desktop
- **THEN** lighting and materials separate the character from the environment and visual effects do not hide required activity props or the accurate country flag

## MODIFIED Requirements

### Requirement: The journey follows the experience data in order

The journey SHALL show one stop for each Experience entry, oldest first, from "Education" to the current role. A person SHALL travel between stops. Between two stops in the same country, the person SHALL walk. Between two stops in different countries, the person SHALL fly in a plane. Travel classification SHALL compare the departure and destination countries in either navigation direction. The country SHALL be the last part of the entry's location. The journey SHALL open at the first stop.

#### Scenario: The journey starts at the beginning
- **WHEN** the visitor switches to the journey
- **THEN** the person stands at the "Education" stop and the page shows stop 1 of 12

#### Scenario: A change of country is a flight
- **WHEN** the visitor travels from "Promoted" in Makati, Philippines to "Fly to Japan" in Tokyo, Japan
- **THEN** the person travels by plane

#### Scenario: The same country is a walk
- **WHEN** the visitor travels from "Internship" in Taguig, Philippines to "First Job" in Makati, Philippines
- **THEN** the person walks

#### Scenario: Previous crosses the same border by plane
- **WHEN** the visitor travels from "Fly to Japan" back to "Promoted"
- **THEN** the person travels by plane from Japan to the Philippines

### Requirement: The journey moves only when asked and degrades to text

The view MUST NOT move until the visitor travels, drags, or zooms. Navigation SHALL trigger a finite activity gesture at the destination, then settle into a static pose; gestures MUST NOT loop or play on initial opening. When reduced motion is preferred, the person SHALL appear at the next stop without a walking, flying, or activity animation. If the 3D scene cannot be created, the stop text, Previous, Next, and the switch back SHALL still work. Switching back to the timeline SHALL release the 3D scene. Focus MUST NOT enter the canvas.

#### Scenario: Reduced motion jumps
- **WHEN** the visitor prefers reduced motion and presses Next
- **THEN** the person appears in the next stop's activity pose without moving through space or playing a gesture

#### Scenario: The scene cannot be drawn
- **WHEN** the 3D scene cannot be created
- **THEN** the visitor can still read every stop with Previous and Next and can switch back to the timeline

#### Scenario: A gesture finishes and rests
- **WHEN** the visitor navigates to a coding stop with motion enabled
- **THEN** the character plays a short typing gesture, settles into its working pose within three seconds of arrival, and stays still until another visitor action

#### Scenario: Opening does not start ambient motion
- **WHEN** the visitor first opens the journey and does not interact
- **THEN** the character, camera, flags, teammates, and scenery remain still
