# Spec Delta

## Purpose

An open featured project explains the problem, the work, and the outcome in the visitor's own reading order, using only what that project's description already says.

## ADDED Requirements

### Requirement: Featured projects show three labeled parts

When a featured project's details are open, the details SHALL show three parts in this order, with the visible headings Problem, Role, and Outcome. The featured projects are MatterWorx, Potato V3, Owner Web App, Workflow, Chat-Admin, House Elf, MerchantSpring, Rakuten Travel, Iris, and ADT(Alliance Diagnostic Tool). Those details MUST NOT also repeat the description paragraphs.

#### Scenario: MatterWorx opens as a case study

- **WHEN** the visitor opens MatterWorx
- **THEN** the details show the headings Problem, then Role, then Outcome, and do not repeat the description paragraphs

#### Scenario: The last featured project uses the same order

- **WHEN** the visitor opens ADT(Alliance Diagnostic Tool)
- **THEN** the details show Problem, then Role, then Outcome

### Requirement: The three parts only restate the description

Each part's text SHALL be a restatement of that project's current description. It MUST NOT add a claim, metric, client quote, or personal job title that the description does not already contain. Role SHALL describe the work the description already attributes to the product.

#### Scenario: MatterWorx restates its description

- **WHEN** the visitor reads the MatterWorx case study
- **THEN** Problem says program admins need one place for submissions, onboarding reviews, active assignments, pending timesheets, pending invoices, and credentials that are expiring or already expired
- **THEN** Role says a placement runs from an open position to a candidate submission, an assignment, shifts, and credentials, and that program settings and organization tools configure the program
- **THEN** Outcome says timesheets, invoices, and remittance sit with the analytics, so hiring, time, and billing stay in one console, and each count links into that queue

#### Scenario: Potato V3 restates its description

- **WHEN** the visitor reads the Potato V3 case study
- **THEN** Problem says this console replaces the original Potato workspace, and operators need owners, chat, and program settings in one app
- **THEN** Role says chat is live, property managers message owners, follow topics, share files, and see unread badges, and settings cover users, roles, and property groups
- **THEN** Outcome says operators handle owners, chat, and program settings in one app, and the console is in English, Japanese, and Traditional Chinese

#### Scenario: Owner Web App restates its description

- **WHEN** the visitor reads the Owner Web App case study
- **THEN** Problem says property owners and the companies that manage their buildings were hunting through paper or old email for contracts and repair photos
- **THEN** Role says the Owner app is where they share contracts and repair photos
- **THEN** Outcome says the documents sit in one place, so both sides spend less time on paper and can find a file when they need to decide what to do next

#### Scenario: Workflow restates its description

- **WHEN** the visitor reads the Workflow case study
- **THEN** Problem says managers and owners need to see expenses, income, and general updates on a property, and what is waiting versus done
- **THEN** Role says Workflow sits beside the Owner app and lists those items, each with a category and a status
- **THEN** Outcome says it is tied to the Owner app, so both sides can follow a task and act on its status

#### Scenario: Chat-Admin restates its description

- **WHEN** the visitor reads the Chat-Admin case study
- **THEN** Problem says people need to send messages and files and organize the conversations next to the owner tools
- **THEN** Role says Chat Admin is that messaging app, it shows whether a property manager is available to answer, and it lists the owners under each management company
- **THEN** Outcome says people can organize and filter the conversations

#### Scenario: House Elf restates its description

- **WHEN** the visitor reads the House Elf case study
- **THEN** Problem says ordinary admin tasks for user groups, single sign-on, and new accounts required a script or opening the database
- **THEN** Role says House Elf is WealthPark's admin console for that internal work, including bulk jobs that are checked and reviewed before they run
- **THEN** Outcome says operators manage those tasks in one place, and the console is translated, has light and dark themes, and uses company SSO

#### Scenario: MerchantSpring restates its description

- **WHEN** the visitor reads the MerchantSpring case study
- **THEN** Problem says agencies, vendors, and investors who run more than one account were copying sales data by hand across marketplaces
- **THEN** Role says MerchantSpring reports on those e-commerce brands and covers Amazon, Shopify, Shopee, Lazada, Walmart, and other marketplaces
- **THEN** Outcome says teams watch sales, profit, and how each brand is doing, and the latest numbers, notes, and charts go into a brand report, so people spend less time copying data by hand

#### Scenario: Rakuten Travel restates its description

- **WHEN** the visitor reads the Rakuten Travel case study
- **THEN** Problem says travelers need hotels, other places to stay, and package tours for leisure and business trips in Japan, including stays outside Japan
- **THEN** Role says Rakuten Travel is the online travel agency in the Rakuten Group that lists them
- **THEN** Outcome says the domestic list runs from city hotels to the countryside, stays outside Japan have support in 8 languages, and package tours can include flights, local transport, and activities

#### Scenario: Iris restates its description

- **WHEN** the visitor reads the Iris case study
- **THEN** Problem says SaaS companies need support for questions and breakage, and customer success for goals and getting more out of the product
- **THEN** Role says Iris is that support and customer-success software, and the two teams do different work and share the same customers
- **THEN** Outcome says a support team answers questions, explains the product, and helps when something breaks, and a customer success team works with customers on their goals

#### Scenario: ADT restates its description

- **WHEN** the visitor reads the ADT(Alliance Diagnostic Tool) case study
- **THEN** Problem says automotive diagnostic content has to be written, managed, reused, and sent out, including to a service bay and over the air
- **THEN** Role says GRADE-X, from ADT Tool, is the set of products for that, and content is written once and published to more than one target, platform, or channel
- **THEN** Outcome says analytics show which content is actually needed, in support of fixing a problem the first time, updates are gathered in one place for approval, and the current version is what the distribution channels serve

### Requirement: Other projects keep their description

A project that is not in the featured set SHALL keep its description paragraphs in the open details. It MUST NOT show the headings Problem, Role, or Outcome. The projects outside the set are Valuation, LookingGlass, Lagoon, WebOTX, ECUs Non-Toyota-Diesel, and Lawson Smart Report.

#### Scenario: Valuation stays a description

- **WHEN** the visitor opens Valuation
- **THEN** the description paragraphs are shown and the headings Problem, Role, and Outcome are absent

#### Scenario: Lawson Smart Report stays a description

- **WHEN** the visitor opens Lawson Smart Report
- **THEN** the description paragraphs are shown and the headings Problem, Role, and Outcome are absent

### Requirement: The carousel card does not show the case study

A project card in the carousel MUST NOT show the headings Problem, Role, or Outcome. The three parts SHALL appear only in the open details.

#### Scenario: A featured card stays compact

- **WHEN** the visitor looks at the MatterWorx card in the carousel, before opening it
- **THEN** the card does not show the headings Problem, Role, or Outcome

### Requirement: Neighbor navigation shows that project's case study

When Previous or Next changes the open project, the details SHALL show the case study of the project that is now open, or that project's description when it is not featured.

#### Scenario: Next opens a featured neighbor

- **WHEN** the visitor opens Valuation and activates Next
- **THEN** the details stay open on Owner Web App and show Problem, Role, and Outcome

#### Scenario: Next opens a non-featured neighbor

- **WHEN** the visitor opens House Elf and activates Next
- **THEN** the details stay open on LookingGlass and show its description paragraphs without the headings Problem, Role, or Outcome
