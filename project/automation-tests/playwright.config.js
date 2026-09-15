import { defineConfig, devices } from '@playwright/test'
export default defineConfig({ testDir: './playwright', timeout: 30000, use: { baseURL: process.env.WEB_URL || 'https://abhishek-academy.vercel.app', trace: 'on-first-retry', screenshot: 'only-on-failure' }, reporter: [['html', { open: 'never' }]], projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }] })
