import { test, expect } from './support/expect';
import type { Page, BrowserContext } from '@playwright/test';
import fs from 'fs';
import { PegaLabsDashboardPage } from '../pages/pega-labs-dashboard';
import { PegaAppStudioPage } from '../pages/pega-app-studio';
import { loginToPegaLabs } from '../fixtures/helpers';
import { SELECTORS } from '../config';

// Laad .env constanten
const envContent = fs.readFileSync('.env', 'utf8');
const envVars: Record<string, string> = {};
envContent.split(/\r?\n/).forEach(line => {
  const [k, ...v] = line.split('=');
  if (k && !k.trim().startsWith('#')) envVars[k.trim()] = v.join('=').trim();
});

const PEGA_USERNAME = envVars.PEGA_USERNAME || '';
const PEGA_PASSWORD = envVars.PEGA_PASSWORD || '';

test('login test', async ({ page: initialPage, context }) => {
  test.setTimeout(90000);

  const dashboard = new PegaLabsDashboardPage(initialPage);

  // Okta-login via helper (inclusief navigatie)
  await loginToPegaLabs(initialPage);

  // Open Pega Infinity in nieuw tabblad (App Studio)
  const appPage = await dashboard.clickOpenPegaInfinity(context);
  const app = new PegaAppStudioPage(appPage);

  // Conditionele termen-acceptatie en IP-check
  await app.acceptTermsIfShown();
  await app.waitForIpCheckComplete();

  // Wacht tot het klassieke Pega Login scherm verschijnt
  await app.page.waitForLoadState('networkidle');

  // Expectly: valideer dat de inlogvelden zichtbaar zijn
  await expect(app.page.locator(SELECTORS.appUsernameField)).toBeVisible();
  await expect(app.page.locator(SELECTORS.appPasswordField)).toBeVisible();
  await expect(app.page.locator(SELECTORS.loginButton).first()).toBeEnabled();

  await app.page.screenshot({ path: 'screenshots/pega_login.png', fullPage: true });
});
