import { Page, BrowserContext, Browser } from '@playwright/test';

/**
 * pageFixture holds references to current active browser, context, and page instances
 * across Cucumber step definitions.
 */
export const pageFixture = {
  // @ts-ignore
  browser: undefined as Browser,
  // @ts-ignore
  context: undefined as BrowserContext,
  // @ts-ignore
  page: undefined as Page,
};

