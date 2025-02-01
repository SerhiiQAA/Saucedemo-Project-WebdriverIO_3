import { Browser } from 'webdriverio';

export class CheckoutPage {
    private browser: Browser;

    constructor(browser: Browser) {
        this.browser = browser;
    }

    get cartLink() { return this.browser.$('.shopping_cart_link'); }
    get title() { return this.browser.$('.title'); }
    get checkoutButton() { return this.browser.$('#checkout'); }
    get checkoutInfo() { return this.browser.$('.checkout_info'); }
    get firstNameField() { return this.browser.$('#first-name'); }
    get lastNameField() { return this.browser.$('#last-name'); }
    get postalCodeField() { return this.browser.$('#postal-code'); }
    get continueButton() { return this.browser.$('#continue'); }
    get finishButton() { return this.browser.$('#finish'); }
    get completeHeader() { return this.browser.$('.complete-header'); }
    get backToProductsButton() { return this.browser.$('#back-to-products'); }
    get cartItem() { return this.browser.$('.cart_item'); }
    get cartContentsContainer() { return this.browser.$('.cart_contents_container'); }

    async openCart(): Promise<void> {
        await (await this.cartLink).click();
    }

    async getTitleText(): Promise<string> {
        return await (await this.title).getText();
    }

    async checkout(): Promise<void> {
        await (await this.checkoutButton).click();
    }

    async isCheckoutInfoDisplayed(): Promise<boolean> {
        return await (await this.checkoutInfo).isDisplayed();
    }

    async fillCheckoutInfo(firstName: string, lastName: string, postalCode: string): Promise<void> {
        await (await this.firstNameField).setValue(firstName);
        await (await this.lastNameField).setValue(lastName);
        await (await this.postalCodeField).setValue(postalCode);
        await (await this.continueButton).click();
    }

    async finishCheckout(): Promise<void> {
        await (await this.finishButton).click();
    }

    async getCompleteHeaderText(): Promise<string> {
        return await (await this.completeHeader).getText();
    }

    async backToProducts(): Promise<void> {
        await (await this.backToProductsButton).click();
    }

    async isCartEmpty(): Promise<boolean> {
        return !(await this.cartItem).isExisting();
    }

    async getCartContentsText(): Promise<string> {
        return await (await this.cartContentsContainer).getText();
    }
}
