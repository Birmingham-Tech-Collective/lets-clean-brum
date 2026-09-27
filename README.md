# Let's Clean Brum

A community litter clean-up event organiser for Birmingham Tech Collective — and a guided, end-to-end learning project for a developer building their first full-stack app.

Local litter-pickers post clean-up events (where, when, what to bring) via a simple form; anyone can browse upcoming events; an admin can update status or remove an event. Deliberately kept to plain CRUD — no RSVPs, photos, maps, email or logins — so the focus stays on the fundamentals: a working local app, then a real, cheap, serverless deployment on AWS with infrastructure as code and CI/CD.

Full spec: [Docs/spec.md](Docs/spec.md)

## Stack

- **Frontend:** React + Vite
- **Backend:** Python + FastAPI
- **Database:** DynamoDB
- **Hosting:** AWS Lambda (via [Mangum](https://mangum.io/)) + API Gateway (backend), S3 + CloudFront (frontend)
- **Infrastructure as code:** Terraform (see [deaf-social's `infra/`](https://github.com/Birmingham-Tech-Collective/deaf-social/tree/main/infra) for the bootstrap/env pattern this follows)
- **CI/CD:** GitHub Actions


## How to use this repo

This repo is a guided build, not a starter template. Work through the [issues](../../issues) **in order** — each one is a small, shippable step, and later steps depend on earlier ones. Each issue links back to the relevant section of the spec.

The path is in three phases (see [milestones](../../milestones)):

1. **Local App** — build the whole CRUD app running on your own machine, no AWS account needed
2. **Cloud Deployment** — stand up the real AWS infrastructure with Terraform, then automate it with GitHub Actions
3. **Polish** — styling, mobile, empty states

For each issue: create a branch, do the work, open a PR against `main` that references the issue (`Closes #N`), and merge before moving to the next one. See [CONTRIBUTING.md](CONTRIBUTING.md).

## Prerequisites

- [Node.js](https://nodejs.org/) (LTS) and npm
- [Python 3.11+](https://www.python.org/)
- [Docker](https://www.docker.com/) (for DynamoDB Local during local dev)
- An [AWS account](https://aws.amazon.com/) (only needed from the Cloud Deployment phase onward) and the [AWS CLI](https://aws.amazon.com/cli/), configured
- [Terraform](https://developer.hashicorp.com/terraform/install) (only needed from the Cloud Deployment phase onward)

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
cd ..
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

## Cost

This architecture is chosen to run at effectively **$0/month** under the AWS Free Tier at this project's scale. Set up an AWS Budgets alert as part of the cloud deployment phase — see the relevant issue. Full reasoning in [Docs/spec.md § 6](Docs/spec.md#6-aws-architecture-cost-optimised).
