import { BeforeAll, AfterAll, Before, After, AfterStep, Status, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium, Browser, BrowserContext, Page } from '@playwright/test';
import { pageFixture } from '../fixtures/pageFixture';

// Set Cucumber step timeout to 30 seconds for stable execution
setDefaultTimeout(30000);

let browser: Browser;
let context: BrowserContext;

BeforeAll(async function () {
  // Launch Google Chrome browser as strictly required
  browser = await chromium.launch({
    channel: 'chrome',
    headless: true,
  });
  pageFixture.browser = browser;
});

Before(async function () {
  // Create clean isolated browser context & page for each test scenario
  context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
  });
  const page: Page = await context.newPage();
  pageFixture.context = context;
  pageFixture.page = page;
});

AfterStep(async function ({ pickle, result }) {
  // Capture screenshot on step failure and attach to report
  if (result?.status === Status.FAILED) {
    if (pageFixture.page) {
      const screenshot = await pageFixture.page.screenshot({
        path: `reports/screenshots/${pickle.name.replace(/[^a-zA-Z0-9]/g, '_')}.png`,
        type: 'png',
      });
      this.attach(screenshot, 'image/png');
    }
  }
});

After(async function () {
  // Teardown context and page for clean state
  if (pageFixture.page) {
    await pageFixture.page.close();
  }
  if (pageFixture.context) {
    await pageFixture.context.close();
  }
});

AfterAll(async function () {
  // Close Chrome browser instance
  if (browser) {
    await browser.close();
  }
});

