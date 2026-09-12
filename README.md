# Report a Problem

A community "report a problem" tracker for Birmingham Tech Collective — and a guided, end-to-end learning project for a developer building their first full-stack app.

Residents log local issues (potholes, streetlights, fly-tipping, graffiti) via a simple form; anyone can browse reports; an admin can update status or remove a report. Deliberately kept to plain CRUD — no photos, maps, email or logins — so the focus stays on the fundamentals: a working local app, then a real, cheap, serverless deployment on AWS with infrastructure as code and CI/CD.

Full spec: [Docs/spec.md](Docs/spec.md)

## Stack

- **Frontend:** React + Vite
- **Backend:** Python + FastAPI
- **Database:** DynamoDB
- **Hosting:** AWS Lambda (via [Mangum](https://mangum.io/)) + API Gateway (backend), S3 + CloudFront (frontend)
- **Infrastructure as code:** Terraform (see [deaf-social's `infra/`](https://github.com/Birmingham-Tech-Collective/deaf-social/tree/main/infra) for the bootstrap/env pattern this follows)
- **CI/CD:** GitHub Actions

This repo is deliberately **empty of application code** — `frontend/`, `backend/` and `infra/` don't exist yet. You build them, one issue at a time.

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

## Cost

This architecture is chosen to run at effectively **$0/month** under the AWS Free Tier at this project's scale. Set up an AWS Budgets alert as part of the cloud deployment phase — see the relevant issue. Full reasoning in [Docs/spec.md § 6](Docs/spec.md#6-aws-architecture-cost-optimised).
