import { Page, Locator } from '@playwright/test';

export class LoginLocators {
    readonly phoneInput: Locator;
    readonly continueButton: Locator;
    readonly skipButton: Locator;
    readonly otpInput: Locator;
    readonly loginSuccessfulImage: Locator;
    readonly loginFailedMessage: Locator;

    /**
     * Constructor with elements and page
     * @param {Page} page to interact with
     */
    constructor(page: Page) {
        //this.phoneInput = page.getByRole('textbox', { name: 'phone number' });
        this.phoneInput = page.locator('input[name="phone number"]');
        this.continueButton = page.getByRole('button', { name: 'Continuar' });
        this.skipButton = page.getByRole('button', { name: 'Skip' });
        this.otpInput = page.getByRole('textbox').and(page.locator('[inputmode="numeric"]'));
        this.loginSuccessfulImage = page.locator('img[alt="Login Successful"]');
        this.loginFailedMessage = page.getByText('Este código no es válido');
    }

}