import { remote, Browser } from 'webdriverio';
import { LoginPage } from '../pages/LoginPage';
import { ProductFilterPage } from '../pages/ProductFilterPage';
import { setWindowSize } from '../../utils/windowUtils';


describe('Filter and sort products', () => {
    let browser: Browser;
    let loginPage: LoginPage;
    let productsPage: ProductFilterPage;
    let itemNamesArray: string[] = [];
    let sortedNamesAsc: string[] = [];
    let sortedNamesDesc: string[] = [];
    let itemPricesArray: number[] = [];
    let sortedPricesAsc: number[] = [];
    let sortedPricesDesc: number[] = [];

    before(async () => {
        browser = await remote({
            logLevel: 'info',
            path: '/',
            capabilities: {
                browserName: 'chrome'
            }
        });

        // Possible options:
        // web: { width: 1280, height: 800 },
        // tablet: { width: 768, height: 1024 },
        // mobile: { width: 375, height: 812 };
        await setWindowSize(browser);

        loginPage = new LoginPage(browser);
        productsPage = new ProductFilterPage(browser);

        await loginPage.open();
        await loginPage.login('standard_user', 'secret_sauce');

        // Collecting product names
        itemNamesArray = await productsPage.collectProductNames();
        sortedNamesAsc = [...itemNamesArray].sort();
        sortedNamesDesc = [...itemNamesArray].sort().reverse();

        // Collecting prices of goods
        itemPricesArray = await productsPage.collectProductPrices();
        sortedPricesAsc = [...itemPricesArray].sort((a, b) => a - b);
        sortedPricesDesc = [...itemPricesArray].sort((a, b) => b - a);
    });

    beforeEach(async () => {
        await loginPage.open();
        await loginPage.login('standard_user', 'secret_sauce');
        expect(await productsPage.isSortContainerDisplayed()).toBe(true);
    });

    // Sorting products (Test Case ID 6))
    it('should sort products by price ascending (Test Case ID 6 / 1)', async () => {
        await productsPage.sortProductsBy('lohi');
        const currentPrices = await productsPage.getCurrentProductPrices();
        expect(currentPrices).toEqual(sortedPricesAsc);
    });

    it('should sort products by price descending (Test Case ID 6 / 2)', async () => {
        await productsPage.sortProductsBy('hilo');
        const currentPrices = await productsPage.getCurrentProductPrices();
        expect(currentPrices).toEqual(sortedPricesDesc);
    });

    it('should sort products by name ascending (Test Case ID 6 / 3)', async () => {
        await productsPage.sortProductsBy('az');
        const currentNames = await productsPage.getCurrentProductNames();
        expect(currentNames).toEqual(sortedNamesAsc);
    });

    it('should sort products by name descending (Test Case ID 6 / 4)', async () => {
        await productsPage.sortProductsBy('za');
        const currentNames = await productsPage.getCurrentProductNames();
        expect(currentNames).toEqual(sortedNamesDesc);
    });

    after(async () => {
        await browser.deleteSession();
    });
});

