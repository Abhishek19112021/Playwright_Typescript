This folder contains Playwright tests and a small Excel utility used by tests.

Files added:
- `utils/excelUtils.ts` - helper functions to find and write Excel cells using exceljs.
- `downloadUploadExcel.spec.ts` - TypeScript test that downloads an Excel file, modifies it, uploads it, and asserts the change.

Run the single TypeScript test with Playwright:

```bash
npx playwright test tests/downloadUploadExcel.spec.ts --project=chromium
```

If TypeScript compilation errors appear related to types for `exceljs`, install the type packages or set `skipLibCheck` in `tsconfig.json`.

Suggested dev dependencies:

```bash
npm install -D typescript @types/node
npm install exceljs

Build and run notes
-------------------

- To compile the TypeScript test helpers before running the TS test use:

```bash
npm run build:tests
```

- The repository includes npm scripts to run both JS and TS variants of the download/upload Excel test:

```bash
npm run test:excel:js    # run JS test
npm run test:excel:ts    # build TS helper then run TS test
npm run test:excel       # run both (JS then TS)
```

- Alternatively, you can run TS files directly with Playwright if you have `ts-node` configured. To use ts-node without compilation:

```bash
npm install -D ts-node typescript @types/node
# then run Playwright as usual; Playwright will use ts-node to execute TS tests
```

Global setup/teardown
----------------------

This project uses `tests/global-setup.ts` and `tests/global-teardown.ts`. The setup creates a `test-storage/storageState.json` placeholder and exposes its path via `process.env.TEST_STORAGE_STATE`. Teardown removes the storage dir. Adjust these files to implement real authentication flows for the suite.

Packaging artifacts
-------------------

After tests run (CI), package artifacts into `artifacts/` using:

```bash
npm run package:artifacts
```

Uploading artifacts to S3 (optional)
----------------------------------
Fixtures
--------

The project exposes a small `tests/fixtures.ts` that extends Playwright's `test` with useful helpers available to tests:

- `logger` - structured JSON logger (see `tests/utils/logger.ts`)
- `tempFile` - helpers to create/cleanup unique temp files (see `tests/utils/tempFile.ts`)

Usage in a TypeScript test:

```ts
import { test, expect } from './fixtures';

test('example', async ({ page, logger, tempFile }) => {
	const file = tempFile.createTempFile('download');
	logger.info('Created temp file', { file });
});
```


If you want CI to upload artifacts to S3, set these secrets in your CI environment:

- AWS_ACCESS_KEY_ID
- AWS_SECRET_ACCESS_KEY
- AWS_REGION
- S3_BUCKET

Then call the upload script with the zip path produced by the packaging script:

```bash
node scripts/upload-artifacts.js artifacts/artifacts-123456.zip
```


```
