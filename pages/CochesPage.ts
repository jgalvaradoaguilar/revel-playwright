import { expect, Locator, Page } from '@playwright/test';

export class CochesPage {
    readonly page: Page;
    readonly fuelFilterButton: Locator;
    readonly acceptCookiesButton: Locator;
    readonly loginLink: Locator;
    
    /**
     * Constructor with elements and page
     * @param {Page} page to interact with
     */
    constructor(page: Page) {
        this.page = page;
        this.acceptCookiesButton = page.getByRole('button', { name: 'Aceptar', exact: true });
        this.loginLink = page.getByRole('link', { name: 'Login' });
        this.fuelFilterButton = page.locator('button[data-filter="fuel"]');
    }

    async clickFuelFilterButton() {
        await this.fuelFilterButton.click();
    }

    async acceptCookies() {
        await this.acceptCookiesButton.click();
    }

    async clickLogin() {
        await this.loginLink.click();
    }

};
