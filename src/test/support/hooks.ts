import { Before, After } from "@cucumber/cucumber";
import { Browser, BrowserContext, Page, chromium, firefox, webkit } from "@playwright/test";
import { ConfigManager } from '../../config/ConfigManager';

export let pageFixture: {
  browser: Browser;
  context: BrowserContext;
  page: Page;
};

Before(async function () {
  const browserName = ConfigManager.getBrowser();
  const browserType = { chromium, firefox, webkit }[browserName];
  const browser = await browserType.launch({ headless: ConfigManager.isHeadless() });
    
  const context = await browser.newContext();
  const page = await context.newPage();

  pageFixture = { browser, context, page };
});

After(async function () {
  await pageFixture.page.close();
  await pageFixture.context.close();
  await pageFixture.browser.close();
});