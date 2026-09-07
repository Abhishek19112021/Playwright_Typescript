# Playwright TypeScript Test Suite

## Overview
Enterprise-level test automation framework using Playwright with TypeScript.

## Project Structure

```
├── config/
│   ├── fixtures.ts           # Custom test fixtures
│   ├── global-setup.ts       # Global test setup (runs once before all tests)
│   ├── global-teardown.ts    # Global test teardown (runs once after all tests)
│   └── test-utils.ts         # Common test utilities
├── tests/
│   ├── example.spec.ts       # Test specifications
│   └── example1.spec.ts
├── test-results/             # Test execution results
├── playwright-report/        # HTML test report
├── .env.example              # Environment variables template
├── playwright.config.ts      # Playwright configuration
├── tsconfig.json             # TypeScript configuration
└── package.json              # Project dependencies
```

## Features

### 🌐 Cross-Browser Testing
- Chromium, Firefox, WebKit
- Mobile browsers (Chrome, Safari)
- Smoke tests configuration

### 📊 Comprehensive Reporting
- HTML reports with artifacts
- JUnit XML for CI integration
- JSON results for custom processing
- Screenshots on failure
- Video recordings on failure

### ⚙️ Enterprise Configuration
- Environment-based settings
- CI/CD integration ready
- Retry strategies for flaky tests
- Parallel test execution
- Configurable timeouts

### 🛠️ Test Utilities
- Retry with exponential backoff
- Network idle waits
- Screenshot capture
- Structured logging
- Element interaction helpers

## Installation

```bash
npm install
```

## Environment Setup

Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
```

## Running Tests

### Basic Commands
```bash
npm test                 # Run all tests
npm run test:ui        # Run tests in UI mode
npm run test:debug     # Run in debug mode
npm run test:headed    # Run in headed mode
```

### By Browser
```bash
npm run test:chromium  # Chrome only
npm run test:firefox   # Firefox only
npm run test:webkit    # Safari only
npm run test:mobile    # Mobile browsers
```

### Special Runs
```bash
npm run test:smoke     # Smoke tests only
npm run test:serial    # Sequential execution
```

### View Reports
```bash
npm run test:report    # Open HTML report
```

## Test Structure

Basic test example:
```typescript
import { test, expect } from '@playwright/test';

test('should perform action', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle('Home');
});
```

## CI/CD Integration

The configuration automatically detects CI environments and:
- Reduces workers to 1 for stability
- Enables retries on failure
- Collects detailed artifacts
- Generates JUnit reports
- Saves videos and traces on failure

Set `CI=true` environment variable in your CI/CD pipeline.

## Configuration Details

### Timeouts
- Individual test: 60 seconds
- Expect statements: 10 seconds
- Global: 30 minutes

### Retry Strategy
- Local: No retries
- CI: 2 retries for failed tests

### Workers
- Local: 4 workers (configurable via `WORKERS`)
- CI: 1 worker (sequential for stability)

### Artifacts
- Screenshots: Captured on failure in CI
- Videos: Saved on failure
- Traces: Enabled for debugging

## Global Setup/Teardown

- **Global Setup** (`config/global-setup.ts`): Runs once before all tests
  - Health checks
  - Test data initialization
  - Database seeding

- **Global Teardown** (`config/global-teardown.ts`): Runs once after all tests
  - Cleanup test data
  - Resource deallocation
  - Report generation

## Custom Fixtures

Extend tests with custom fixtures in `config/fixtures.ts`:

```typescript
export const test = base.extend<TestFixtures>({
  customFixture: async ({}, use) => {
    // Setup
    await use({});
    // Teardown
  },
});
```

## Best Practices

1. **Use Page Objects**: Organize selectors and interactions
2. **Descriptive Test Names**: Use clear, specific test descriptions
3. **Data Isolation**: Use global setup/teardown for test data
4. **Error Logging**: Use structured logging for debugging
5. **Retry Flaky Tests**: Mark flaky tests and handle appropriately
6. **Environment Variables**: Never hardcode credentials or URLs

## Debugging

```bash
# Debug mode with step-through
npm run test:debug

# UI mode with visual debugging
npm run test:ui

# View traces from failed tests
npm run test:report
```

## Performance Tips

- Use `--workers=1` for serial execution when needed
- Enable trace only on failure in production
- Use appropriate timeouts
- Parallelize tests across browsers

## Support

For issues or improvements, refer to:
- [Playwright Documentation](https://playwright.dev)
- [Best Practices Guide](https://playwright.dev/docs/best-practices)

---

**Last Updated**: 2024
