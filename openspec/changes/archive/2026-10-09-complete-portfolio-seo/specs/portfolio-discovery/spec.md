# Spec Delta

## Purpose

Expose the portfolio's public identity consistently to search engines, social sharing clients, and readers of its semantic document structure.

## ADDED Requirements

### Requirement: Search metadata identifies the canonical portfolio

The initial HTML SHALL contain a nonempty portfolio title and description and exactly one absolute HTTPS canonical URL for the production homepage. Canonical identity SHALL remain the same when the page is served from a local or preview host.

#### Scenario: Production document
- **WHEN** a crawler requests the homepage without executing JavaScript
- **THEN** title, description, and canonical identify Mark Escolano's portfolio at its configured production URL

#### Scenario: Alternate serving host
- **WHEN** the same build is served from localhost or a preview URL
- **THEN** its canonical URL still identifies the production homepage rather than that request host

### Requirement: Social sharing has a complete preview

The initial HTML SHALL provide Open Graph website metadata and a Twitter summary-large-image card with the portfolio title, description, and absolute share-image URL. Open Graph SHALL identify the canonical homepage and site name. The image SHALL be publicly fetchable, have declared dimensions and descriptive alternative text, and contain readable portfolio identity.

#### Scenario: Share preview discovery
- **WHEN** a social crawler reads the homepage without JavaScript
- **THEN** both preview formats expose the same portfolio identity and a fetchable 1200 by 630 pixel image

### Requirement: Structured identity is truthful and safely serialized

The initial HTML SHALL contain parseable schema.org JSON-LD describing Mark Escolano as a Person and the portfolio as a WebSite referencing that Person. URLs and stable identifiers SHALL use the canonical origin. Person profile links SHALL match published social links. Data MUST NOT invent credentials or allow text values to terminate the enclosing script element.

#### Scenario: Identity graph discovery
- **WHEN** a crawler parses the homepage JSON-LD
- **THEN** it finds the Person name, canonical URL, published role and profile links, plus a WebSite whose author references the Person identifier

#### Scenario: Unsafe text characters
- **WHEN** a structured-data text value contains an HTML script terminator
- **THEN** serialization preserves the JSON value without creating an additional HTML element or executable script

### Requirement: Sitemap lists real public pages

The `/sitemap.xml` endpoint SHALL return HTTP 200 with XML containing exactly the canonical homepage as a page URL. It MUST NOT list section fragments, nonexistent detail pages, metadata endpoints, or fabricated modification dates.

#### Scenario: Single-page discovery
- **WHEN** a crawler requests the sitemap
- **THEN** the valid sitemap contains one absolute HTTPS homepage URL and no hash-based page entries

### Requirement: Robots policy permits public discovery

The production `/robots.txt` endpoint SHALL return HTTP 200 with a text policy allowing general crawlers to access the public homepage and identifying the absolute canonical sitemap URL. It MUST NOT unintentionally block the homepage or resources needed to render it.

#### Scenario: Production crawler policy
- **WHEN** a crawler requests the production robots file
- **THEN** it receives a general-user-agent policy allowing the homepage and referencing the canonical `/sitemap.xml` endpoint

### Requirement: Document semantics expose a coherent heading hierarchy

The homepage SHALL expose one main landmark, one nonempty h1 for the introductory identity, and h2 headings for About, Projects, Skills, Experience, and Contact in their corresponding sections. It SHALL retain native header, navigation, and footer landmarks and its English document language. Heading elements MUST NOT be nested inside other headings.

#### Scenario: Initial semantic document
- **WHEN** the homepage is inspected before JavaScript execution
- **THEN** its landmarks and section headings are present, there is exactly one h1, and no heading contains another heading

#### Scenario: Client initialization
- **WHEN** the homepage hydrates and the greeting or role changes
- **THEN** the single h1 and section-heading hierarchy remain intact without hiding introductory content
