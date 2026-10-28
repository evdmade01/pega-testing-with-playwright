import { Page, Locator } from '@playwright/test';
import { SELECTORS, TIMEOUTS } from '../config';

/**
 * Component: Avatar menu (geopend via avatar knop; bevat Log off)
 */
export class AvatarMenuComponent {
  readonly page: Page;
  readonly avatarButton: Locator;
  readonly logOffButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.avatarButton = page.locator(SELECTORS.avatarButton).first();
    this.logOffButton = page.locator(SELECTORS.logOffButton).first();
  }

  async open() {
    await this.avatarButton.waitFor({ state: 'visible', timeout: TIMEOUTS.LONG });
    await this.avatarButton.click({ force: true });
  }

  async logOff() {
    await this.logOffButton.waitFor({ state: 'visible', timeout: TIMEOUTS.MEDIUM });
    await this.logOffButton.click({ force: true });
  }
}
