import { expect, Locator, Page } from '@playwright/test';
import { LoginLocators } from '../support/locators/LoginLocators';
import { ConfigManager } from '../config/ConfigManager';

export class LoginPage {
    readonly page: Page;
    private loginLocators: LoginLocators;
    
    /**
     * Constructor
     * @param {Page} page to interact with
     */
    constructor(page: Page) {
        this.page = page;
        this.loginLocators = new LoginLocators(page);
    }

    async setPhone(telephone: string) {
        await this.loginLocators.phoneInput.click();
        //await this.page.keyboard.type(telephone);
        await this.loginLocators.phoneInput.fill(telephone);
    }

    async clickContinueButton() {
        await this.loginLocators.continueButton.hover();
        await this.loginLocators.continueButton.click();
    }

    async skipHumanVerification() {
        await this.loginLocators.skipButton.click();
    }

    async setOTP(otp: string) {
        await this.loginLocators.otpInput.fill(otp);
    }

};
