import { Page } from '@playwright/test';
import { OKTA_CREDENTIALS, SELECTORS, TIMEOUTS, PEGA_SYSTEM_URL } from '../config';

/**
 * Logt in op het Pega Labs dashboard via Okta.
 * Bevat ook de navigatie naar het dashboard.
 */
export async function loginToPegaLabs(page: Page) {
  await page.goto(PEGA_SYSTEM_URL, { waitUntil: 'load' });
  await page.waitForLoadState('networkidle');

  const usernameField = page.locator(SELECTORS.usernameField).first();
  await usernameField.waitFor({ state: 'visible' });
  await usernameField.fill(OKTA_CREDENTIALS.username);
  await usernameField.press('Enter');

  // Wacht op het Okta-wachtwoordveld
  await page.locator(SELECTORS.passwordFactorRow).waitFor({ state: 'attached', timeout: TIMEOUTS.MEDIUM });

  // Klik op "Selecteren" binnen de wachtwoordcontainer
  await page.evaluate(() => {
    const selectButton = Array.from(document.querySelectorAll('[data-se="okta_password"] a'))
      .find(el => el.textContent?.includes("Selecteren"));
    if (selectButton) {
      (selectButton as HTMLElement).click();
    }
  });

  const passwordField = page.locator(SELECTORS.passwordField).first();
  await passwordField.waitFor({ state: 'visible', timeout: TIMEOUTS.MEDIUM });
  await passwordField.fill(OKTA_CREDENTIALS.password);

  const verifyButton = page.locator(SELECTORS.verifyButton).first();
  await verifyButton.waitFor({ state: 'visible', timeout: TIMEOUTS.SHORT });
  await verifyButton.click();

  await page.waitForLoadState('networkidle');
}