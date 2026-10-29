import { test as base, expect } from '@playwright/test';
import type { Page, BrowserContext } from '@playwright/test';
import { PegaLabsDashboardPage } from '../pages/pega-labs-dashboard';
import { PegaAppStudioPage } from '../pages/pega-app-studio';

export interface PegaFixtures {
  pegaDashboard: PegaLabsDashboardPage;
  pegaApp: PegaAppStudioPage;
}

export const test = base.extend<PegaFixtures>({
  pegaDashboard: async ({ page }, use) => {
    const dashboard = new PegaLabsDashboardPage(page);
    await use(dashboard);
  },

  pegaApp: async ({ page }, use) => {
    // Pega App Studio wordt pas gemaakt na het openen van een nieuw tabblad,
    // dus hier gebruiken we een placeholder die de gebruiker overschrijft
    const app = new PegaAppStudioPage(page);
    await use(app);
  },
});

export { expect };
