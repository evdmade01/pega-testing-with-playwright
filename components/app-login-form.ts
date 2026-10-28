import { Page, Locator } from '@playwright/test';
import { SELECTORS, TIMEOUTS } from '../config';

/**
 * Component: Pega App Studio inlogscherm (klassiek Pega Login)
 */
export class AppLoginFormComponent {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator(SELECTORS.appUsernameField).first();
    this.passwordInput = page.locator(SELECTORS.appPasswordField).first();
    this.loginButton = page.locator(SELECTORS.loginButton).first();
  }

  async fill(username: string, password: string) {
    await this.usernameInput.waitFor({ state: 'visible', timeout: TIMEOUTS.MEDIUM });
    await this.usernameInput.fill(username);

    await this.passwordInput.waitFor({ state: 'visible', timeout: TIMEOUTS.MEDIUM });
    await this.passwordInput.fill(password);
  }

  async submit() {
    await this.loginButton.waitFor({ state: 'visible', timeout: TIMEOUTS.MEDIUM });
    await this.loginButton.click();
  }
}
