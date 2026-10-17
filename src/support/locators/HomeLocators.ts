import { Page, Locator } from '@playwright/test';

export class HomeLocators {
  readonly acceptCookiesButton: Locator;
  readonly loginLink: Locator;
  readonly ourCarsLink: Locator;

    /**
     * Constructor with elements and page
     * @param {Page} page to interact with
     */
    constructor(page: Page) {
        this.acceptCookiesButton = page.getByRole('button', { name: 'Aceptar', exact: true });
        this.loginLink = page.getByRole('link', { name: 'Login' });
        this.ourCarsLink = page.getByRole('link', { name: 'Nuestros coches' });
    }

}