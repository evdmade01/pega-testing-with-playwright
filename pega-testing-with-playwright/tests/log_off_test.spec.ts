import { test, expect } from './support/expect';
import { PegaLabsDashboardPage } from '../pages/pega-labs-dashboard';
import { PegaAppStudioPage } from '../pages/pega-app-studio';
import { loginToPegaLabs } from '../fixtures/helpers';
import { APP_CREDENTIALS } from '../config';

test('log off from Pega App (2de tab - App Studio actief)', async ({ context, page }) => {
  test.setTimeout(180000);

  const dashboard = new PegaLabsDashboardPage(page);
  await loginToPegaLabs(page);

  const appPage = await dashboard.clickOpenPegaInfinity(context);
  const app = new PegaAppStudioPage(appPage);

  await app.login(APP_CREDENTIALS.username, APP_CREDENTIALS.password);
  await app.waitForLoggedIn();

  // Expectly: valideer dat de gebruiker is ingelogd
  await expect(app.page.locator('button[title="erik.van.der.made"]')).toBeVisible();

  await app.logOff();
  console.log('Log off uitgevoerd in 2de tab (App Studio actief).');

  // Blijf 3 seconden staan op het Pega Login scherm na uitloggen
  await app.page.waitForTimeout(3000);
  console.log('3 seconden op Pega Login scherm gewacht — test sessie beëindigd.');

  await app.page.screenshot({ path: 'screenshots/log_off_done.png', fullPage: true });
});
