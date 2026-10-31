# Spec Delta

## MODIFIED Requirements

### Requirement: Existing contact paths remain intact

Adding profile links SHALL preserve the stated hiring preferences, `mailto:mark.escolano14@gmail.com`, existing contact form and introduction's single Contact CTA. Contact SHALL keep its own GitHub and LinkedIn links with visible labels. Those Contact links MUST NOT be replaced by a third-party widget or an additional contact form. A persistent page bar MAY repeat the same GitHub and LinkedIn destinations and the existing CV site.

#### Scenario: Existing hiring path

- **WHEN** a visitor follows the introduction Contact CTA
- **THEN** the same Contact section presents preferences, public email, profile links and the existing form

#### Scenario: Bar repeats profiles

- **WHEN** the persistent bar is present
- **THEN** Contact still shows labeled GitHub and LinkedIn links to the same confirmed destinations
