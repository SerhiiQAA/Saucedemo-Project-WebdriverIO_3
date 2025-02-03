import { Browser } from 'webdriverio';

export class MenuPage {
  private browser: Browser;

  constructor(browser: Browser) {
    this.browser = browser;
  }

  get selectors() {
    return {
      menuButton: '.bm-burger-button',
      menuItems: '.bm-item-list a',
      logoutLink: '#logout_sidebar_link',
      usernameField: '#user-name',
      passwordField: '#password'
    };
  }

  async openMenu(): Promise<void> {
    await this.browser.$(this.selectors.menuButton).click();
  }

  async getMenuItemsCount(): Promise<number> {
    const menuItems = await this.browser.$$(this.selectors.menuItems);
    return menuItems.length;
  }

  async logout(): Promise<void> {
    await this.browser.$(this.selectors.logoutLink).click();
  }

  async getCurrentUrl(): Promise<string> {
    return await this.browser.getUrl();
  }

  async getUsernameValue(): Promise<string> {
    return await this.browser.$(this.selectors.usernameField).getValue();
  }

  async getPasswordValue(): Promise<string> {
    return await this.browser.$(this.selectors.passwordField).getValue();
  }
}
