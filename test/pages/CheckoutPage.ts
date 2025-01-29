import { Browser } from 'webdriverio';

export class CheckoutPage {
    private browser: Browser;

    constructor(browser: Browser) {
        this.browser = browser;
    }

    async openCart(): Promise<void> {
        await (await this.browser.$('.shopping_cart_link')).click();
    }

    async getTitleText(): Promise<string> {
        return await (await this.browser.$('.title')).getText();
    }

    async checkout(): Promise<void> {
        await (await this.browser.$('#checkout')).click();
    }

    async isCheckoutInfoDisplayed(): Promise<boolean> {
        return await (await this.browser.$('.checkout_info')).isDisplayed();
    }

    async fillCheckoutInfo(firstName: string, lastName: string, postalCode: string): Promise<void> {
        await (await this.browser.$('#first-name')).setValue(firstName);
        await (await this.browser.$('#last-name')).setValue(lastName);
        await (await this.browser.$('#postal-code')).setValue(postalCode);
        await (await this.browser.$('#continue')).click();
    }

    async finishCheckout(): Promise<void> {
        await (await this.browser.$('#finish')).click();
    }

    async getCompleteHeaderText(): Promise<string> {
        return await (await this.browser.$('.complete-header')).getText();
    }

    async backToProducts(): Promise<void> {
        await (await this.browser.$('#back-to-products')).click();
    }

    async isCartEmpty(): Promise<boolean> {
        return !(await this.browser.$('.cart_item')).isExisting();
    }

    async getCartContentsText(): Promise<string> {
        return await (await this.browser.$('.cart_contents_container')).getText();
    }
}
