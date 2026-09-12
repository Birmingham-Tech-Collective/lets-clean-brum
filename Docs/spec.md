# Project Spec: "Let's Clean Brum" Litter Pick-Up Organiser (CRUD Edition)

**Client:** Birmingham Tech Collective
**Audience:** Local residents organising and joining neighbourhood litter clean-up events
**Suitable for:** A complete beginner, working solo, over roughly 3–5 weeks part-time
**Stack:** Python (FastAPI) · React · DynamoDB (NoSQL) · AWS, optimised for near-zero cost

---

## 1. Problem statement

Birmingham has plenty of people willing to spend an hour picking litter, but no easy way to find out where and when a clean-up is happening. This project gives people a simple form to post a clean-up event, and a simple page to browse/manage those events. Deliberately kept to plain CRUD (Create, Read, Update, Delete) — no RSVPs, no photos, no maps, no email, no logins — so the developer can focus entirely on learning the fundamentals.

## 2. Goals

- Create: anyone can post a litter clean-up event via a form
- Read: anyone can see a list of upcoming events, and view one in detail
- Update: an admin can edit an event's status (Upcoming / Cancelled / Completed)
- Delete: an admin can remove an event (e.g. duplicate or spam)

**Non-goals (v1):** RSVP/attendee sign-up (joining an event just means turning up on the day), photo uploads, maps/location pins, email notifications, user accounts, login/auth. All of these are natural "v2" additions once CRUD basics are solid — see section 10.

## 3. Core user flows

### Flow A: Post a clean-up event (Create)
1. Visitor lands on the homepage, clicks "Organise a clean-up"
2. Fills in a form:
   - Title (free text, e.g. "Cannon Hill Park litter pick")
   - Description (free text — what to bring, meeting point details)
   - Location (free-text field, e.g. "Cannon Hill Park, main gate")
   - Date & time (date/time picker)
3. Submits → sees a confirmation screen with a reference number
4. Event is saved to the database

### Flow B: Browse events (Read)
1. Anyone can visit an `/events` page
2. Sees a list/table of upcoming events: title, location, date & time, status
3. Can click into an event to see the full detail on its own page

### Flow C: Manage events (Update / Delete)
1. A simple `/admin` page lists all events with an "Edit" and "Delete" button next to each
2. Edit lets you change the status (dropdown: Upcoming / Cancelled / Completed) and save
3. Delete removes the event (with a confirmation prompt — "are you sure?")
4. No login required for v1 — keep it open, or just don't publicise the admin link. (Simple password protection is a good v1.5 add-on, not a blocker.)

## 4. Data model (DynamoDB)

DynamoDB is NoSQL, so there's no schema to enforce — but the app should always write/read this shape consistently:

**Table: `Events`**
| Attribute | Type | Notes |
|---|---|---|
| `event_id` | String (UUID) | **Partition key** |
| `title` | String | e.g. "Cannon Hill Park litter pick" |
| `description` | String | what to bring, meeting point details |
| `location` | String | free text, e.g. "Cannon Hill Park, main gate" |
| `date_time` | String (ISO 8601) | when the clean-up happens |
| `status` | String | upcoming / cancelled / completed — default "upcoming" |
| `created_at` | String (ISO 8601) | set automatically on create |

**Why a UUID instead of an auto-increment ID:** DynamoDB doesn't do auto-increment natively — generating a UUID in the FastAPI backend on create is the standard, simplest approach, and it's a good early lesson in why NoSQL primary keys work differently from SQL ones.

**Access pattern to keep in mind:** since this is NoSQL, "list all events" means scanning the whole table — fine at this scale (a few hundred/thousand rows), but worth explicitly noting as a NoSQL modelling lesson: in a bigger system you'd add a secondary index (e.g. on `status` or `date_time`) rather than scanning. Not needed for v1.

## 5. Suggested tech stack

- **Frontend:** React (Vite for the build tooling — faster and simpler to configure than Create React App)
- **Backend:** Python + FastAPI (great for beginners: automatic interactive API docs at `/docs`, clear typing, minimal boilerplate)
- **Database:** Amazon DynamoDB (NoSQL, serverless, generous always-free tier — see cost notes below)
- **Backend hosting:** AWS Lambda (via [Mangum](https://mangum.io/) to wrap the FastAPI app) + API Gateway
- **Frontend hosting:** Amazon S3 (static site) + CloudFront (CDN + HTTPS)
- **Infrastructure as code:** AWS SAM or the CDK (Python) — optional for v1, but a good habit to build; makes teardown/rebuild trivial

## 6. AWS architecture (cost-optimised)

```
 Browser
    │
    ▼
 CloudFront (HTTPS, caching)
    │
    ▼
 S3 bucket (static React build — index.html, JS, CSS)
    │
    │  (API calls from the React app go here instead)
    ▼
 API Gateway (HTTP API — cheaper than REST API)
    │
    ▼
 Lambda (FastAPI app via Mangum)
    │
    ▼
 DynamoDB (Events table, on-demand billing)
```

**Why this shape is the cheapest realistic option:**
- **Lambda + API Gateway (HTTP API, not REST API)** — you only pay per request; at community-project traffic levels (a few hundred submissions a month) this stays well within the AWS Free Tier (1M free Lambda requests/month, 1M free HTTP API calls/month for the first 12 months, and Lambda's free tier is actually permanent, not just 12 months)
- **DynamoDB on-demand billing** — no idle server cost; you pay per read/write, and DynamoDB's free tier (25GB storage, 25 provisioned or generous on-demand throughput) covers this project's scale indefinitely
- **S3 + CloudFront for the frontend** — static hosting is pennies per month; S3 storage for a small React build is fractions of a cent, and CloudFront's free tier covers 1TB of data transfer/month for the first year
- **No EC2, no RDS, no NAT Gateway** — these are the classic AWS cost traps for small projects (an always-on EC2 instance or RDS database can run $15–50+/month even when idle; NAT Gateways alone can cost $30+/month). This architecture avoids all three by staying fully serverless.

**Realistic monthly cost estimate for this project:** low single-digit dollars, and likely **$0** for the first 12 months under the AWS Free Tier. Set up **AWS Budgets** with a $5 or $10 alert as a safety net from day one — this is good practice regardless of scale and costs nothing itself.

## 7. Suggested build order (milestones)

Each step maps directly onto one CRUD operation, so progress is easy to see. Local development happens without AWS at all until step 7 — this keeps the early learning curve focused on the app, not the cloud.

1. **Static form, no backend** — React form component, no saving yet
2. **Local FastAPI backend + Create** — run FastAPI locally, use a local DynamoDB instance ([DynamoDB Local](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.html) runs in Docker, no AWS account needed yet), wire the form to POST a new event
3. **Read (list view)** — build `/events` in React to fetch and display all saved events (FastAPI scans the table)
4. **Read (detail view)** — click an event to see its own page with full detail (FastAPI gets one item by `event_id`)
5. **Update** — build the admin edit screen to change an event's status
6. **Delete** — add the delete button with a confirmation step
7. **Deploy to AWS** — create the real DynamoDB table, package the FastAPI app for Lambda with Mangum, set up API Gateway, build and upload the React app to S3, put CloudFront in front of it
8. **Polish** — tidy up styling, make sure it works on a phone screen, add basic empty-states ("No clean-ups scheduled yet")

## 8. What "done" looks like for v1

- A resident can post a clean-up event in under a minute, from any device
- Anyone can browse the list of upcoming events and open one for detail
- An admin can update a status or delete an event
- Live on a real HTTPS URL via CloudFront, backend fully serverless on AWS
- Running at effectively $0/month cost under the Free Tier, with a budget alert in place

## 9. Good learning opportunities baked in

- Forms and basic client-side validation in React
- Building a REST API with FastAPI: POST (create), GET (read), PUT/PATCH (update), DELETE
- FastAPI's automatic `/docs` page — a great way to test the API before the frontend is even built
- NoSQL data modelling fundamentals: partition keys, UUIDs instead of auto-increment, why "list everything" works differently than in SQL
- The full "request → API Gateway → Lambda → DynamoDB → response" loop, seen end to end
- Real (if small) cloud deployment experience: Lambda, API Gateway, S3, CloudFront, IAM permissions
- Cost-awareness as a design constraint, not an afterthought — a genuinely valuable habit for a junior developer

## 10. Natural next steps, once CRUD feels solid

Keep these off the table for v1, but they're the obvious next lessons:

- RSVP/attendee sign-up, so organisers can see a headcount before the day (a second entity, tied to events — a natural step up from single-table CRUD)
- Photo uploads for before/after shots (S3 bucket for images, presigned upload URLs)
- A map pin instead of free-text location
- Email/reminder notifications for people who've RSVP'd (Amazon SES, also has a free tier)
- Simple password protection on the admin page (Amazon Cognito, or even just a shared secret header to start)
- Infrastructure as code with AWS SAM/CDK if not already used, so the whole stack can be rebuilt with one command
- A secondary index on `status` or `date_time` if the events list grows large enough that scanning becomes noticeably slow

## 11. Open questions to settle before starting

- Who organises/monitors clean-up events in practice — will Birmingham Tech Collective or local litter-picking groups staff it, or is this a demo/portfolio piece?
- Any specific area or ward of Birmingham to focus on for a soft launch, to get real test users?
- Who holds the AWS account/billing for this — the org, or the developer's own account to start? Worth deciding before deployment (step 7) so the Free Tier and budget alerts are on the right account.
