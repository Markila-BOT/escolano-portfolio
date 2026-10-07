# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Hiring managers and engineering leads. They open the site to decide whether to interview Mark Escolano.

## Product Purpose

A public portfolio of Mark Escolano’s work. It exists so that audience can see the projects, the experience, and the skills, then reach him. Success is an interview decision made from what the page actually shows.

## Positioning

I help product teams take new code all the way to deployment, writing most of it in TypeScript with AI and spec-driven development.

## Operating Context

The visitor lands on one public page, moves through Home, About, Projects, Skills, Experience, and Contact, and can open a project or send a message. There is no account and no signed-in workflow.

## Capabilities and Constraints

The page shows an introduction, about copy, a project list with details, skills, experience, and a contact form. Theme and sound can be switched. Portfolio facts live in `lib/data.ts`. Do not rewrite those facts unless Mark asks.

Not decided: whether the site must stay a single page, and whether a LinkedIn URL should be added later.

## Brand Commitments

The name is Mark Escolano. The public voice is the copy already in `lib/data.ts`, including the positioning sentence above.

## Evidence on Hand

Projects, roles, skills, and the about copy are in `lib/data.ts`. The contact address on the page is mark.escolano14@gmail.com (`components/contact.tsx`).

No LinkedIn URL is in the repository. There are no testimonials, client quotes, or metrics beyond what that copy already says. Do not invent them.

## Product Principles

1. The page is for a hiring decision, not a general audience.
2. The positioning sentence is the claim. Supporting sections have to be able to back it.
3. Facts stay in `lib/data.ts` until Mark changes them.
4. Proof is the work already written down. Missing proof stays missing.
