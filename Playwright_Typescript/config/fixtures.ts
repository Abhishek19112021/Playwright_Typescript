import { test as base, expect } from '@playwright/test';

/**
 * Custom test fixtures for enterprise-level testing
 * Provides common utilities and setup/teardown for all tests
 */

export interface TestFixtures {
  // Add custom fixtures here as needed
}

/**
 * Extended test with custom fixtures and configuration
 */
export const test = base.extend<TestFixtures>({});

/**
 * Re-export expect for convenience
 */
export { expect };
