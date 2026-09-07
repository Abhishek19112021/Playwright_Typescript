import { Page, expect } from '@playwright/test';

/**
 * Common test utilities for enterprise-level testing
 */

/**
 * Retry a function with exponential backoff
 */
export async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxAttempts: number = 3,
  initialDelayMs: number = 1000
): Promise<T> {
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      if (attempt < maxAttempts) {
        const delayMs = initialDelayMs * Math.pow(2, attempt - 1);
        console.log(
          `[RETRY] Attempt ${attempt}/${maxAttempts} failed, retrying in ${delayMs}ms...`
        );
        await new Promise(resolve => setTimeout(resolve, delayMs));
      }
    }
  }

  throw new Error(
    `Failed after ${maxAttempts} attempts: ${lastError?.message}`
  );
}

/**
 * Wait for network idle with optional timeout
 */
export async function waitForNetworkIdle(
  page: Page,
  timeoutMs: number = 30000
): Promise<void> {
  await page.waitForLoadState('networkidle', { timeout: timeoutMs });
}

/**
 * Take screenshot with consistent naming
 */
export async function takeScreenshot(
  page: Page,
  name: string,
  testName: string
): Promise<void> {
  const screenshotPath = `test-results/screenshots/${testName}/${name}.png`;
  await page.screenshot({ path: screenshotPath, fullPage: true });
  console.log(`[SCREENSHOT] Saved: ${screenshotPath}`);
}

/**
 * Generate test report data
 */
export function generateReportData(testName: string, status: 'PASSED' | 'FAILED' | 'SKIPPED'): Record<string, unknown> {
  return {
    testName,
    status,
    timestamp: new Date().toISOString(),
    environment: process.env.TEST_ENV || 'local',
  };
}

/**
 * Log structured message
 */
export function logTest(level: 'INFO' | 'WARN' | 'ERROR', message: string): void {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] [${level}] ${message}`);
}

/**
 * Assert visible text contains expected value
 */
export async function assertTextVisible(
  page: Page,
  selector: string,
  expectedText: string
): Promise<void> {
  const element = page.locator(selector);
  await expect(element).toBeVisible();
  await expect(element).toContainText(expectedText);
}

/**
 * Click element with retry logic
 */
export async function clickWithRetry(
  page: Page,
  selector: string,
  maxAttempts: number = 3
): Promise<void> {
  await retryWithBackoff(
    () => page.click(selector),
    maxAttempts,
    500
  );
}

/**
 * Fill input field with clear and retry logic
 */
export async function fillInputWithRetry(
  page: Page,
  selector: string,
  value: string,
  maxAttempts: number = 3
): Promise<void> {
  await retryWithBackoff(
    async () => {
      await page.fill(selector, '');
      await page.fill(selector, value);
    },
    maxAttempts,
    500
  );
}
