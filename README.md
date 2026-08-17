# Cypress Testing Example v2

Web automation testing example using [Cypress](https://www.cypress.io/) for the
[Project for Testing](https://project-for-testing.abangkito.com/admin) demo application.

## Requirements

- Node.js 24+
- npm

## Getting Started

Clone the repository and install the dependencies:

```bash
git clone https://github.com/imranwijaya/cypress-testing-example.git
cd cypress-testing-example
npm install
```

### Environment Configuration

Create a local `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

Configure the required Cypress environment variables:

```env
CYPRESS_BASE_URL="https://example.com/admin"
CYPRESS_LOGIN_NAME="your-login-name"
CYPRESS_LOGIN_EMAIL="your-email@example.com"
CYPRESS_LOGIN_PASSWORD="your-password"

CYPRESS_DB_HOST="127.0.0.1"
CYPRESS_DB_NAME="your-database"
CYPRESS_DB_USER="your-database-user"
CYPRESS_DB_PASSWORD="your-database-password"
CYPRESS_DB_PORT=3306
```

The environment configuration is loaded from `.env` and validated with Zod
before Cypress starts.

## Running Tests

Open Cypress interactively:

```bash
npm run cypress:open
```

Run the complete E2E test suite in Chrome:

```bash
npm run test:e2e
```

## GitHub Actions

Cypress E2E tests run automatically whenever code is pushed to `main`.

The CI workflow:

1. Checks out the repository.
2. Runs Cypress on an Ubuntu GitHub-hosted runner.
3. Installs and caches project dependencies through the official Cypress GitHub Action.
4. Runs the E2E test suite in Chrome.
5. Publishes Cypress test results to the GitHub Actions job summary.
6. Uploads screenshots when tests fail.
7. Uploads videos when tests fail and Cypress produces them.

### GitHub Variables

The following configuration is stored as GitHub Actions Variables:

- `CYPRESS_BASE_URL`
- `CYPRESS_LOGIN_NAME`
- `CYPRESS_LOGIN_EMAIL`
- `CYPRESS_LOGIN_PASSWORD`

### GitHub Secrets

The following database configuration is stored as GitHub Actions Secrets:

- `CYPRESS_DB_HOST`
- `CYPRESS_DB_NAME`
- `CYPRESS_DB_USER`
- `CYPRESS_DB_PASSWORD`
- `CYPRESS_DB_PORT`

Local development continues to use `.env`.

GitHub Actions provides the same `CYPRESS_*` environment variables through
GitHub Variables and Secrets, so the Cypress environment configuration remains
consistent between local development and CI.

## Test Results and Evidence

Every GitHub Actions run publishes a Cypress test summary containing:

- Passing or failing status
- Total tests
- Passed tests
- Failed tests
- Pending tests
- Skipped tests
- Test duration

When a Cypress test fails, screenshots are uploaded as workflow artifacts.

Video recordings are also uploaded when Cypress produces them.

## Project Structure

```text
.
├── cypress/
│   ├── e2e/
│   ├── fixtures/
│   └── support/
├── .github/
│   └── workflows/
│       └── cypress.yml
├── .env.example
├── cypress.config.js
├── env.config.js
├── package.json
└── README.md
```

## License

This project is licensed under the [MIT License](LICENSE).
