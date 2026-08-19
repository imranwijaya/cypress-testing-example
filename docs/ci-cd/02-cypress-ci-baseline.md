# CI/CD Task 02 — Cypress CI Baseline

## Status

**COMPLETED**

## Repository

`imranwijaya/cypress-testing-example`

## Branch

`cicd-task-02-cypress-ci`

## Commit

`92c0ea4` — `ci: validate Cypress on pull requests`

## Objective

Establish a baseline GitHub Actions workflow for running Cypress E2E tests automatically against the application.

The workflow validates Cypress tests for both pull requests targeting `main` and pushes to `main`.

## CI Workflow

Workflow file:

```text
.github/workflows/cypress.yml
```

Pipeline:

```text
Pull Request → main ──┐
                      ├── Cypress E2E
Push → main ──────────┘
```

## Cypress Environment

The workflow runs on:

```text
Ubuntu 24.04
```

The Cypress tests execute using:

```text
Chrome
```

The workflow uses:

```text
cypress-io/github-action@v7
```

## Configuration

The workflow receives application configuration through GitHub Actions Variables:

```text
CYPRESS_BASE_URL
CYPRESS_LOGIN_NAME
CYPRESS_LOGIN_EMAIL
CYPRESS_LOGIN_PASSWORD
```

Database configuration is supplied through GitHub Actions Secrets:

```text
CYPRESS_DB_HOST
CYPRESS_DB_USER
CYPRESS_DB_PASSWORD
CYPRESS_DB_NAME
CYPRESS_DB_PORT
```

Secrets and environment-specific values are not committed to the repository.

## Failure Artifacts

When Cypress execution fails, the workflow attempts to upload:

```text
cypress/screenshots
cypress/videos
```

This provides test execution evidence for diagnosing CI failures.

## Relationship to Application CI

Task 01 established application-level validation:

```text
npm ci
  ↓
npm run typecheck
  ↓
npm run build
```

Task 02 establishes E2E validation:

```text
Cypress
  ↓
Chrome
  ↓
E2E tests
```

The two workflows provide separate validation responsibilities.

## Scope

Task 02 intentionally establishes the Cypress CI baseline only.

It does not implement:

- DigitalOcean deployment
- Continuous Deployment
- Post-deployment Cypress orchestration
- Automatic rollback
- Production deployment gates

Those concerns are handled by subsequent CI/CD tasks.

## Result

Task 02 is complete.

The Cypress repository contains a GitHub Actions workflow that validates E2E tests for pull requests targeting `main` and pushes to `main`.
