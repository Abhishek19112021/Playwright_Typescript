# Abhi Playwright - Enterprise E2E

This repository contains Playwright end-to-end tests with utilities for Excel manipulation and enterprise-grade CI configuration.

Key features:
- TypeScript and JavaScript helpers for Excel (exceljs)
- Centralized temp-file and logging utilities
- Playwright config with retries, multiple browser projects, and reporting
- ESLint and Prettier configs
- GitHub Actions CI workflow

Quick start:

```bash
npm ci
npm run build:tests
npx playwright install --with-deps
npm run test:excel
```

CI:
- The repository contains `.github/workflows/ci.yml` which runs tests on push/pull requests and uploads the Playwright HTML report.
Playwright Enterprise E2E Setup
================================

Quick start

- Install deps:

```bash
npm install
```

- Run tests (headed):

```bash
npm run test:headed
```

- Run tests (CI):

```bash
npm run test:ci
```

Additional setup
- Install Playwright browsers:

```bash
npm run playwright:install
```

- Generate authenticated `storageState` (used to run tests without logging in interactively):

```bash
npm run auth:generate
```

Notes
- The repo now includes a script to generate `auth/storageState.json` used by tests for authenticated sessions.
- CI workflow is defined at `.github/workflows/e2e.yml` - it installs browsers, optionally generates auth, runs tests across browsers, and uploads reports as artifacts.

Enterprise additions
- Docker: use `Dockerfile` and `docker-compose.yml` to run tests inside a Playwright container.
- Linting & hooks: ESLint added; Husky + lint-staged configured to run `eslint --fix` on staged JS files.

CI secrets (recommended)
- `BASE_URL`: override default base URL for target environment.
- `STORAGE_STATE_PATH`: path to the committed `auth/storageState.json` or secrets-based storage.
- `NPM_TOKEN` or registry auth if using private packages.

Setting CI secrets for auth generation

1. In GitHub repository Settings → Secrets → Actions, add the following secrets:
	- `AUTH_EMAIL` — the test account email used to login
	- `AUTH_PASSWORD` — the test account password
	- `BASE_URL` — optional, if not using the default https://rahulshettyacademy.com

2. The workflow at `.github/workflows/e2e.yml` will generate `auth/storageState.json` during the run when `AUTH_EMAIL` and `AUTH_PASSWORD` are present.

Security note: do not commit `auth/storageState.json` into the repo; keep it generated in CI and treated as ephemeral.

To enable Husky locally after `npm ci`:

```bash
npx husky install
npx husky add .husky/pre-commit "npx lint-staged"
```

If `git` is not available in your environment (or you prefer not to use Husky), use the fallback script before committing:

```bash
npm run precommit
```


