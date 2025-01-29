import { Browser } from 'webdriverio';

export class LoginPage { 
    private browser: Browser;

    constructor(browser: Browser) {
        this.browser = browser;
    }

    async open(): Promise<void> {
        await this.browser.url('https://www.saucedemo.com/');
    }

    async login(username: string, password: string): Promise<void> {
        await (await this.browser.$('[data-test="username"]')).setValue(username);
        const passwordField = await this.browser.$('[data-test="password"]');
        await passwordField.setValue(password);
        await (await this.browser.$('[data-test="login-button"]')).click();
    }

    async getPasswordFieldType(): Promise<string> {
        const passwordField = await this.browser.$('[data-test="password"]');
        await passwordField.waitForExist({ timeout: 5000 }); 
        
        //Checking that we see dots when entering a password
        const cssProperty = await passwordField.getCSSProperty('-webkit-text-security');
        return cssProperty?.value ?? '';
    }

    async getTitleText(): Promise<string> {
        return await (await this.browser.$('.title')).getText();
    }

    async isInventoryListDisplayed(): Promise<boolean> {
        return await (await this.browser.$('[data-test="inventory-list"]')).isDisplayed();
    }

    async getInventoryItemsCount(): Promise<number> {
        const items = await this.browser.$$('.inventory_list .inventory_item');
        return items.length;
    }

    async getErrorMessage(): Promise<string> {
        return await (await this.browser.$('[data-test="error"]')).getText();
    }

    async isErrorIconDisplayed(): Promise<boolean> {
        const icons = await this.browser.$$('div.form_group > svg');
        for (const icon of icons) {
            if (!(await icon.isDisplayed())) {
                return false;
            }
        }
        return true;
    }

    async isErrorButtonDisplayed(): Promise<boolean> {
        return await (await this.browser.$('.error-button')).isDisplayed();
    }
}
