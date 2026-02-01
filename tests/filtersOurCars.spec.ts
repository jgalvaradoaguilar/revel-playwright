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
      await carsPage.clickFilterButton("Fuel");
    });

    await test.step('And the user choose the option "Electric Hybrid"', async () => {
      console.log("Filter option: " + "Electric Hybrid");
      await carsPage.selectFilterOption("Electric Hybrid");
    });

    await test.step('Then the filter option "?fuelTypes=electric-hybrid" appears in the URL', async () => {
      console.log("Filter option URL: " + "?fuelTypes=electric-hybrid");
      console.log("Page URL: " + page.url());
      expect(await carsPage.isPartOfTheURL("?fuelTypes=electric-hybrid")).toBeTruthy();
    });

    await test.step('And the first car in the results page is "Toyota C-HR" "220PH Advance"', async () => {
      await carsPage.carsCards.first().scrollIntoViewIfNeeded();
      console.log("First car in the results: " + await carsPage.getTextOfFirstCarCard());
      expect(await carsPage.isPartOfFirstCarCard("Toyota C-HR")).toBeTruthy();
      expect(await carsPage.isPartOfFirstCarCard("220PH Advance")).toBeTruthy();
    });
  });

  test('Verify response of the filter "Body Type" option "SUV"', async ({ page }) => {
    await test.step('When the user clicks on filter "Body Type"', async () => {
      console.log("Filter: " + "Body Type");
      await carsPage.clickFilterButton("Body Type");
    });

    await test.step('And the user choose the option "SUV"', async () => {
      console.log("Filter option: " + "SUV");
      await carsPage.selectFilterOption("SUV");
    });

    await test.step('Then the filter option "?bodyType=suv" appears in the URL', async () => {
      console.log("Filter option URL: " + "?bodyType=suv");
      console.log("Page URL: " + page.url());
      expect(await carsPage.isPartOfTheURL("?bodyType=suv")).toBeTruthy();
    });

    await test.step('And the first car in the results page is "Kia XCeed" "1.0 T-GDi Drive"', async () => {
      await carsPage.carsCards.first().scrollIntoViewIfNeeded();
      console.log("First car in the results: " + await carsPage.getTextOfFirstCarCard());
      expect(await carsPage.isPartOfFirstCarCard("Kia XCeed")).toBeTruthy();
      expect(await carsPage.isPartOfFirstCarCard("1.0 T-GDi Drive")).toBeTruthy();
    });
  });

  test('Verify response of the filters "Fuel" option "Electric Hybrid" and "Body Type" option "SUV"', async ({ page }) => {
    await test.step('When the user clicks on filter "Fuel"', async () => {
      console.log("Filter: " + "Fuel");
      await carsPage.clickFilterButton("Fuel");
    });

    await test.step('And the user choose the option "Electric Hybrid"', async () => {
      console.log("Filter option: " + "Electric Hybrid");
      await carsPage.selectFilterOption("Electric Hybrid");
    });

    await test.step('And the user clicks on filter "Body Type"', async () => {
      console.log("Filter: " + "Body Type");
      await carsPage.clickFilterButton("Body Type");
    });

    await test.step('And the user choose the option "SUV"', async () => {
      console.log("Filter option: " + "SUV");
      await carsPage.selectFilterOption("SUV");
    });    

    await test.step('Then the filters options "fuelTypes=electric-hybrid" and "bodyType=suv" appear in the URL', async () => {
      let combinedFilters = "?" + "fuelTypes=electric-hybrid" + "&" + "bodyType=suv";
      console.log("Filter option URL: " + combinedFilters);
      console.log("Page URL: " + page.url());
      expect(await carsPage.isPartOfTheURL(combinedFilters)).toBeTruthy();
    });

    await test.step('And the first car in the results page is "Toyota C-HR" "220PH Advance"', async () => {
      await carsPage.carsCards.first().scrollIntoViewIfNeeded();
      console.log("First car in the results: " + await carsPage.getTextOfFirstCarCard());
      expect(await carsPage.isPartOfFirstCarCard("Toyota C-HR")).toBeTruthy();
      expect(await carsPage.isPartOfFirstCarCard("220PH Advance")).toBeTruthy();
    });
  });  

  test('Filters without results. "Fuel: Electric Hybrid", "Body Type: SUV", "Color: Blanco"', async ({ page }) => {
    await test.step('When the user clicks on filter "Fuel"', async () => {
      console.log("Filter: " + "Fuel");
      await carsPage.clickFilterButton("Fuel");
    });

    await test.step('And the user choose the option "Electric Hybrid"', async () => {
      console.log("Filter option: " + "Electric Hybrid");
      await carsPage.selectFilterOption("Electric Hybrid");
    });

    await test.step('And the user clicks on filter "Body Type"', async () => {
      console.log("Filter: " + "Body Type");
      await carsPage.clickFilterButton("Body Type");
    });

    await test.step('And the user choose the option "SUV"', async () => {
      console.log("Filter option: " + "SUV");
      await carsPage.selectFilterOption("SUV");
    });
    
    await test.step('And the user clicks on filter "Color"', async () => {
      console.log("Filter: " + "Color");
      await carsPage.clickFilterButton("Color");
    });

    await test.step('And the user choose the option "White"', async () => {
      console.log("Filter option: " + "White");
      await carsPage.selectFilterOption("White");
    });

    await test.step('Then the filters options "fuelTypes=electric-hybrid" and "bodyType=suv" and "color=white" appear in the URL', async () => {
      let combinedFilters = "?" + "fuelTypes=electric-hybrid" + "&" + "bodyType=suv" + "&" + "color=white";
      console.log("Filter option URL: " + combinedFilters);
      console.log("Page URL: " + page.url());
      expect(await carsPage.isPartOfTheURL(combinedFilters)).toBeTruthy();
    });

    await test.step('And a message appears indicating that there are no results for the selected filters', async () => {
      expect(await carsPage.noResultsMessage.isVisible()).toBeTruthy();
    });
  });

  test('Cleaning filters. Filters "Fuel: Electric Hybrid" and "Body Type: SUV"', async ({ page }) => {
    await test.step('And the user clicks on filter "Fuel"', async () => {
      console.log("Filter: " + "Fuel");
      await carsPage.clickFilterButton("Fuel");
    });

    await test.step('And the user choose the option "Electric Hybrid"', async () => {
      console.log("Filter option: " + "Electric Hybrid");
      await carsPage.selectFilterOption("Electric Hybrid");
    });

    await test.step('And the user clicks on filter "Body Type"', async () => {
      console.log("Filter: " + "Body Type");
      await carsPage.clickFilterButton("Body Type");
    });

    await test.step('And the user choose the option "SUV"', async () => {
      console.log("Filter option: " + "SUV");
      await carsPage.selectFilterOption("SUV");
    });

    await test.step('When the user clean the filters "Fuel" and "Body Type"', async () => {
      console.log("Filter: " + "Fuel");
      await carsPage.resetFilterButton("Fuel");
      console.log("Filter: " + "Body Type");
      await carsPage.resetFilterButton("Body Type");
    });

    await test.step('Then the URL does not have any filter options', async () => {
      console.log("Page URL: " + page.url());
      expect(await carsPage.isPartOfTheURL("fuelTypes=electric-hybrid")).toBeFalsy();
      expect(await carsPage.isPartOfTheURL("bodyType=suv")).toBeFalsy();
    });

    await test.step('And the first car in the results page is "Peugeot 208" "Allure"', async () => {
      await carsPage.carsCards.first().scrollIntoViewIfNeeded();
      console.log("First car in the results: " + await carsPage.getTextOfFirstCarCard());
      expect(await carsPage.isPartOfFirstCarCard("Peugeot 208")).toBeTruthy();
      expect(await carsPage.isPartOfFirstCarCard("Allure")).toBeTruthy();
    });    
  });

});


