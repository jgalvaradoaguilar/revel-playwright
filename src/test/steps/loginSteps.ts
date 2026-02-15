import { Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { pageFixture } from '../support/hooks';
import { HomePage } from '../../pages/HomePage';
import { LoginPage } from '../../pages/LoginPage';

let homePage: HomePage;
let loginPage: LoginPage;

setDefaultTimeout(60 * 1000 * 2); // 2 minutes

Given('the user go to login on Revel URL', async function () {
  homePage = new HomePage(pageFixture.page);
  await homePage.navigate();
  await homePage.acceptCookies();
  await homePage.clickLogin();
});

When('the user login with his phone {string}', async function (phone) {
  console.log('Phone: ' + phone);
  loginPage = new LoginPage(pageFixture.page);
  await loginPage.setPhone(phone);
  await loginPage.clickContinueButton();
});

When('the user skip human verification', async function () {
  await loginPage.skipHumanVerification();
});

When('the user writes the OTP received {string}', async function (otp) {
  console.log('OTP: ' + otp);
  await loginPage.setOTP(otp);
});

Then('the user is logged successfully', async function () {
  expect(await loginPage.isVisibleLoginSuccessfulImage()).toBeTruthy();
});

Then('an error message is showed', async function () {
  expect(await loginPage.isVisibleLoginErrorMessage()).toBeTruthy();
});
