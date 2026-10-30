# Spec Delta

## Purpose

Provide small, accessible browser utilities that transform visitor-supplied text locally without accounts, uploads, or persistent storage.

## ADDED Requirements

### Requirement: Tools is a public destination

The site SHALL expose `/tools` with a Tools heading, a directory linking to JSON formatter, word/character counter, and URL encoder/decoder sections, and a visible local-processing notice. A homepage introduction link SHALL reach Tools; the shared footer SHALL have no Tools link. Shared navigation from Tools SHALL reach actual homepage sections rather than missing local fragments.

#### Scenario: Discover and navigate
- **WHEN** a visitor follows Tools from the homepage introduction or opens `/tools` directly
- **THEN** the directory and three named sections are available, and homepage navigation reaches the intended homepage section

#### Scenario: No JavaScript
- **WHEN** `/tools` is loaded without JavaScript
- **THEN** the directory, instructions, and navigation remain readable and a notice explains that transformations require JavaScript

### Requirement: JSON formatting is explicit and reports invalid input

The JSON formatter SHALL accept standard JSON and format it with two-space indentation on activation of Format JSON. Invalid or blank input SHALL produce an associated error without losing input or leaving stale output available for copying. JSON text and results MUST render as text, never executable markup.

#### Scenario: Format valid JSON
- **WHEN** a visitor formats `{"name":"Mark","active":true}`
- **THEN** output contains the parsed object serialized with two-space indentation

#### Scenario: Reject invalid input
- **WHEN** a visitor formats malformed or blank JSON after a successful result
- **THEN** input is retained, an accessible error is shown, and the previous result is not copyable

#### Scenario: JSON scalar and markup string
- **WHEN** a visitor formats valid scalar JSON or a string containing HTML-like content
- **THEN** a formatted text result is shown without interpreting markup

### Requirement: Counts have explicit text semantics

The counter SHALL update word and character counts when input changes. Words SHALL be nonempty sequences separated by Unicode whitespace; characters SHALL be Unicode code points including whitespace. Empty input SHALL report zero for both counts. These definitions SHALL be visible beside the utility.

#### Scenario: Whitespace and Unicode
- **WHEN** the input is `Hi 👋` followed by a newline
- **THEN** the word count is 2 and the character count is 5

#### Scenario: Empty and whitespace-only input
- **WHEN** the input is empty or contains only whitespace
- **THEN** words are zero and characters equal the number of supplied code points

### Requirement: URL conversion uses component semantics

The URL utility SHALL provide explicit Encode component and Decode component actions with visible guidance that it is not a complete-URL parser. Encoding SHALL follow encodeURIComponent semantics and decoding decodeURIComponent semantics, preserving literal plus signs. Malformed escapes, invalid encoded UTF-8, or unpaired surrogates SHALL produce associated errors without losing input or exposing stale output.

#### Scenario: Component round trip
- **WHEN** a visitor encodes `a b+&` and decodes the result
- **THEN** encoding produces `a%20b%2B%26` and decoding recovers `a b+&`

#### Scenario: Plus and malformed escape
- **WHEN** a visitor decodes `a+b` or attempts to decode `%ZZ`
- **THEN** `a+b` is preserved unchanged in the first case and an accessible error replaces output in the second

### Requirement: Input stays local and bounded

Utility input and derived output SHALL remain in memory within the current page, without transmission, logging, URL embedding, analytics capture, or persistent storage. Each input SHALL accept at most 100,000 UTF-16 code units; oversized input SHALL be rejected with a visible explanation, not silently truncated. Utilities SHALL remain usable without transformation network requests.

#### Scenario: Sensitive text and reload
- **WHEN** a visitor transforms text and reloads the page
- **THEN** the application has transmitted or persisted none of that text and initializes utility state empty

#### Scenario: Oversized paste
- **WHEN** input would exceed the stated limit
- **THEN** the previously accepted input remains intact and an accessible size-limit error explains the rejection

### Requirement: Results can be copied and reset safely

Each transformation utility SHALL offer Copy result only for a current successful result, including an empty successful URL result, and Reset to clear its input, output, error, and feedback. The counter SHALL offer Reset. Clipboard writes SHALL occur only on explicit activation, with announced success or failure; unavailable clipboard access SHALL leave selectable output and manual-copy guidance.

#### Scenario: Result freshness
- **WHEN** a visitor edits transformation input after a successful result
- **THEN** stale output and copy availability clear until another successful transformation

#### Scenario: Copy rejected
- **WHEN** clipboard permission is denied or the clipboard API is unavailable
- **THEN** an announced failure gives manual-copy guidance while output remains selectable

#### Scenario: Reset
- **WHEN** a visitor resets a utility
- **THEN** only that utility clears, its counter if present returns to zero, and keyboard focus remains on its reset control

### Requirement: Tools works across access preferences

Tools SHALL provide one main landmark and h1, labeled input/output controls, programmatically associated errors, announced action feedback, and visible keyboard focus. All actions SHALL work by keyboard in both themes and reduced motion. At 320 CSS pixels and 200% text zoom, controls SHALL reflow without page-level horizontal scrolling; long output SHALL wrap or scroll within its own region.

#### Scenario: Keyboard and validation
- **WHEN** a keyboard visitor selects a utility, submits invalid input, corrects it, and copies the result
- **THEN** all actions are reachable, errors and feedback are announced, and focus is not unexpectedly moved

#### Scenario: Narrow viewport and long result
- **WHEN** a long result is shown at a narrow viewport or enlarged text size
- **THEN** controls remain operable and any necessary horizontal scrolling is confined to the result region
