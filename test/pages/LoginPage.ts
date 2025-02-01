import { Browser } from 'webdriverio';

export class LoginPage { 
    private browser: Browser;

    constructor(browser: Browser) {
        this.browser = browser;
    }

    get usernameField() { return this.browser.$('#user-name'); }
    get passwordField() { return this.browser.$('#password'); }
    get loginButton() { return this.browser.$('#login-button[type=submit]'); }
    get title() { return this.browser.$('.title'); }
    get inventoryList() { return this.browser.$('[data-test="inventory-list"]'); }
    get errorMessage() { return this.browser.$('[data-test="error"]'); }
    get errorIcons() { return this.browser.$$('div.form_group > svg'); }
    get errorButton() { return this.browser.$('.error-button'); }

    async open(): Promise<void> {
        await this.browser.url('https://www.saucedemo.com/');
    }

    async login(username: string, password: string): Promise<void> {
        await (await this.usernameField).setValue(username);
        await (await this.passwordField).setValue(password);
        await (await this.loginButton).click();
    }

    async getPasswordFieldType(): Promise<string> {
        const passwordField = await this.passwordField;
        await passwordField.waitForExist({ timeout: 5000 }); 

        // Checking that we see dots when entering a password
        const cssProperty = await passwordField.getCSSProperty('-webkit-text-security');
        return cssProperty?.value ?? '';
    }

    async getTitleText(): Promise<string> {
        return await (await this.title).getText();
    }

    async isInventoryListDisplayed(): Promise<boolean> {
        return await (await this.inventoryList).isDisplayed();
    }

    async getInventoryItemsCount(): Promise<number> {
        const items = await this.browser.$$('.inventory_list .inventory_item');
        return items.length;
    }

    async getErrorMessage(): Promise<string> {
        return await (await this.errorMessage).getText();
    }

    async isErrorIconDisplayed(): Promise<boolean> {
        const icons = await this.errorIcons;
        for (const icon of icons) {
            if (!(await icon.isDisplayed())) {
                return false;
            }
        }
        return true;
    }

    async isErrorButtonDisplayed(): Promise<boolean> {
        return await (await this.errorButton).isDisplayed();
    }
}
