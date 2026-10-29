import { Page, Locator, BrowserContext } from '@playwright/test';
import { PEGA_SYSTEM_URL, SELECTORS, TIMEOUTS } from '../config';
import { OktaLoginComponent } from '../components/okta-login';

/**
 * Page: Pega Labs Dashboard (na Okta-login)
 * Lichte coordinatielaag die de OktaLoginComponent en de Open-knop compositen.
 */
export class PegaLabsDashboardPage {
  readonly page: Page;
  readonly oktaLogin: OktaLoginComponent;
  readonly openButton: Locator;
  readonly pegaInfinityStatus: Locator;
  readonly pegaInfinityOpenButton: Locator;
  readonly pegaInfinityPowerOnButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.oktaLogin = new OktaLoginComponent(page);
    this.openButton = page.locator(SELECTORS.openButton).first();
    this.pegaInfinityStatus = page.locator(SELECTORS.pegaInfinityStatus);
    this.pegaInfinityOpenButton = page.locator(SELECTORS.pegaInfinityOpenButton).first();
    this.pegaInfinityPowerOnButton = page.locator(SELECTORS.powerOnButton).first();
  }

  async goto() {
    await this.page.goto(PEGA_SYSTEM_URL);
    await this.page.waitForLoadState('networkidle');
  }

  async isVMUp(): Promise<boolean> {
    return await this.pegaInfinityStatus.isVisible({ timeout: TIMEOUTS.LONG }).catch(() => false);
  }

  async clickOpenPegaInfinity(context: BrowserContext): Promise<Page> {
    // Stap 1: Start de VM via de Power On-knop als deze zichtbaar is
    try {
      await this.pegaInfinityPowerOnButton.waitFor({ state: 'visible', timeout: TIMEOUTS.SHORT });
      await this.pegaInfinityPowerOnButton.click({ force: true });
      console.log('Power On-knop aangeklikt, wacht op VM-start...');
    } catch {
      // Power On-knop niet zichtbaar — VM is mogelijk al aan het opstarten of al draaiend
      console.log('Power On-knop niet zichtbaar, controleer VM-status...');
    }

    // Stap 2: Wacht tot de VM-status 'Up' toont (max 15 minuten)
    await this.pegaInfinityStatus.waitFor({ state: 'visible', timeout: TIMEOUTS.VM_START });
    console.log('VM is gereed (status: Up).');

    // Stap 3: Open Pega Infinity in een nieuw tabblad
    await this.pegaInfinityOpenButton.waitFor({ state: 'visible', timeout: TIMEOUTS.MEDIUM });

    const [newPage] = await Promise.all([
      context.waitForEvent('page', { timeout: TIMEOUTS.MEDIUM }),
      this.pegaInfinityOpenButton.click({ force: true }),
    ]);
    await newPage.waitForLoadState('networkidle');
    return newPage;
  }
}