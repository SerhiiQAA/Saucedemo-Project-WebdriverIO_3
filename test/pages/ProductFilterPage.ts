import { Browser } from 'webdriverio';

export class ProductFilterPage {
    private browser: Browser;

    constructor(browser: Browser) {
        this.browser = browser;
    }

    async collectProductNames(): Promise<string[]> {
        const itemNames = await this.browser.$$('.inventory_item_name');
        const names: string[] = [];
        for (let i = 0; i < await itemNames.length; i++) {
            names.push(await itemNames[i].getText());
        }
        return names;
    }

    async collectProductPrices(): Promise<number[]> {
        const itemPrices = await this.browser.$$('.inventory_item_price');
        const prices: number[] = [];
        for (let i = 0; i < await itemPrices.length; i++) {
            prices.push(parseFloat((await itemPrices[i].getText()).replace('$', '')));
        }
        return prices;
    }

    async sortProductsBy(sortType: string): Promise<void> {
        await (await this.browser.$('.select_container .product_sort_container')).selectByAttribute('value', sortType);
    }

    async getCurrentProductPrices(): Promise<number[]> {
        const itemPrices = await this.browser.$$('.inventory_item_price');
        const currentPrices: number[] = [];
        for (let i = 0; i < await itemPrices.length; i++) {
            currentPrices.push(parseFloat((await itemPrices[i].getText()).replace('$', '')));
        }
        return currentPrices;
    }

    async getCurrentProductNames(): Promise<string[]> {
        const itemNames = await this.browser.$$('.inventory_item_name');
        const currentNames: string[] = [];
        for (let i = 0; i < await itemNames.length; i++) {
            currentNames.push(await itemNames[i].getText());
        }
        return currentNames;
    }

    async isSortContainerDisplayed(): Promise<boolean> {
        return await (await this.browser.$('.select_container .product_sort_container')).isDisplayed();
    }
}
