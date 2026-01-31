import { expect, Locator, Page } from '@playwright/test';

export class ExamplePage {
    readonly page: Page;
    readonly getStartedLink: Locator;
    readonly installationHeading: Locator;

    /**
     * Constructor with elements and page
     * @param {Page} page to interact with
     */
    constructor(page: Page) {
        this.page = page;
        this.getStartedLink = page.getByRole('link', { name: 'Get started' });
        this.installationHeading = page.getByRole('heading', { name: 'Installation' });
    }

    async navigate() {
        await this.page.goto('/');
    }

    async clickGetStarted() {
        await this.getStartedLink.click();
    }

    async isVisibleInstallationHeading() {
        return this.installationHeading.isVisible;
    }

    // Page shouldn't have expectations, but helper methods to verify states are acceptable
    async verifyInstallationHeadingVisible() {
        await expect(this.installationHeading).toBeVisible();
    }

    // Page shouldn't have expectations, but helper methods to verify states are acceptable
    async verifyPageTitle(expectedTitle: string|RegExp) {
        await expect(this.page).toHaveTitle(expectedTitle);
    }

};
