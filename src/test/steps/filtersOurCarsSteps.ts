import { Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import { expect } from "@playwright/test";
import { pageFixture } from "../support/pageFixture";
import { HomePage } from '../../pages/HomePage';
import { CarsPage } from '../../pages/CarsPage';

let homePage: HomePage;
let carsPage: CarsPage;

setDefaultTimeout(60 * 1000 * 2); // 2 minutes

  Given('the user go to cars page on Revel URL', async function () {
    console.log("DELETE ME - En Given");
    homePage = new HomePage(pageFixture.page);
    console.log("DELETE ME - Despues crear homePage");
    await homePage.navigate();
    await homePage.acceptCookies();
    await homePage.clickOurCars();
  });

  When('the user clicks on filter {string}', async function (filter) {
    console.log("Filter: " + filter);
    carsPage = new CarsPage(pageFixture.page);
    await carsPage.clickFilterButton(filter);
  });

  When('the user choose the option {string}', async function (filterOption) {
    console.log("Filter option: " + filterOption);
    await carsPage.selectFilterOption(filterOption);
  });

  Then('the filter option {string} appears in the URL', async function (filterOptionInURL) {
    console.log("Filter option URL: " + filterOptionInURL);
    console.log("Page URL: " + pageFixture.page.url());
    expect(await carsPage.isPartOfTheURL("?fuelTypes=electric-hybrid")).toBeTruthy();

  });

  Then('the first car in the results page is {string} {string}', async function (firstCarModel, firstCarVersion) {
    await carsPage.goToFirstCarCard();
    console.log("First car in the results: " + await carsPage.getTextOfFirstCarCard());
    expect(await carsPage.isPartOfFirstCarCard(firstCarModel)).toBeTruthy();
    expect(await carsPage.isPartOfFirstCarCard(firstCarVersion)).toBeTruthy();
  });
