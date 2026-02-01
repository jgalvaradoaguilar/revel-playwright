import { test, expect } from '@playwright/test';

import { HomePage } from '../pages/HomePage';
let homePage: HomePage;
import { CarsPage } from '../pages/CarsPage';
let carsPage: CarsPage;

test.describe('Filters Our Cars Test Suite', () => {

  test.beforeEach(async ({ page }, testInfo) => {
    console.log("Test \"" + testInfo.title + "\" started at: " + new Date());

    // Create a new instance of needed pages
    homePage = new HomePage(page);
    carsPage = new CarsPage(page);

    // Navigate to cars page before each test
    await test.step('Given the user go to cars page on Revel URL', async () => {
      await homePage.navigate();
      await homePage.acceptCookies();
      await homePage.clickOurCars();
    });
  });

  test.afterEach(async ({ page }, testInfo) => {
    console.log("Test \"" + testInfo.title + "\" finished at: " + new Date());
  });

  test('Verify response of the filter "Fuel" option "Electric Hybrid"', async ({ page }) => {
    await test.step('When the user clicks on filter "Fuel"', async () => {
      console.log("Filter: " + "Fuel");
      await carsPage.clickFuelFilterButton();
    });

    await test.step('And the user choose the option "Electric Hybrid"', async () => {
      console.log("Filter option: " + "Electric Hybrid");
      await carsPage.selectFuelElectricHybrid();
    });

    await test.step('Then the filter option "?fuelTypes=electric-hybrid" appears in the URL', async () => {
      console.log("Filter option URL: " + "?fuelTypes=electric-hybrid");
      console.log("Page URL: " + page.url());
      expect(page.url()).toContain("?fuelTypes=electric-hybrid");
    });

    await test.step('And the first car in the results page is "Toyota C-HR" "220PH Advance"', async () => {
      carsPage.carsCards.first().scrollIntoViewIfNeeded();
      console.log("First car in the results: " + await carsPage.getTextOfFirstCarCard());
      expect(await carsPage.getTextOfFirstCarCard()).toContain("Toyota C-HR");
      expect(await carsPage.getTextOfFirstCarCard()).toContain("220PH Advance");
    });
  });

  test('Verify response of the filter "Car Type" option "SUV"', async ({ page }) => {
    await test.step('When the user clicks on filter "Car Type"', async () => {
      console.log("Filter: " + "Car Type");
      await carsPage.clickBodyTypeFilterButton();
    });

    await test.step('And the user choose the option "SUV"', async () => {
      console.log("Filter option: " + "SUV");
      await carsPage.selectBodyTypeSUV();
    });

    await test.step('Then the filter option "?bodyType=suv" appears in the URL', async () => {
      console.log("Filter option URL: " + "?bodyType=suv");
      console.log("Page URL: " + page.url());
      expect(page.url()).toContain("?bodyType=suv");
    });

    await test.step('And the first car in the results page is "Kia XCeed" "1.0 T-GDi Drive"', async () => {
      carsPage.carsCards.first().scrollIntoViewIfNeeded();
      console.log("First car in the results: " + await carsPage.getTextOfFirstCarCard());
      expect(await carsPage.getTextOfFirstCarCard()).toContain("Kia XCeed");
      expect(await carsPage.getTextOfFirstCarCard()).toContain("1.0 T-GDi Drive");
    });
  });

});


