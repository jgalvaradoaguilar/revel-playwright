import { expect, Locator, Page } from '@playwright/test';

export class CarsPage {
    readonly page: Page;
    readonly fuelFilterButton: Locator;
    readonly fuelElectricHybrid: Locator;
    readonly fuelFilterResetButton: Locator;
    readonly bodyTypeFilterButton: Locator;
    readonly bodyTypeSUV: Locator;
    readonly bodyTypeFilterResetButton: Locator;
    readonly colorFilterButton: Locator;
    readonly colorWhite: Locator;
    readonly colorFilterResetButton: Locator;
    readonly carsCards: Locator;
    readonly noResultsMessage: Locator;
    
    /**
     * Constructor with elements and page
     * @param {Page} page to interact with
     */
    constructor(page: Page) {
        this.page = page;
        this.fuelFilterButton = page.getByRole('paragraph').filter({ hasText: 'Combustible' });
        this.fuelElectricHybrid = page.getByText('Híbrido enchufable').first();
        this.fuelFilterResetButton = page.locator('div[class*="FilterShortcutButton_filter__button"]')
            .filter({ hasText: 'Combustible' }).locator('div[class*="reset"]');
        this.bodyTypeFilterButton = page.getByRole('paragraph').filter({ hasText: 'Tipo de coche' }).first();
        this.bodyTypeSUV = page.locator('[class*="BodyTypeFilterShortcut_button"]')
            .filter({ hasText: "SUV" }).first();
        this.bodyTypeFilterResetButton = page.locator('div[class*="FilterShortcutButton_filter__button"]')
            .filter({ hasText: 'Tipo de coche' }).locator('div[class*="reset"]');
        this.colorFilterButton = page.getByRole('paragraph').filter({ hasText: 'Color' });
        this.colorWhite = page.getByText('Blanco');
        this.colorFilterResetButton = page.locator('div[class*="FilterShortcutButton_filter__button"]')
            .filter({ hasText: 'Color' }).locator('div[class*="reset"]');
        this.carsCards = page.locator('[class*="CarCard_card__car--name"]');
        this.noResultsMessage = page.getByText('¿No encuentras lo que buscas?');
    }

    async clickFilterButton(filterName: string) {
        if (!filterName) {
            throw new Error("Filter name must be provided");
        }
        switch (filterName) {
            case "Fuel":
                await this.fuelFilterButton.click();
                break;
            case "Body Type":
                await this.bodyTypeFilterButton.click();
                break;
            case "Color":
                await this.colorFilterButton.click();
                break;
            default:
                throw new Error("Filter name not recognized: " + filterName);
        }
    }

    async selectFilterOption(filterOption: string) {
        if (!filterOption) {
            throw new Error("Filter option must be provided");
        }
        switch (filterOption) {
            case "Electric Hybrid":
                await this.fuelElectricHybrid.click();
                break;
            case "SUV":
                await this.bodyTypeSUV.click();
                break;
            case "White":
                await this.colorWhite.click();
                break;
            default:
                throw new Error("Filter option not recognized: " + filterOption);
        }   
    }

    async resetFilterButton(filterName: string) {
        if (!filterName) {
            throw new Error("Filter name must be provided");
        }
        switch (filterName) {
            case "Fuel":
                await this.fuelFilterResetButton.click();
                break;
            case "Body Type":
                await this.bodyTypeFilterResetButton.click();
                break;
            case "Color":
                await this.colorFilterResetButton.click();
                break;
            default:
                throw new Error("Filter name not recognized: " + filterName);
        }
    }

    async isPartOfTheURL(part: string) {
        return this.page.url().includes(part);
    }

    async getTextOfFirstCarCard() {
        return await this.carsCards.first().innerText();
    }

    async isPartOfFirstCarCard(part: string) {
        const firstCarText = await this.getTextOfFirstCarCard();
        return firstCarText.includes(part);
    }

};
