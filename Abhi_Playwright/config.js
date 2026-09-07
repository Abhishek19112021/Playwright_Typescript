module.exports = {
  baseUrl: 'https://example.com',
  timeout: 100000,
  browsers: ['chromium'],
  retries: 0,
  headless: true,
  reporter: [['list'], ['html', { outputFolder: 'playwright-report' }]],
};
