import { LoginPage } from '../pages/LoginPage';
import { ProductFilterPage } from '../pages/ProductFilterPage';
import { setWindowSize } from '../../utils/windowUtils';

describe('Filter and sort products', () => {
    let loginPage: LoginPage;
    let productsPage: ProductFilterPage;
    let itemNamesArray: string[] = [];
    let sortedNamesAsc: string[] = [];
    let sortedNamesDesc: string[] = [];
    let itemPricesArray: number[] = [];
    let sortedPricesAsc: number[] = [];
    let sortedPricesDesc: number[] = [];

    before(async () => {
        await setWindowSize(browser);

        loginPage = new LoginPage(browser);
        productsPage = new ProductFilterPage(browser);

        await loginPage.open();
        await loginPage.login('standard_user', 'secret_sauce');
        await expect(await browser.getUrl()).toContain('/inventory.html');

        itemNamesArray = await productsPage.collectProductNames();
        sortedNamesAsc = [...itemNamesArray].sort();
        sortedNamesDesc = [...itemNamesArray].sort().reverse();

        itemPricesArray = await productsPage.collectProductPrices();
        sortedPricesAsc = [...itemPricesArray].sort((a, b) => a - b);
        sortedPricesDesc = [...itemPricesArray].sort((a, b) => b - a);
    });

    beforeEach(async () => {
        await loginPage.open();
        await expect(await browser.getUrl()).toContain('https://www.saucedemo.com');
        await loginPage.login('standard_user', 'secret_sauce');
        await expect(await productsPage.isSortContainerDisplayed()).toBe(true);
    });

    it('should sort products by price ascending (Test Case ID 6 / 1)', async () => {
        await productsPage.sortProductsBy('lohi');
        await expect(await productsPage.getCurrentProductPrices()).toEqual(sortedPricesAsc);
    });

    it('should sort products by price descending (Test Case ID 6 / 2)', async () => {
        await productsPage.sortProductsBy('hilo');
        await expect(await productsPage.getCurrentProductPrices()).toEqual(sortedPricesDesc);
    });

    it('should sort products by name ascending (Test Case ID 6 / 3)', async () => {
        await productsPage.sortProductsBy('az');
        await expect(await productsPage.getCurrentProductNames()).toEqual(sortedNamesAsc);
    });

    it('should sort products by name descending (Test Case ID 6 / 4)', async () => {
        await productsPage.sortProductsBy('za');
        await expect(await productsPage.getCurrentProductNames()).toEqual(sortedNamesDesc);
    });
});
