import { test as base, expect as baseExpect } from '@playwright/test';
import * as logger from './utils/logger';
import * as tempFile from './utils/tempFile';

type Fixtures = {
  logger: typeof logger;
  tempFile: typeof tempFile;
};

export const test = base.extend<Fixtures>({
  logger: async ({}, use) => {
    await use(logger);
  },
  tempFile: async ({}, use) => {
    await use(tempFile);
  }
});

export const expect = baseExpect;

export default test;
