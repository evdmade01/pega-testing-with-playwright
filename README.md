# 🎭 Playwright Pega Labs Tests

End-to-end Playwright tests for Pega Labs applications, including Pega Infinity App Studio login and log-off flows.

## Project Structure

```
├── tests/                 # Test specifications
│   ├── example.spec.ts             # Playwright smoke tests
│   ├── login.spec.ts               # Pega Infinity login flow
│   ├── log_off_test.spec.ts        # Log-off from App Studio (2nd tab)
│   ├── pega_login_test.spec.ts     # Pega Infinity login after opening
│   └── support/                    # Shared test support module
│       └── expect.ts               # Extended expect with matchers
├── pages/                  # Page Object Model classes
│   ├── pega-app-studio.ts          # App Studio page object
│   └── pega-labs-dashboard.ts      # Pega Labs Dashboard page object
├── fixtures/               # Custom Playwright fixtures
│   └── helpers.ts                  # loginToPegaLabs helper
├── config/                 # Central configuration
│   └── index.ts                  # URLs, selectors, credentials, timeouts
├── test-results/           # Screenshots, videos, traces from test runs
├── playwright-report/      # HTML report generated after execution
├── screenshots/            # Additional screenshots
├── playwright.config.ts    # Playwright configuration
├── package.json            # Project dependencies
└── tsconfig.json           # TypeScript configuration
```

## Running Tests

Run all tests in headed mode with one worker:

```bash
npx playwright test --headed --workers=1
```

Run a specific test file:

```bash
npx playwright test tests/log_off_test.spec.ts
```

View the HTML report after a run:

```bash
npx playwright show-report
```

View test results from a specific run:

```bash
npx playwright show-trace test-results/<test-name>/trace.zip
```

## Configuration

All URLs, selectors, credentials, and timeouts are centralized in `config/index.ts`. Environment variables (e.g. `OKTA_USERNAME`, `APP_USERNAME`, `APP_PASSWORD`) are loaded from `.env`.

## Page Objects

- **`PegaLabsDashboardPage`** — Handles Pega Labs dashboard navigation, VM start (Power On), and opening Pega Infinity in a new tab.
- **`PegaAppStudioPage`** — Handles App Studio login, waiting for logged-in state, accepting terms if shown, IP check completion, and log-off.

## Test Support

All test files should import `test` and `expect` from `./support/expect` rather than directly from `@playwright/test`. This module extends Playwright's `expect` with matchers from `@cerios/playwright-expectly`.

## Test Files

| File | Description |
|------|-------------|
| `example.spec.ts` | Basic Playwright smoke tests (title, navigation link) |
| `login.spec.ts` | Pega Infinity login flow via Okta |
| `log_off_test.spec.ts` | Log-off from App Studio opened in 2nd tab |
| `pega_login_test.spec.ts` | Login after opening Pega Infinity |

## License

MIT