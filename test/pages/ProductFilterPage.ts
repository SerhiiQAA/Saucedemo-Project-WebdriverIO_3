import { Browser } from 'webdriverio';

export class ProductFilterPage {
  private browser: Browser;

  constructor(browser: Browser) {
    this.browser = browser;
  }

  get selectors() {
    return {
      itemNames: '.inventory_item_name',
      itemPrices: '.inventory_item_price',
      sortContainer: '.select_container .product_sort_container'
    };
  }

  async collectProductNames(): Promise<string[]> {
    const items = await this.browser.$$(this.selectors.itemNames);
    const names: string[] = [];
    for (const item of items) {
      names.push(await item.getText());
    }
    return names;
  }

  async collectProductPrices(): Promise<number[]> {
    const items = await this.browser.$$(this.selectors.itemPrices);
    const prices: number[] = [];
    for (const item of items) {
      prices.push(parseFloat((await item.getText()).replace('$', '')));
    }
    return prices;
  }

  async sortProductsBy(sortType: string): Promise<void> {
    await (await this.browser.$(this.selectors.sortContainer)).selectByAttribute('value', sortType);
  }

  async getCurrentProductPrices(): Promise<number[]> {
    const items = await this.browser.$$(this.selectors.itemPrices);
    const prices: number[] = [];
    for (const item of items) {
      prices.push(parseFloat((await item.getText()).replace('$', '')));
    }
    return prices;
  }

  async getCurrentProductNames(): Promise<string[]> {
    const items = await this.browser.$$(this.selectors.itemNames);
    const names: string[] = [];
    for (const item of items) {
      names.push(await item.getText());
    }
    return names;
  }

  async isSortContainerDisplayed(): Promise<boolean> {
    return await (await this.browser.$(this.selectors.sortContainer)).isDisplayed();
  }

  async getSortedProductNamesAsc(): Promise<string[]> {
    const names = await this.collectProductNames();
    return names.sort();
  }

  async getSortedProductNamesDesc(): Promise<string[]> {
    const names = await this.collectProductNames();
    return names.sort().reverse();
  }

  async getSortedProductPricesAsc(): Promise<number[]> {
    const prices = await this.collectProductPrices();
    return prices.sort((a, b) => a - b);
  }

  async getSortedProductPricesDesc(): Promise<number[]> {
    const prices = await this.collectProductPrices();
    return prices.sort((a, b) => b - a);
  }
}
