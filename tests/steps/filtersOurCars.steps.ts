import { Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import { expect } from "@playwright/test";
import { HomePage } from '../../pages/HomePage';
let homePage: HomePage;
import { CarsPage } from '../../pages/CarsPage';
let carsPage: CarsPage;

setDefaultTimeout(15 * 1000);
// Create a new instance of needed pages
homePage = new HomePage(page);
carsPage = new CarsPage(page);

  Given('Given the user go to cars page on Revel URL', async function () {
    await pageFixture.page.goto("https://www.revel.com/our-cars");
    await pageFixture.page.locator("button:has-text('Accept All Cookies')").click();
  });

  When('the user clicks on filter {string}', async function (filter) {
    await pageFixture.page.locator("button[color='primary']").click();
  });

  When('the user choose the option {string}', async function (option) {
    await pageFixture.page.locator("mat-option:has-text('" + option + "')").click();
  });

  Then('the filter option {string} appears in the URL', async function (filterOptionInURL) {   
   const cartBadgeCount = await pageFixture.page.locator("#mat-badge-content-0").textContent();    
   await pageFixture.page.waitForTimeout(2000);
   expect(Number(cartBadgeCount)).toBeGreaterThan(0);
  });

  Then('the first car in the results page is {string} {string}', async function (firstCarModel, firstCarVersion) {   
   const cartBadgeCount = await pageFixture.page.locator("#mat-badge-content-0").textContent();    
   await pageFixture.page.waitForTimeout(2000);
   expect(Number(cartBadgeCount)).toBeGreaterThan(0);
  });