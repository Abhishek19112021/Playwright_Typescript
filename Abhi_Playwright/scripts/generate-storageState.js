const { chromium, request } = require('playwright');
const fs = require('fs');
const path = require('path');

// Config - prefer environment variables for CI/secure runs
const BASE_URL = process.env.BASE_URL || 'https://rahulshettyacademy.com';
const LOGIN_API = `${BASE_URL}/api/ecom/auth/login`;
const CREDENTIALS = {
  userEmail: process.env.AUTH_EMAIL || process.env.USER_EMAIL || 'abcd@abhi.com',
  userPassword: process.env.AUTH_PASSWORD || process.env.USER_PASSWORD || 'Abc@987654321',
};

if (!CREDENTIALS.userEmail || !CREDENTIALS.userPassword) {
  console.error('Missing credentials: set AUTH_EMAIL and AUTH_PASSWORD as env vars');
  process.exit(1);
}

async function getToken() {
  const req = await request.newContext();
  const resp = await req.post(LOGIN_API, { data: CREDENTIALS });
  if (resp.status() !== 200) {
    throw new Error(`Login failed: ${resp.status()}`);
  }
  const body = await resp.json();
  await req.dispose();
  return body.token;
}

(async () => {
  try {
    const token = await getToken();
    const outDir = path.resolve(__dirname, '..', 'auth');
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

    const browser = await chromium.launch();
    const context = await browser.newContext();
    await context.addInitScript((value) => {
      globalThis.localStorage.setItem('token', value);
    }, token);
    const page = await context.newPage();
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    const storagePath = path.join(outDir, 'storageState.json');
    await context.storageState({ path: storagePath });
    await browser.close();
    console.log('storageState saved to', storagePath);
  } catch (err) {
    console.error('Failed to generate storageState:', err);
    process.exit(1);
  }
})();
