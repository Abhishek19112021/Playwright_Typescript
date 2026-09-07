import type * as Logger from '../tests/utils/logger';
import type * as TempFile from '../tests/utils/tempFile';

declare module '@playwright/test' {
  interface TestFixtures {
    logger: typeof Logger;
    tempFile: typeof TempFile;
  }
}
