import { test, expect } from '@playwright/test';

import { HomePage } from '../pages/HomePage';
let homePage: HomePage;
import { LoginPage } from '../pages/LoginPage';
let loginPage: LoginPage;

let fs = require('fs');
let usersTest = JSON.parse(fs.readFileSync('fixtures/usersTest.json')); 

test.describe('Login Test Suite', () => {

  test.beforeEach(async ({ page }, testInfo) => {
    console.log("Test \"" + testInfo.title + "\" started at: " + new Date());

    // Create a new instance of needed pages
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);

    // Navigate to the login page before each test
    await test.step('Given the user go to login on Revel URL', async () => {
      await homePage.navigate();
      await homePage.acceptCookies();
      await homePage.clickLogin();
    });
  });

  test.afterEach(async ({ page }, testInfo) => {
    console.log("Test \"" + testInfo.title + "\" finished at: " + new Date());
  });

  test('Login successful with phone pre-set OTP', async ({ page }) => {
    await test.step('And the user login with his phone', async () => {
      console.log("Phone: " + usersTest.happyPathUser.telephone);
      await loginPage.setPhone(usersTest.happyPathUser.telephone);
      await loginPage.clickContinueButton();
    });

    /*await test.step("And the user skip humnan verification", async () => {
      await loginPage.skipHumanVerification();
    });*/

    await test.step('When the user writes the OTP received', async () => {
      console.log("OTP: " + usersTest.happyPathUser.otp);
      await loginPage.setOTP(usersTest.happyPathUser.otp);
    });

    await test.step('Then the user should be logged in successfully', async () => {
      await expect(loginPage.loginSuccessfulImage).toBeVisible();
    });
  });

   test('Login failed because a wrong OTP code', async ({ page }) => {
    await test.step('And the user login with his phone', async () => {
      console.log("Phone: " + usersTest.happyPathUser.telephone);
      await loginPage.setPhone(usersTest.happyPathUser.telephone);
      await loginPage.clickContinueButton();
    });

    /*await test.step("And the user skip humnan verification", async () => {
      await loginPage.skipHumanVerification();
    });*/

    await test.step('When the user writes a wrong OTP code', async () => {
      console.log("OTP: 1234");
      await loginPage.setOTP("1234");
    });

    await test.step('Then an error message is showed', async () => {
      await expect(loginPage.loginFailedMessage).toBeVisible();
    });
  }); 

});