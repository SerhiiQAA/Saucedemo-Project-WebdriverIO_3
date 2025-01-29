import { Browser } from 'webdriverio';

export class MenuPage {
    private browser: Browser;

    constructor(browser: Browser) {
        this.browser = browser;
    }

    async openMenu(): Promise<void> {
        await (await this.browser.$('.bm-burger-button')).click();
    }

    async getMenuItemsCount(): Promise<number> {
        const menuItems = await this.browser.$$('.bm-item-list a');
        return menuItems.length;
    }

    async logout(): Promise<void> {
        await (await this.browser.$('[data-test="logout-sidebar-link"]')).click();
    }

    async getCurrentUrl(): Promise<string> {
        return await this.browser.getUrl();
    }

    async getUsernameValue(): Promise<string> {
        return await (await this.browser.$('[data-test="username"]')).getValue();
    }

    async getPasswordValue(): Promise<string> {
        return await (await this.browser.$('[data-test="password"]')).getValue();
    }
}
