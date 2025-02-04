import { Browser } from 'webdriverio';

export class CartPage {
  private browser: Browser;

  constructor(browser: Browser) {
    this.browser = browser;
  }

  get selectors() {
    return {
      priceButtons: '.pricebar button',
      shoppingCartBadge: '.shopping_cart_badge',
      menuButton: '.bm-burger-button',
      logoutLink: '#logout_sidebar_link',
      usernameField: '#user-name',
      passwordField: '#password',
      inventoryList: '.inventory_list'
    };
  }

  get priceButtons() { return this.browser.$$(this.selectors.priceButtons); }
  get shoppingCartBadge() { return this.browser.$(this.selectors.shoppingCartBadge); }
  get menuButton() { return this.browser.$(this.selectors.menuButton); }
  get logoutLink() { return this.browser.$(this.selectors.logoutLink); }
  get usernameField() { return this.browser.$(this.selectors.usernameField); }
  get passwordField() { return this.browser.$(this.selectors.passwordField); }
  get inventoryList() { return this.browser.$(this.selectors.inventoryList); }

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
