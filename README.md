# Let's Clean Brum

A community litter clean-up event organiser for Birmingham Tech Collective — and a guided, end-to-end learning project for a developer building their first full-stack app.

Local litter-pickers post clean-up events (where, when, what to bring) via a simple form; anyone can browse upcoming events; an admin can update status or remove an event.

The project is deliberately kept to plain CRUD — no RSVPs, photos, maps, email or logins — so the focus stays on the fundamentals: building a working local app, then deploying it to AWS with infrastructure as code and CI/CD.

Full spec: [Docs/spec.md](Docs/spec.md)

## Stack

- **Frontend:** React + Vite
- **Backend:** Python + FastAPI
- **Database:** DynamoDB
- **Hosting:** AWS Lambda (via [Mangum](https://mangum.io/)) + API Gateway for the backend, and S3 + CloudFront for the frontend
- **Infrastructure as code:** Terraform
- **CI/CD:** GitHub Actions

## How to use this repo

This repo is a guided build, not a starter template.

Work through the issues in order — each one is a small, shippable step, and later steps depend on earlier ones.

The project is built in three phases:

1. **Local App** — build the whole CRUD app running locally, with no AWS account needed
2. **Cloud Deployment** — deploy the application to AWS using Terraform and automate it with GitHub Actions
3. **Polish** — improve styling, mobile responsiveness and empty states

For each issue:

1. Create a branch
2. Complete the work
3. Open a pull request against `main`
4. Reference the issue using `Closes #N`
5. Merge before moving to the next issue

See [CONTRIBUTING.md](CONTRIBUTING.md).

## Prerequisites

- [Node.js](https://nodejs.org/) (LTS) and npm
- [Python 3.11+](https://www.python.org/)
- [Docker](https://www.docker.com/) for DynamoDB Local during local development
- An [AWS account](https://aws.amazon.com/) and the [AWS CLI](https://aws.amazon.com/cli/) for the Cloud Deployment phase
- [Terraform](https://developer.hashicorp.com/terraform/install) for the Cloud Deployment phase

## First-time setup

### Backend

From the root of the repository:

```bash
cd backend
python -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
cd ..
```

### Frontend

From the root of the repository:

```bash
cd frontend
npm install
Copy-Item .env.example .env.local
cd ..
```

The `.env.local` file provides the API URL used by the frontend during local development:

```text
VITE_API_BASE_URL=http://127.0.0.1:8000
```

## Running locally

Make sure Docker Desktop is running before starting the application.

### 1. Start DynamoDB Local

From the root of the repository:

```bash
docker compose up
```

This starts DynamoDB Local and automatically creates the `Events` table once DynamoDB is healthy.

DynamoDB Local runs on:

```text
http://localhost:8001
```

### 2. Start the backend

Open a second terminal and run:

```bash
cd backend
```

Then run:

```bash
.\.venv\Scripts\python.exe -m uvicorn main:app --reload
```

The FastAPI backend runs on:

```text
http://127.0.0.1:8000
```

Swagger API documentation is available at:

```text
http://127.0.0.1:8000/docs
```

### 3. Start the frontend

Open a third terminal and run:

```bash
cd frontend
```

Then run:

```bash
npm.cmd run dev
```

The React application runs on:

```text
http://localhost:5173
```

## Available pages

### Create an event

```text
http://localhost:5173/
```

Use this page to create a new clean-up event.

### View all events

```text
http://localhost:5173/events
```

This page displays all saved clean-up events, including:

- title
- location
- date and time
- status

If there are no events, the page displays:

```text
No clean-ups scheduled yet
```
### View event details

Click any event row on the events page to open its detail page.

Each event detail page displays:

- title
- description
- location
- date and time
- status

If the event does not exist, the page displays:

```text
Event not found
```

## Cost

This architecture is chosen to run at effectively **$0/month** under the AWS Free Tier at this project's scale.

An AWS Budgets alert will be configured during the cloud deployment phase.

Full reasoning is available in [Docs/spec.md § 6](Docs/spec.md#6-aws-architecture-cost-optimised).