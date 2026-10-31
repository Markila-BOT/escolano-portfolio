# Spec Delta

## Purpose

Give the portfolio a static writing index whose posts exist only when the owner has written them.

## ADDED Requirements

### Requirement: The index exists and invents nothing

`/writing` SHALL be a server-rendered page with one h1. When no post file is published, the page SHALL say there are no notes yet. It MUST NOT show a sample title, date, or author.

#### Scenario: No posts

- **WHEN** a visitor opens `/writing` and no post is published
- **THEN** the page says there are no notes yet and lists no article

#### Scenario: JavaScript off

- **WHEN** `/writing` is loaded with JavaScript disabled
- **THEN** the heading and empty state, or the real post list, remain readable

### Requirement: A post is a repository file

A published post SHALL be a Markdown file in the repository, written by the owner. The index SHALL list only those files. Removing the file SHALL remove the post. The page MUST NOT fetch post bodies from a CMS or database.

#### Scenario: One real post

- **WHEN** the owner has added one Markdown post
- **THEN** the index links to that post and to no invented post

### Requirement: Discovery stays off the header

The footer SHALL link to `/writing`. The header navigation MUST NOT add a Writing item. The introduction MUST NOT gain another hiring action for writing.

#### Scenario: Footer link

- **WHEN** the visitor uses the footer link
- **THEN** they reach `/writing`

#### Scenario: Header unchanged

- **WHEN** the visitor reads the header
- **THEN** Writing is not a header item
