import { chromium, FullConfig } from '@playwright/test';

/**
 * Global setup for tests
 * Runs once before all test suites
 * Use for:
 * - Database seeding
 * - API authentication
 * - Test data initialization
 * - Service health checks
 */
async function globalSetup(config: FullConfig) {
  console.log('[SETUP] Starting global test setup...');
  
  try {
    // Example: Health check
    await healthCheck(config.use.baseURL || 'http://localhost:3000');
    
    // Example: Initialize test data
    await initializeTestData();
    
    console.log('[SETUP] Global setup completed successfully');
  } catch (error) {
    console.error('[SETUP] Global setup failed:', error);
    throw error;
  }
}

/**
 * Health check to ensure the application is running
 */
async function healthCheck(baseURL: string): Promise<void> {
  const maxRetries = 5;
  let lastError: Error | null = null;

  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(`${baseURL}/health`, { timeout: 5000 });
      if (response.ok) {
        console.log('[SETUP] Health check passed');
        return;
      }
    } catch (error) {
      lastError = error as Error;
      console.log(`[SETUP] Health check attempt ${i + 1}/${maxRetries} failed, retrying...`);
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }

  throw new Error(`Health check failed after ${maxRetries} attempts: ${lastError?.message}`);
}

/**
 * Initialize test data
 * Example implementation - customize as needed
 */
async function initializeTestData(): Promise<void> {
  console.log('[SETUP] Initializing test data...');
  // Add your test data initialization logic here
  // Example: Call API to seed database, clear caches, etc.
}

export default globalSetup;
