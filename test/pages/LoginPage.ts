import { Browser } from 'webdriverio';

export class LoginPage { 
  private browser: Browser;
  inventoryItems: any;

  constructor(browser: Browser) {
    this.browser = browser;
  }

  get selectors() {
    return {
      usernameField: '#user-name',
      passwordField: '#password',
      loginButton: '#login-button',
      title: '.title',
      inventoryList: '[data-test="inventory-list"]',
      errorMessage: '[data-test="error"]',
      xErrorIcons: 'div.form_group > svg',
      xErrorIconUsername: 'div.form_group > svg:nth-child(1)',
      xErrorIconPassword: 'div.form_group > svg:nth-child(2)',
      xErrorButton: '.error-button'
    };
  }

  async open(): Promise<void> {
    await this.browser.url('https://www.saucedemo.com/');
  }

  async login(username: string, password: string): Promise<void> {
    await (await this.browser.$(this.selectors.usernameField)).setValue(username);
    await (await this.browser.$(this.selectors.passwordField)).setValue(password);
    await (await this.browser.$(this.selectors.loginButton)).click();
  }

  async getPasswordFieldType(): Promise<string> {
    const passwordField = await this.browser.$(this.selectors.passwordField);
    await passwordField.waitForExist({ timeout: 5000 }); 

    const cssProperty = await passwordField.getCSSProperty('-webkit-text-security');
    return cssProperty?.value ?? '';
  }

  async getTitleText(): Promise<string> {
    return await (await this.browser.$(this.selectors.title)).getText();
  }

  async isInventoryListDisplayed(): Promise<boolean> {
    return await (await this.browser.$(this.selectors.inventoryList)).isDisplayed();
  }

  async getInventoryItemsCount(): Promise<number> {
    const items = await this.browser.$$('.inventory_list .inventory_item');
    return items.length;
  }

  async getErrorMessage(): Promise<string> {
    return await (await this.browser.$(this.selectors.errorMessage)).getText();
  }

  async isErrorIconDisplayed(): Promise<boolean> {
    const icons = await this.browser.$$(this.selectors.xErrorIcons);
    for (const icon of icons) {
      if (!(await icon.isDisplayed())) {
        return false;
      }
    }
    return true;
  }

  async isErrorButtonDisplayed(): Promise<boolean> {
    return await (await this.browser.$(this.selectors.xErrorButton)).isDisplayed();
  }
}
