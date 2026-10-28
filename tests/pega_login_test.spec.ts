import { test, expect } from './support/expect';
import { PegaLabsDashboardPage } from '../pages/pega-labs-dashboard';
import { PegaAppStudioPage } from '../pages/pega-app-studio';
import { loginToPegaLabs } from '../fixtures/helpers';
import { APP_CREDENTIALS } from '../config';

test('login after opening Pega Infinity', async ({ context, page }) => {
  test.setTimeout(180000);

  const dashboard = new PegaLabsDashboardPage(page);
  await loginToPegaLabs(page);

  const appPage = await dashboard.clickOpenPegaInfinity(context);
  const app = new PegaAppStudioPage(appPage);

  await app.login(APP_CREDENTIALS.username, APP_CREDENTIALS.password);
  await app.waitForLoggedIn();

  // Expectly: valideer dat de App Studio pagina geladen is
  await expect(app.page).toHaveTitle(/Pega App Studio/);

  await app.page.screenshot({ path: 'screenshots/pega_app_studio.png', fullPage: true });
});
