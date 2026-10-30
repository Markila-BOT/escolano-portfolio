# Spec Delta

## MODIFIED Requirements

### Requirement: Sitemap lists real public pages

The `/sitemap.xml` endpoint SHALL return HTTP 200 with XML containing exactly the canonical homepage and `/tools` as page URLs. It MUST NOT list section fragments, nonexistent detail pages, metadata endpoints, or fabricated modification dates.

#### Scenario: Single-page discovery
- **WHEN** a crawler requests the sitemap
- **THEN** the valid sitemap contains the absolute HTTPS homepage and Tools URLs exactly once each and no hash-based page entries

## ADDED Requirements

### Requirement: Tools metadata identifies its own canonical page

The initial Tools HTML SHALL provide a Tools-specific title, description, absolute production HTTPS canonical URL, and matching Open Graph URL, title, description, and Twitter card identity. It SHALL retain the existing public share image and site identity without inheriting the homepage canonical URL. Local and preview hosts SHALL use the same production canonical identity.

#### Scenario: Tools initial HTML
- **WHEN** `/tools` is fetched on production, preview, or localhost before JavaScript execution
- **THEN** its canonical and Open Graph URLs identify production `/tools`, its title and description identify Tools, and its share image remains fetchable
