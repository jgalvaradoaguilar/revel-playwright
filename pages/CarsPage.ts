import { expect, Locator, Page } from '@playwright/test';

export class CarsPage {
    readonly page: Page;
    readonly fuelFilterButton: Locator;
    readonly fuelElectricHybrid: Locator;
    readonly bodyTypeFilterButton: Locator;
    readonly bodyTypeSUV: Locator;
    readonly carsCards: Locator;
    
    /**
     * Constructor with elements and page
     * @param {Page} page to interact with
     */
    constructor(page: Page) {
        this.page = page;
        this.fuelFilterButton = page.getByRole('paragraph').filter({ hasText: 'Combustible' });
        this.fuelElectricHybrid = page.getByText('Híbrido enchufable').first();
        this.bodyTypeFilterButton = page.getByRole('paragraph').filter({ hasText: 'Tipo de coche' });
        this.bodyTypeSUV = page.locator('[class*="BodyTypeFilterShortcut_button"]')
            .filter({ hasText: "SUV" }).first();
        this.carsCards = page.locator('[class*="CarCard_card__car--name"]');
    }

    async clickFuelFilterButton() {
        await this.fuelFilterButton.click();
    }

    async selectFuelElectricHybrid() {
        await this.fuelElectricHybrid.click();
    }

    async clickBodyTypeFilterButton() {
        await this.bodyTypeFilterButton.click();
    }

    async selectBodyTypeSUV() {
        await this.bodyTypeSUV.click();
    }

    async getTextOfFirstCarCard() {
        return await this.carsCards.first().innerText();
    }

};
