/**
 * Shared test support module that extends Playwright's `expect` with Expectly matchers.
 * All test files should import `expect` and `test` from this module instead of "@playwright/test".
 */
import "@cerios/playwright-expectly";

import { expectlyMatchers } from "@cerios/playwright-expectly";
import { expect as baseExpect, test as base } from "@playwright/test";

// MUST capture the return value — never call `.extend()` and discard it.
export const expect = baseExpect.extend(expectlyMatchers);
export const test = base;