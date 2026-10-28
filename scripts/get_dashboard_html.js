import { chromium } from 'playwright';
import * as fs from 'fs';
(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    // Pas de time-out aan omdat Pega traag kan laden
    page.setDefaultTimeout(90000);
    // Navigeer naar de Pega Labs omgeving
    await page.goto('https://pegalabs.pega.com/ui/system/2225d0ca-5d3d-40d6-a808-bf50dbced761');
    // Wacht tot de pagina stabiel is geladen
    await page.waitForLoadState('networkidle');
    // 1. Typ de gebruikersnaam
    const usernameField = page.locator('input[type="text"], input[type="email"], #txtUserID').first();
    await usernameField.waitFor({ state: 'visible' });
    await usernameField.fill('erikvandermade@valori.nl');
    // 2. Druk op 'Enter' in plaats van te klikken. 
    // Omdat het een type="submit" is, dwingt dit het formulier onmiddellelijk te verzenden.
    await usernameField.press('Enter');
    // 3. Wacht tot het Okta-keuzemenu voor authenticatie verschijnt
    // We zoeken specifiek naar de container voor het wachtwoord
    const passwordFactorRow = page.locator('[data-se="okta_password"]');
    await passwordFactorRow.waitFor({ state: 'visible', timeout: 15000 });
    // 4. Klik op de "Selecteren"-knop binnen de Wachtwoord-container
    // Hiermee openen we pas het daadwerkelijke wachtwoord-invoerveld
    await passwordFactorRow.locator('a:has-text("Selecteren")').click();
    // 5. Wacht nu tot het échte Wachtwoord-invoerveld verschijnt en vul het in
    const passwordField = page.locator('input[type="password"], #txtPassword, input[name="password"]').first();
    await passwordField.waitFor({ state: 'visible', timeout: 15000 });
    await passwordField.fill('Casper01!');
    // 6. Klik op de definitieve "Verifiëren" knop
    // We zoeken naar de knop met de tekst 'Verifiëren' (werkt voor buttons en inputs)
    const verifyButton = page.locator('input[value="Verifiëren"], button:has-text("Verifiëren"), .button-primary').first();
    await verifyButton.waitFor({ state: 'visible', timeout: 10000 });
    await verifyButton.click();
    // 7. Wacht even om te zien of het inloggen slaagt
    await page.waitForLoadState('networkidle');
    await page.waitForLoadState('networkidle'); // Herhaal voor extra stabiliteit
    // Sla de HTML op
    const htmlContent = await page.content();
    fs.writeFileSync('html/dashboard.html', htmlContent);
    console.log('HTML van dashboardpagina opgeslagen in html/dashboard.html');
    await browser.close();
})();
