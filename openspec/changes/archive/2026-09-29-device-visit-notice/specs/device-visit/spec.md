# Spec Delta

## Purpose

Count each visit on a device, tell the visitor which visit this is, and record that visit when an analytics destination is configured.

## ADDED Requirements

### Requirement: A device keeps one visit count

The page SHALL keep one visitor id and one visit count for this device. The first load with no saved id SHALL create an id and set the count to 1. A reload in the same tab SHALL keep the count. Another tab opened within 30 minutes of the last visit SHALL keep the count. A new tab session that starts at least 30 minutes after the last visit SHALL increase the count by 1. The page SHALL stay usable when storage is blocked, and SHALL show no error for that failure.

#### Scenario: First visit on a device

- **WHEN** the visitor loads the page with no saved visitor id
- **THEN** the device has a visitor id and the visit count is 1

#### Scenario: Reload in the same tab

- **WHEN** the visitor reloads the page in the same tab
- **THEN** the visit count stays the same

#### Scenario: Another tab inside 30 minutes

- **WHEN** the visitor opens the page in another tab within 30 minutes of the last visit
- **THEN** the visit count stays the same

#### Scenario: Return after 30 minutes

- **WHEN** a new tab session starts at least 30 minutes after the last visit
- **THEN** the visit count increases by 1

#### Scenario: Storage is blocked

- **WHEN** the browser blocks both local storage and cookies
- **THEN** the page remains usable and shows no error about the visit

### Requirement: A new visit shows one toast

A new visit SHALL show one polite status toast. Visit 1 SHALL use the title "Hello!" and the description "Thanks for stopping by — enjoy the site." A later new visit SHALL use the title "Welcome back!" and the description "Good to see you again — visit #N on this device.", with N equal to the visit count. A continuing visit SHALL show no visit toast. The visit toast MUST NOT play a sound, including when the saved sound choice is on. The contact form's success and error toasts SHALL still appear for those results.

#### Scenario: First visit toast

- **WHEN** the visit count becomes 1
- **THEN** one status toast shows "Hello!" and "Thanks for stopping by — enjoy the site."

#### Scenario: Returning visit toast

- **WHEN** a new visit raises the count above 1
- **THEN** one status toast shows "Welcome back!" and "Good to see you again — visit #N on this device." with that count

#### Scenario: Continuing visit

- **WHEN** the visit is a reload or a return inside 30 minutes
- **THEN** no visit toast appears

#### Scenario: The notice stays quiet

- **WHEN** the visit toast appears and the saved sound choice is on
- **THEN** no interaction cue plays

### Requirement: A configured destination receives one visit record

When an analytics destination is configured, the page SHALL send one record for that page load. The record SHALL be sent when the tab becomes hidden, when the page is closing, or 90 seconds after load, whichever comes first, and SHALL be sent only once. The record SHALL include the visitor id, visit count, whether the visit is new, first-seen and last-seen times, the page URL, the referrer, the campaign source, medium, and name when present, the time on the page, the device type, browser, operating system, screen size, language, and timezone. The record MUST NOT include a canvas fingerprint, a font list, a GPU name, an IP address, or a click log. When no destination is configured, the page MUST NOT send an analytics request. The destination MUST be this site's own endpoint.

#### Scenario: Destination is configured

- **WHEN** an analytics destination is configured and the visitor hides the tab
- **THEN** one record of this visit is sent to that destination and a second hide does not send another

#### Scenario: No destination

- **WHEN** no analytics destination is configured
- **THEN** the visit count and toast still work and no analytics request is sent

#### Scenario: The record stays coarse

- **WHEN** the visit record is sent
- **THEN** it contains the visit, page, referrer, and device description, and it does not contain a canvas fingerprint, font list, GPU name, IP address, or click log
