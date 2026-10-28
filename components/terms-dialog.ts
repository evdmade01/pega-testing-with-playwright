import { Page, Locator } from '@playwright/test';
import { SELECTORS, TIMEOUTS } from '../config';

/**
 * Component: Terms-dialog (Pega Labs voorwaarden) en IP-check scherm
 */
export class TermsDialogComponent {
  readonly page: Page;
  readonly acceptButton: Locator;
  readonly checkingText: Locator;

  constructor(page: Page) {
    this.page = page;
    this.acceptButton = page.locator(SELECTORS.acceptTermsButton).first();
    this.checkingText = page.locator(SELECTORS.checkingText);
  }

  async acceptIfShown() {
    const shown = await this.acceptButton
      .waitFor({ state: 'visible', timeout: TIMEOUTS.SHORT })
      .then(() => true)
      .catch(() => false);

    if (shown) {
      await this.acceptButton.click({ force: true });
    }
    return shown;
  }

  async waitForIpCheckComplete() {
    const visible = await this.checkingText
      .waitFor({ state: 'visible', timeout: TIMEOUTS.SHORT })
      .then(() => true)
      .catch(() => false);

    if (visible) {
      await this.checkingText.waitFor({ state: 'hidden', timeout: TIMEOUTS.MEDIUM });
    }
    return visible;
  }
}
