// playwright.config.js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  use: {
    headless: false,
    screenshot: 'on',
    video: 'on-first-retry',
   
  },
  reporter: [['html', { outputFolder: 'reports', open: 'never' }]],
});
