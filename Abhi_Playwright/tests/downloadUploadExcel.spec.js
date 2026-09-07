const fs = require('fs');
const path = require('path');
const os = require('os');
const { test, expect } = require('./fixtures');
const excelUtils = require('./utils/excelUtils');
const tempFile = require('./utils/tempFile');
const logger = require('./utils/logger');
test('Upload', async ({ page }) => {
  const searchKey = 'Banana';
  const searchValue = '500';
  const filePath = tempFile.createTempFile('download');
  logger.info('Temp file path', filePath);
  await page.goto('https://rahulshettyacademy.com/upload-download-test/index.html');
  const downloadPromise = page.waitForEvent('download', { timeout: 15000 });
  await page.locator('#downloadButton').click();
  const download = await downloadPromise;
  await download.saveAs(filePath);
  try {
    logger.info('Modifying excel', filePath);
    await excelUtils.writeExcelFile('Sheet1', searchKey, searchValue, { rowchange: 0, columnchange: 2 }, filePath);
    await page.locator('#fileinput').setInputFiles(filePath);
    const textLocator = page.getByText(searchKey);
    const desiredRow = page.getByRole('row').filter({ has: textLocator });
    await expect(desiredRow).toContainText(String(searchValue));
    logger.info('Assertion passed for', searchKey);
  } finally {
    const removed = tempFile.cleanupTempFile(filePath);
    if (!removed) logger.warn('Could not remove temp file', filePath);
  }
});
