# Spec Delta

## MODIFIED Requirements

### Requirement: Introduction names the audience and the approach

The introduction SHALL state, in one sentence, who the work is for and what gets built. That sentence SHALL say the work is for product teams and runs through deployment, that the approach is new code with AI and spec-driven development, and that most of that code is TypeScript. The English sentence SHALL be readable without hovering or animating the greeting, in both light and dark mode, on first paint and when JavaScript is off. The introduction MUST NOT repeat either claim in a second sentence. After the visitor selects Filipino or Japanese, that one sentence MAY be shown in the selected language only when the translation preserves these claims and adds none.

#### Scenario: Audience and approach are visible on load

- **WHEN** the visitor views the introduction in either theme before choosing a locale
- **THEN** they can read the English sentence that the work is for product teams and runs through deployment, that the approach is new code with AI and spec-driven development, and that most of that code is TypeScript, without interacting with the greeting

#### Scenario: One positioning sentence

- **WHEN** the visitor reads the introduction
- **THEN** who the work is for and what gets built appear in a single sentence, and neither claim is repeated in another sentence in the introduction

#### Scenario: Translated sentence keeps the claims

- **WHEN** the visitor selects Filipino or Japanese and that translation is approved
- **THEN** the visible sentence still states those same claims and does not add another

### Requirement: Hiring preferences are visible

The introduction and Contact section SHALL state that Mark is open to full-time roles and contract/freelance work, remote or based in the Philippines. The English copy SHALL be readable without interaction or JavaScript in both themes. It MUST NOT imply immediate availability, relocation outside the Philippines, or a guaranteed response time. A selected locale MAY show a same-claim translation of this sentence in the introduction. Contact MAY remain English.

#### Scenario: Recruiter reads preferences

- **WHEN** a visitor reads the introduction or Contact section before choosing a locale
- **THEN** both engagement types and the remote or Philippines-based preference are visible as real English text

#### Scenario: Scripts disabled

- **WHEN** JavaScript is unavailable
- **THEN** the hiring preferences remain present in the page's semantic text

#### Scenario: Translated introduction preferences

- **WHEN** the visitor selects a locale with an approved translation of the hiring sentence
- **THEN** the introduction shows that translation and does not add availability, relocation, or a response-time claim
