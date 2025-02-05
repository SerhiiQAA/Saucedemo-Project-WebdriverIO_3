import { Browser } from 'webdriverio';

export class CheckoutPage {
  private browser: Browser;

  constructor(browser: Browser) {
    this.browser = browser;
  }

  get selectors() {
    return {
      cartLink: '.shopping_cart_link',
      title: '.title',
      checkoutButton: '#checkout',
      checkoutInfo: '.checkout_info',
      firstNameField: '#first-name',
      lastNameField: '#last-name',
      postalCodeField: '#postal-code',
      continueButton: '#continue',
      finishButton: '#finish',
      completeHeader: '.complete-header',
      backToProductsButton: '#back-to-products',
      cartItem: '.cart_item',
      cartContentsContainer: '.cart_contents_container'
    };
  }

  async openCart(): Promise<void> {
    await this.browser.$(this.selectors.cartLink).click();
  }

  async getTitleText(): Promise<string> {
    return await (await this.browser.$(this.selectors.title)).getText();
  }

  async checkout(): Promise<void> {
    await this.browser.$(this.selectors.checkoutButton).click();
  }

  async isCheckoutInfoDisplayed(): Promise<boolean> {
    return await this.browser.$(this.selectors.checkoutInfo).isDisplayed();
  }

  async fillCheckoutInfo(firstName: string, lastName: string, postalCode: string): Promise<void> {
    await this.browser.$(this.selectors.firstNameField).setValue(firstName);
    await this.browser.$(this.selectors.lastNameField).setValue(lastName);
    await this.browser.$(this.selectors.postalCodeField).setValue(postalCode);
    await this.browser.$(this.selectors.continueButton).click();
  }

  async finishCheckout(): Promise<void> {
    await this.browser.$(this.selectors.finishButton).click();
  }

  async getCompleteHeaderText(): Promise<string> {
    return await (await this.browser.$(this.selectors.completeHeader)).getText();
  }

  async backToProducts(): Promise<void> {
    await this.browser.$(this.selectors.backToProductsButton).click();
  }

  async isCartEmpty(): Promise<boolean> {
    await this.browser.pause(500);
    return !(await this.browser.$(this.selectors.cartItem)).isExisting();
  }

  async getCartContentsText(): Promise<string> {
    return await (await this.browser.$(this.selectors.cartContentsContainer)).getText();
  }
}
