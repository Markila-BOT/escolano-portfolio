# Spec Delta

## MODIFIED Requirements

### Requirement: Sitemap lists real public pages

The `/sitemap.xml` endpoint SHALL return HTTP 200 with XML containing the canonical homepage, `/tools`, and `/writing` exactly once each. A post URL SHALL appear only when that post file is published. The sitemap MUST NOT list section fragments, nonexistent detail pages, metadata endpoints, or fabricated modification dates.

#### Scenario: Single-page discovery

- **WHEN** a crawler requests the sitemap and no post is published
- **THEN** the valid sitemap contains the absolute HTTPS homepage, Tools, and writing index URLs exactly once each, and no hash-based page entries

#### Scenario: A post is published

- **WHEN** a crawler requests the sitemap and one post file is published
- **THEN** the sitemap also contains that post's absolute URL exactly once
