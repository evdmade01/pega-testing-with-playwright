import { Page, Locator } from '@playwright/test';
import { SELECTORS, TIMEOUTS } from '../config';

/**
 * Component: Okta login formulier (op Pega Labs dashboard)
 */
export class OktaLoginComponent {
  readonly page: Page;
  readonly usernameField: Locator;
  readonly passwordFactorRow: Locator;
  readonly passwordField: Locator;
  readonly verifyButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameField = page.locator(SELECTORS.usernameField).first();
    this.passwordFactorRow = page.locator(SELECTORS.passwordFactorRow);
    this.passwordField = page.locator(SELECTORS.passwordField).first();
    this.verifyButton = page.locator(SELECTORS.verifyButton).first();
  }

  async fillUsername(username: string) {
    await this.usernameField.waitFor({ state: 'visible', timeout: TIMEOUTS.MEDIUM });
    await this.usernameField.fill(username);
    await this.usernameField.press('Enter');
  }

  async selectPasswordFactor() {
    await this.passwordFactorRow.waitFor({ state: 'attached', timeout: TIMEOUTS.MEDIUM });
    await this.page.evaluate(() => {
      const selectButton = Array.from(document.querySelectorAll('[data-se="okta_password"] a'))
        .find(el => el.textContent?.includes('Selecteren'));
      if (selectButton) {
        (selectButton as HTMLElement).click();
      }
    });
  }

  async fillPassword(password: string) {
    await this.passwordField.waitFor({ state: 'visible', timeout: TIMEOUTS.MEDIUM });
    await this.passwordField.fill(password);
  }

  async verify() {
    await this.verifyButton.waitFor({ state: 'visible', timeout: TIMEOUTS.SHORT });
    await this.verifyButton.click();
  }
}
