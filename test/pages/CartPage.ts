import { Browser } from 'webdriverio';

export class CartPage {
    private browser: Browser;

    constructor(browser: Browser) {
        this.browser = browser;
    }

    //We randomly select a product from the ones available on the page each time we run the test
    async addRandomProductToCart(): Promise<void> {
        const buttons = await this.browser.$$('.pricebar button');
        const randomIndex = Math.floor(Math.random() * await buttons.length);
        await buttons[randomIndex].click();
    }

    async getCartBadgeText(): Promise<string> {
        return await (await this.browser.$('[data-test="shopping-cart-badge"]')).getText();
    }

    async openMenu(): Promise<void> {
        await (await this.browser.$('.bm-burger-button')).click();
    }

    async logout(): Promise<void> {
        await (await this.browser.$('[data-test="logout-sidebar-link"]')).click();
    }

    async getUsernameValue(): Promise<string> {
        return await (await this.browser.$('[data-test="username"]')).getValue();
    }

    async getPasswordValue(): Promise<string> {
        return await (await this.browser.$('[data-test="password"]')).getValue();
    }

    async getInventoryText(): Promise<string> {
        return await (await this.browser.$('.inventory_list')).getText();
    }
}
