# Contributing

This repo is worked through as a sequence of [issues](../../issues), in order. Each issue is one small, shippable milestone from the build order in [Docs/spec.md § 7](Docs/spec.md#7-suggested-build-order-milestones).

## Workflow

1. Pick the **lowest-numbered open issue** — don't skip ahead, later steps assume earlier ones are done and merged.
2. Create a branch off `main`, named after the issue, e.g. `2-local-backend-create`.
3. Do the work described in the issue's acceptance criteria.
4. Open a PR against `main`. Put `Closes #N` in the description so the issue closes automatically on merge.
5. Merge, then move to the next issue.

## Commits

Small, focused commits are preferred over one giant commit per issue — but don't over-think it. Clear messages that say *why*, not just *what*, are more useful than perfect granularity.

## Getting unstuck

- FastAPI's interactive docs at `/docs` are the fastest way to test an endpoint before wiring up the frontend.
- If a Terraform or GitHub Actions issue feels daunting, [deaf-social](https://github.com/Birmingham-Tech-Collective/deaf-social) (`infra/` and `.github/workflows/`) shows a working example of the same pattern — the tech underneath differs, but the shape (bootstrap state, per-environment config, plan-on-PR/apply-on-merge) is the same.
- Stuck for more than an hour? Open a draft PR or comment on the issue — don't sit on it silently.
