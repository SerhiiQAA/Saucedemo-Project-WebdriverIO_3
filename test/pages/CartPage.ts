import { Browser } from 'webdriverio';

export class CartPage {
    private browser: Browser;

    constructor(browser: Browser) {
        this.browser = browser;
    }

    get priceButtons() { return this.browser.$$('.pricebar button'); }
    get shoppingCartBadge() { return this.browser.$('.shopping_cart_badge'); }
    get menuButton() { return this.browser.$('.bm-burger-button'); }
    get logoutLink() { return this.browser.$('#logout_sidebar_link'); }
    get usernameField() { return this.browser.$('[data-test="username"]'); }
    get passwordField() { return this.browser.$('[data-test="password"]'); }
    get inventoryList() { return this.browser.$('.inventory_list'); }

    //We randomly select a product from the ones available on the page each time we run the test
    async addRandomProductToCart(): Promise<void> {
        const buttons = await this.priceButtons;
        const randomIndex = Math.floor(Math.random() * await buttons.length);
        await buttons[randomIndex].click();
    }

    async getCartBadgeText(): Promise<string> {
        return await (await this.shoppingCartBadge).getText();
    }

    async openMenu(): Promise<void> {
        await (await this.menuButton).click();
    }

    async logout(): Promise<void> {
        await (await this.logoutLink).click();
    }

    async getUsernameValue(): Promise<string> {
        return await (await this.usernameField).getValue();
    }

    async getPasswordValue(): Promise<string> {
        return await (await this.passwordField).getValue();
    }

    async getInventoryText(): Promise<string> {
        return await (await this.inventoryList).getText();
    }
}
