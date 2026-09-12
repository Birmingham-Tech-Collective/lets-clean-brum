# Claude Code Guidelines

## What this repo is

A guided, beginner-friendly build of a small full-stack CRUD app (React + FastAPI + DynamoDB, deployed serverless on AWS) for organising community litter clean-up events. The full spec is [Docs/spec.md](Docs/spec.md). The build is driven entirely by GitHub issues, worked through in order — see [README.md](README.md) and [CONTRIBUTING.md](CONTRIBUTING.md).

**Important:** don't build ahead of the current issue. If asked to work on issue N, only do what issue N's acceptance criteria describe, even if the finished app obviously needs more — later issues cover the rest. The point of this repo is the incremental learning path, not the fastest route to a finished app.

## Repo layout (once scaffolded)

- `frontend/` — React app (Vite)
- `backend/` — FastAPI app
- `infra/` — Terraform, following the bootstrap + `envs/<name>` pattern used in [deaf-social](https://github.com/Birmingham-Tech-Collective/deaf-social)'s `infra/`
- `.github/workflows/` — CI/CD, added in the Cloud Deployment phase

None of these exist yet at repo creation — they're created as part of working through the issues.

## Conventions

- Keep each issue's PR scoped to that issue only.
- Prefer the AWS Free Tier / lowest-cost option at every infra decision (see [Docs/spec.md § 6](Docs/spec.md#6-aws-architecture-cost-optimised)) — no EC2, no RDS, no NAT Gateway.
