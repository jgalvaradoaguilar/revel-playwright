import { expect, Locator, Page } from '@playwright/test';

export class HomePage {
    readonly page: Page;
    readonly acceptCookiesButton: Locator;
    readonly loginLink: Locator;
    readonly ourCarsLink: Locator;
    
    /**
     * Constructor with elements and page
     * @param {Page} page to interact with
     */
    constructor(page: Page) {
        this.page = page;
        this.acceptCookiesButton = page.getByRole('button', { name: 'Aceptar', exact: true });
        this.loginLink = page.getByRole('link', { name: 'Login' });
        this.ourCarsLink = page.getByRole('link', { name: 'Nuestros coches' });
    }

    async navigate() {
        await this.page.goto('/');
    }

    async acceptCookies() {
        await this.acceptCookiesButton.click();
    }

    async clickLogin() {
        await this.loginLink.click();
    }

    async clickOurCars() {
        await this.ourCarsLink.click();
    }

};
