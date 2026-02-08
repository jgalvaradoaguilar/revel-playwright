import { Page } from '@playwright/test';
import { CarsLocators } from '../support/locators/CarsLocators';
import { ConfigManager } from '../config/ConfigManager';

export class CarsPage {
    private page: Page;
    private carsLocators: CarsLocators;
    
    /**
     * Constructor
     * @param {Page} page to interact with
     */
    constructor(page: Page) {
        this.page = page;
        this.carsLocators = new CarsLocators(page);
    }

    async clickFilterButton(filterName: string) {
        if (!filterName) {
            throw new Error("Filter name must be provided");
        }
        switch (filterName) {
            case "Fuel":
                await this.carsLocators.fuelFilterButton.click();
                break;
            case "Body Type":
                await this.carsLocators.bodyTypeFilterButton.click();
                break;
            case "Color":
                await this.carsLocators.colorFilterButton.click();
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
                await this.carsLocators.fuelElectricHybrid.click();
                break;
            case "SUV":
                await this.carsLocators.bodyTypeSUV.click();
                break;
            case "White":
                await this.carsLocators.colorWhite.click();
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
                await this.carsLocators.fuelFilterResetButton.click();
                break;
            case "Body Type":
                await this.carsLocators.bodyTypeFilterResetButton.click();
                break;
            case "Color":
                await this.carsLocators.colorFilterResetButton.click();
                break;
            default:
                throw new Error("Filter name not recognized: " + filterName);
        }
    }

    async isPartOfTheURL(part: string) {
        return this.page.url().includes(part);
    }

    async goToFirstCarCard() {
        await this.carsLocators.carsCards.first().scrollIntoViewIfNeeded();
    }

    async getTextOfFirstCarCard() {
        return await this.carsLocators.carsCards.first().innerText();
    }

    async isPartOfFirstCarCard(part: string) {
        const firstCarText = await this.getTextOfFirstCarCard();
        return firstCarText.includes(part);
    }

};
