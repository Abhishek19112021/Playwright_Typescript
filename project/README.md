# Abhishek Academy Enterprise QA Lab

This repository is a complete practice environment built around two realistic applications:

- **MarketOne**: commerce journeys for search, catalog, cart, checkout, orders and API validation.
- **Cedar Bank**: banking journeys for balances, transactions, payments, security and data validation.

The deployed frontend is available at https://abhishek-academy.vercel.app.

## Learning map

| Topic | Location | What to teach |
| --- | --- | --- |
| UI automation | `automation-tests/playwright` | locators, assertions, fixtures, trace, screenshots and CI |
| Selenium | `automation-tests/selenium` | WebDriver, browser lifecycle, XPath/CSS and smoke tests |
| API testing | `api/src/server.js`, `api/test` | health, search, cart, orders, accounts and negative cases |
| Database testing | `api/schema.sql` | users, products, carts, orders, transactions and indexes |
| Performance testing | `performance/k6-marketone.js` | VUs, latency thresholds, error budgets and metrics |
| CI/CD | `.github/workflows/quality.yml` | API tests, frontend build and Playwright gates |

## Run from scratch

```powershell
npm run install:all
npm run api
```

### Production authentication setup

The frontend login is database-backed. It does not accept arbitrary credentials. Before deploying the API, configure `api/.env` from `api/.env.example`, apply `api/schema.sql`, and seed a learner account without putting the password in source control:

```powershell
$env:DATABASE_URL = "your-private-postgresql-connection-string"
$env:JWT_SECRET = "your-long-random-secret"
$env:SEED_EMAIL = "learner@academy.test"
$env:SEED_PASSWORD = "your-private-training-password"
npm run seed --prefix api
npm run api
```

For a public production deployment, set `VITE_API_URL` in the frontend hosting environment to the HTTPS API URL. Set `WEB_ORIGIN` on the API to `https://abhishek-academy.vercel.app`. The current public frontend should not be redeployed with database login enabled until those two services and secrets are configured.

In another terminal:

```powershell
npm run api:test
npm run build:vue
npm run ui:test
npm run selenium:test
```

The API runs at `http://localhost:3000`. The UI tests target the deployed application by default. To target a local frontend, set `WEB_URL` before running tests.

## Database lab

Start trusted PostgreSQL locally:

```powershell
docker compose up -d postgres
```

Apply `api/schema.sql` with your PostgreSQL client. The schema is deliberately explicit so learners can practice primary keys, foreign keys, uniqueness, checks and indexes.

## Performance lab

With the API running and k6 installed:

```powershell
k6 run performance/k6-marketone.js
```

Use `API_URL=https://your-api.example.com` to point the same script at a hosted environment. The starter thresholds require less than 1% request failures and a 95th percentile under 500ms.

All application code uses official Angular, Vue, Express, Playwright, Selenium WebDriver, PostgreSQL and k6 workflows. No production credentials or real banking data are used.
