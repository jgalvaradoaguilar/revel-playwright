import { Page } from '@playwright/test';
import { HomeLocators } from '../support/locators/HomeLocators';
import { ConfigManager } from '../config/ConfigManager';

export class HomePage {
    private page: Page;
    private homeLocators: HomeLocators;
    
    /**
     * Constructor
     * @param {Page} page to interact with
     */
    constructor(page: Page) {
        this.page = page;
        this.homeLocators = new HomeLocators(page);
    }

    async navigate() {
        await this.page.goto(`${ConfigManager.getBaseUIUrl()}/`);
        await this.page.waitForLoadState('load');
    }

    async acceptCookies() {
        await this.homeLocators.acceptCookiesButton.click();
    }

    async clickLogin() {
        await this.homeLocators.loginLink.click();
    }

    async clickOurCars() {
        await this.homeLocators.ourCarsLink.click();
    }

};
