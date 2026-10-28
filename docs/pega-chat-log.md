# Chat Log: Pega Labs Login Test

**Datum:** 22 oktober 2025  
**Project:** playwright-agent (C:/Temp/playwright-agent)  
**Doel:** Login-test uitvoeren in Pega Labs omgeving met Playwright

---

## Samenvatting

De test in `tests/login.spec.ts` navigeert door de volgende stappen:

1. Navigeert naar de Pega Labs systeemdashboard
2. Logt in via Okta (gebruikersnaam + wachtwoord)
3. Wacht tot de virtuele machine (Pega Infinity) de status "Up" heeft
4. Klikt op de "Open" knop voor Pega Infinity (opent nieuw tabblad)
5. Klikt op "Accept the Pega Labs terms and conditions"
6. Wacht tot de IP-check ("Checking if your computer is allowed to access this lab...") is voltooid
7. Eindigt op het klassieke Pega Login scherm

---

## Belangrijke wijzigingen

### 1. Nieuw tabblad hanteren (`context.waitForEvent('page')`)

Na het klikken op "Open" voor Pega Infinity wordt een nieuw tabblad geopend. De test wacht hierop met `context.waitForEvent('page')` en schakelt vervolgens naar dat tabblad:

```ts
const [newPage] = await Promise.all([
  context.waitForEvent('page', { timeout: 30000 }),
  pegaInfinityOpenButton.click({ force: true }),
]);
await newPage.waitForLoadState('networkidle');
page = newPage;
```

### 2. Wachten op IP-check voltooiing

Na het klikken op "Accept the Pega Labs terms and conditions" wordt eerst een IP-check uitgevoerd. De test wacht tot de tekst "Checking if your computer is allowed to access this lab..." verdwijnt:

```ts
const checkingText = page.locator(':text("Checking if your computer is allowed to access this lab...")');
await checkingText.waitFor({ state: 'hidden', timeout: 60000 });
```

---

## Test resultaat

| Status | Aantal |
|--------|--------|
| Passed | 1 |

**Duur:** ~17 seconden (exclusief VM starttijd)  
**Screenshot:** `screenshots/pega_login.png`

---

## Bestanden

- `tests/login.spec.ts` — De test code
- `screenshots/pega_login.png` — Screenshot van het Pega Login scherm
- `docs/pega-chat-log.md` — Dit bestand