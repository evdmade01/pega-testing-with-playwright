import { Page, Locator } from '@playwright/test';
import { SELECTORS, TIMEOUTS } from '../config';

/**
 * Page Object: Pega App Studio (2de tab na Open-knop)
 */
export class PegaAppStudioPage {
  readonly page: Page;

  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly avatarButton: Locator;
  readonly logOffButton: Locator;

  readonly checkingText: Locator;
  readonly acceptTermsButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator(SELECTORS.appUsernameField).first();
    this.passwordInput = page.locator(SELECTORS.appPasswordField).first();
    this.loginButton = page.locator(SELECTORS.loginButton).first();
    this.avatarButton = page.locator(SELECTORS.avatarButton).first();
    this.logOffButton = page.locator(SELECTORS.logOffButton).first();

    this.checkingText = page.locator(SELECTORS.checkingText);
    this.acceptTermsButton = page.locator(SELECTORS.acceptTermsButton).first();
  }

  async waitForIpCheckComplete() {
    const visible = await this.checkingText
      .waitFor({ state: 'visible', timeout: TIMEOUTS.SHORT })
      .then(() => true)
      .catch(() => false);

    if (visible) {
      await this.checkingText.waitFor({ state: 'hidden', timeout: TIMEOUTS.MEDIUM });
    }
  }

  async login(username: string, password: string) {
    await this.waitForIpCheckComplete();
    await this.acceptTermsIfShown();
    await this.usernameInput.waitFor({ state: 'visible', timeout: TIMEOUTS.MEDIUM });
    await this.usernameInput.fill(username);

    await this.passwordInput.waitFor({ state: 'visible', timeout: TIMEOUTS.MEDIUM });
    await this.passwordInput.fill(password);

    await this.loginButton.waitFor({ state: 'visible', timeout: TIMEOUTS.MEDIUM });
    await this.loginButton.click();
  }

  async acceptTermsIfShown() {
    const shown = await this.acceptTermsButton
      .waitFor({ state: 'visible', timeout: TIMEOUTS.SHORT })
      .then(() => true)
      .catch(() => false);

    if (shown) {
      await this.acceptTermsButton.click({ force: true });
    }
  }

  async waitForLoggedIn() {
    await this.avatarButton.waitFor({ state: 'visible', timeout: TIMEOUTS.LONG });
  }

  async logOff() {
    await this.avatarButton.waitFor({ state: 'visible', timeout: TIMEOUTS.LONG });
    await this.avatarButton.click({ force: true });

    await this.logOffButton.waitFor({ state: 'visible', timeout: TIMEOUTS.MEDIUM });
    await this.logOffButton.click({ force: true });
  }
}
