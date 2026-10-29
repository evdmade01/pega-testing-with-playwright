/**
 * Centrale configuratie voor Pega Labs tests.
 * Geen harde codering in tests of page objects.
 */
import dotenv from 'dotenv';
dotenv.config();

export const PEGA_SYSTEM_URL =
  'https://pegalabs.pega.com/ui/system/2225d0ca-5d3d-40d6-a808-bf50dbced761';

export const PEGA_APP_URL =
  'https://pegalabs.pega.com/ui/allow-ip/2225d0ca-5d3d-40d6-a808-bf50dbced761?target=app&guest=false';

/** Okta-credentials voor toegang tot het Pega Labs dashboard */
export const OKTA_CREDENTIALS = {
  username: process.env.OKTA_USERNAME || '',
  password: process.env.OKTA_PASSWORD || '',
} as const;

/** App-credentials voor inloggen in Pega App Studio */
export const APP_CREDENTIALS = {
  username: process.env.APP_USERNAME || '',
  password: process.env.APP_PASSWORD || '',
} as const;

/** Timeouts (seconden) */
export const TIMEOUTS = {
  SHORT: 10_000,
  MEDIUM: 30_000,
  LONG: 60_000,
  VERY_LONG: 300_000,
  VM_START: 900_000,
} as const;

/** Gebruikte locators (data-test-id of specifieke selectors) */
export const SELECTORS = {
  // Dashboard
  usernameField: 'input[type="text"], input[type="email"], #txtUserID',
  passwordFactorRow: '[data-se="okta_password"]',
  passwordField: 'input[type="password"], #txtPassword, input[name="password"]',
  verifyButton: 'input[value="Verifiëren"], button:has-text("Verifiëren"), .button-primary',
  openButton: 'button:has-text("Open"), a:has-text("Open")',
  powerOnButton: 'button:has-text("Power On"), a:has-text("Power On")',
  pegaInfinityStatus: ':text("Pega Infinity") >> xpath=.. >> :text("Up")',
  pegaInfinityOpenButton:
    ':text("Pega Infinity") >> xpath=.. >> button:has-text("Open"), :text("Pega Infinity") >> xpath=.. >> a:has-text("Open")',

  // App Studio
  appUsernameField: 'input#txtUserID, input[placeholder="User name"]',
  appPasswordField: 'input#txtPassword',
  loginButton: 'button:has-text("Log in"), input[value="Log in"]',
  loginButtonFirst: 'button:has-text("Log in"), input[value="Log in"]',
  avatarButton: 'button[title="erik.van.der.made"], [data-test-id="px-opr-image-ctrl"]',
  logOffButton: ':text("Log off")',

  // IP-check / Terms
  checkingText: ':text("Checking if your computer is allowed to access this lab...")',
  acceptTermsButton:
    'button:has-text("Accept the Pega Labs terms and conditions"), a:has-text("Accept the Pega Labs terms and conditions")',
} as const;