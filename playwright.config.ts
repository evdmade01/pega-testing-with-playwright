import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // Best practice: retries voor flaky externe systemen (Pega)
  retries: process.env.CI ? 2 : 1,

  // Best practice: screenshots bij falen + video/trace bij eerste retry
  use: {
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'on-first-retry',
    locale: 'nl-NL',
    timezoneId: 'Europe/Amsterdam',
  },

  // Best practice: reporter HTML direct beschikbaar + lijst
  reporter: [
    ['list'],
    ['html', { open: 'never', outputFolder: 'playwright-report' }],
  ],

  // Best practice: project-structuur voor verschillende browsers
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  // Best practice: test-tijdlimiet voor lange externe flows
  timeout: 180000,
});
