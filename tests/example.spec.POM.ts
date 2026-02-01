import { test, expect } from '@playwright/test';

import { ExamplePage } from '../pages/ExamplePage';
let examplePage: ExamplePage;

test.describe('Example Test Suite', () => {

  test.beforeEach(async ({ page }, testInfo) => {
    console.log("Test \"" + testInfo.title + "\" started at: " + new Date());

    // Create a new instance of ExamplePage
    examplePage = new ExamplePage(page);

    // Navigate to the login page before each test
    await test.step('Given the user go to URL beforeEach', async () => {
      await examplePage.navigate();
    });
  });

  test.afterEach(async ({ page }, testInfo) => {
    console.log("Test \"" + testInfo.title + "\" finished at: " + new Date());
  });

  test('User go to Playwright page', async ({ page }) => {
    await test.step('Then the user can see the page', async () => {
      await examplePage.verifyPageTitle(/Playwright/);
    });
  });


  test('Get started link', async ({ page }) => {
    await test.step('When the user click the get started link', async () => {
      await examplePage.clickGetStarted();
    });

    await test.step("Then the page has a heading with the name of Installation", async () => {
      expect(examplePage.isVisibleInstallationHeading()).toBeTruthy();
      //await examplePage.verifyInstallationHeadingVisible();
    });
  });

});


