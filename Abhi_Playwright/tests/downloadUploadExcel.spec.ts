import { test, expect } from './fixtures';
import * as path from 'path';
import * as os from 'os';
import * as fs from 'fs';
import * as excelUtils from './utils/excelUtils';

test('Upload (TS) - download, edit and upload excel', async ({ page, logger, tempFile }) => {
  const searchKey = 'Banana';
  const searchValue = '500';
  const tmpFile = tempFile.createTempFile('download');
  logger.info('Temp file path', { tmpFile });

  await page.goto('https://rahulshettyacademy.com/upload-download-test/index.html');

  const [download] = await Promise.all([
    page.waitForEvent('download', { timeout: 15000 }),
    page.locator('#downloadButton').click(),
  ]);

  try {
    await download.saveAs(tmpFile);
    test.info().annotations.push({ type: 'artifact', description: `tmpFile:${tmpFile}` });
    logger.info('Saved download to', { tmpFile });

    await excelUtils.writeExcelFile('Sheet1', searchKey, searchValue, { rowchange: 0, columnchange: 2 }, tmpFile);

    await page.locator('#fileinput').setInputFiles(tmpFile);

    const textLocator = page.getByText(searchKey);
    const desiredRow = page.getByRole('row').filter({ has: textLocator });
    await expect(desiredRow).toContainText(String(searchValue));
    logger.info('TS assertion passed for', { searchKey });
  } finally {
    const removed = tempFile.cleanupTempFile(tmpFile);
    if (!removed) logger.warn('Could not remove temp file', { tmpFile });
  }
});
