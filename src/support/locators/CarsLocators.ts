import { Page, Locator } from '@playwright/test';

export class CarsLocators {
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

}