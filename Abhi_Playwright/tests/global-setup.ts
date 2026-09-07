import { FullConfig, chromium } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
import config from './config';
import { info, warn } from './utils/logger';

export default async function globalSetup(configFull: FullConfig) {
  const storageDir = path.join(process.cwd(), 'test-storage');
  if (!fs.existsSync(storageDir)) fs.mkdirSync(storageDir, { recursive: true });
  const authFile = path.join(storageDir, 'storageState.json');

  // If login credentials are provided, perform a login and store storageState
  if (config.login.url && config.login.username && config.login.password) {
    info('Performing global login flow', { url: config.login.url });
    const maxAttempts = 3;
    let success = false;
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      const browser = await chromium.launch({ headless: process.env.HEADLESS !== 'false' });
      const page = await browser.newPage();
      try {
        await page.goto(config.login.url, { timeout: 30000 });
        await page.fill(config.login.usernameSelector, config.login.username);
        await page.fill(config.login.passwordSelector, config.login.password);
        await page.click(config.login.submitSelector);

        if (config.login.postLoginSelector) {
          await page.waitForSelector(config.login.postLoginSelector, { timeout: 10000 });
        } else {
          // wait for navigation or a short delay
          await page.waitForTimeout(2000);
        }

        await page.context().storageState({ path: authFile });
        info('Saved storageState to', { authFile });
        success = true;
        await browser.close();
        break;
      } catch (e) {
        warn(`Global login attempt ${attempt} failed`, { error: String(e) });
        // capture artifacts to help debugging
        try {
          const logsDir = path.join(process.cwd(), 'test-logs');
          if (!fs.existsSync(logsDir)) fs.mkdirSync(logsDir, { recursive: true });
          const name = `global-setup-attempt-${attempt}-${Date.now()}`;
          const ss = path.join(logsDir, `${name}.png`);
          const html = path.join(logsDir, `${name}.html`);
          await page.screenshot({ path: ss }).catch(() => {});
          await fs.writeFileSync(html, await page.content());
          warn('Saved debug artifacts', { ss, html });
        } catch (ee) {
          // ignore
        }
        try { await browser.close(); } catch(_){}
      }
    }
    if (!success) {
      warn('Global login failed after attempts, creating empty storageState');
      fs.writeFileSync(authFile, JSON.stringify({}));
    }
  } else {
    info('No login credentials provided; creating placeholder storageState');
    if (!fs.existsSync(authFile)) fs.writeFileSync(authFile, JSON.stringify({}));
  }

  process.env.TEST_STORAGE_STATE = authFile;
}
