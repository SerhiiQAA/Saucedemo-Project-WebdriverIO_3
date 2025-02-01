import { Browser } from 'webdriverio';

export class MenuPage {
    private browser: Browser;

    constructor(browser: Browser) {
        this.browser = browser;
    }

    get menuButton() { return this.browser.$('.bm-burger-button'); }
    get menuItems() { return this.browser.$$('.bm-item-list a'); }
    get logoutLink() { return this.browser.$('#logout_sidebar_link'); }
    get usernameField() { return this.browser.$('#user-name'); }
    get passwordField() { return this.browser.$('#password'); }

    async openMenu(): Promise<void> {
        await (await this.menuButton).click();
    }

    async getMenuItemsCount(): Promise<number> {
        const menuItems = await this.menuItems;
        return menuItems.length;
    }

    async logout(): Promise<void> {
        await (await this.logoutLink).click();
    }

    async getCurrentUrl(): Promise<string> {
        return await this.browser.getUrl();
    }

    async getUsernameValue(): Promise<string> {
        return await (await this.usernameField).getValue();
    }

    async getPasswordValue(): Promise<string> {
        return await (await this.passwordField).getValue();
    }
}
