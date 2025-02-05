import { LoginPage } from '../pages/LoginPage';
import { ProductFilterPage } from '../pages/ProductFilterPage';
import { setWindowSize } from '../../utils/windowUtils';

describe('Filter and sort products', () => {
    let loginPage: LoginPage;
    let productsPage: ProductFilterPage;

    before(async () => {
        await setWindowSize(browser);
    });

    beforeEach(async () => {
        loginPage = new LoginPage(browser);
        productsPage = new ProductFilterPage(browser);

        await loginPage.open();
        await loginPage.login('standard_user', 'secret_sauce');
        await expect(await browser.getUrl()).toContain('/inventory.html');
    });

    it('should sort products by price ascending (Test Case ID 6 / 1)', async () => {
        await productsPage.sortProductsBy('lohi');
        await expect(await productsPage.getCurrentProductPrices()).toEqual(await productsPage.getSortedProductPricesAsc());
    });

    it('should sort products by price descending (Test Case ID 6 / 2)', async () => {
        await productsPage.sortProductsBy('hilo');
        await expect(await productsPage.getCurrentProductPrices()).toEqual(await productsPage.getSortedProductPricesDesc());
    });

    it('should sort products by name ascending (Test Case ID 6 / 3)', async () => {
        await productsPage.sortProductsBy('az');
        await expect(await productsPage.getCurrentProductNames()).toEqual(await productsPage.getSortedProductNamesAsc());
    });

    it('should sort products by name descending (Test Case ID 6 / 4)', async () => {
        await productsPage.sortProductsBy('za');
        await expect(await productsPage.getCurrentProductNames()).toEqual(await productsPage.getSortedProductNamesDesc());
    });
});
