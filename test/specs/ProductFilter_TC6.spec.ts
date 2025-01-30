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

        // web: { width: 1280, height: 720 },
        // mobile: { width: 375, height: 667 },
        // laptop: { width: 1440, height: 900 };
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











// import { remote } from 'webdriverio';

// describe('Filter and sort products', () => {
//     let browser: WebdriverIO.Browser;
//     let itemNamesArray: string[] = [];
//     let sortedNamesAsc: string[] = [];
//     let sortedNamesDesc: string[] = [];

//     let itemPricesArray: number[] = [];
//     let sortedPricesAsc: number[] = [];
//     let sortedPricesDesc: number[] = [];

//     before(async () => {
//         browser = await remote({
//             logLevel: 'info',
//             path: '/',
//             capabilities: {
//                 browserName: 'chrome'
//             }
//         });

//         await browser.setWindowSize(1280, 720);
//         await browser.url('https://www.saucedemo.com/');
        
//         await (await browser.$('[data-test="username"]')).setValue('standard_user');
//         await (await browser.$('[data-test="password"]')).setValue('secret_sauce');
//         await (await browser.$('[data-test="login-button"]')).click();

//         // Збір назв товарів
//         const itemNames = await browser.$$('.inventory_item_name');
//         for (let i = 0; i < await itemNames.length; i++) {
//             itemNamesArray.push(await itemNames[i].getText());
//         }

//         // Збір цін товарів
//         const itemPrices = await browser.$$('.inventory_item_price');
//         for (let i = 0; i < await itemPrices.length; i++) {
//             itemPricesArray.push(parseFloat((await itemPrices[i].getText()).replace('$', '')));
//         }
        
//         // Сортування назв товарів за алфавітом
//         sortedNamesAsc = [...itemNamesArray].sort();
//         sortedNamesDesc = [...itemNamesArray].sort().reverse();

//         // Сортування цін товарів за зростанням та зменшенням
//         sortedPricesAsc = [...itemPricesArray].sort((a, b) => a - b);
//         sortedPricesDesc = [...itemPricesArray].sort((a, b) => b - a);
//     });

//     beforeEach(async () => {
//         await browser.setWindowSize(1280, 720);
//         await browser.url('https://www.saucedemo.com/');
//         await (await browser.$('[data-test="username"]')).setValue('standard_user');
//         await (await browser.$('[data-test="password"]')).setValue('secret_sauce');
//         await (await browser.$('[data-test="login-button"]')).click();

//         expect(await (await browser.$('.select_container .product_sort_container')).isDisplayed()).toBe(true);
//     });

//     it('should sort products by price ascending', async () => {
//         await (await browser.$('.select_container .product_sort_container')).selectByAttribute('value', 'lohi');

//         const itemPrices = await browser.$$('.inventory_item_price');
//         const currentPrices: number[] = [];
//         for (let i = 0; i < await itemPrices.length; i++) {
//             currentPrices.push(parseFloat((await itemPrices[i].getText()).replace('$', '')));
//         }

//         expect(currentPrices).toEqual(sortedPricesAsc);
//     });

//     it('should sort products by price descending', async () => {
//         await (await browser.$('.select_container .product_sort_container')).selectByAttribute('value', 'hilo');

//         const itemPrices = await browser.$$('.inventory_item_price');
//         const currentPrices: number[] = [];
//         for (let i = 0; i < await itemPrices.length; i++) {
//             currentPrices.push(parseFloat((await itemPrices[i].getText()).replace('$', '')));
//         }

//         expect(currentPrices).toEqual(sortedPricesDesc);
//     });

//     it('should sort products by name ascending', async () => {
//         await (await browser.$('.select_container .product_sort_container')).selectByAttribute('value', 'az');

//         const itemNames = await browser.$$('.inventory_item_name');
//         const currentNames: string[] = [];
//         for (let i = 0; i < await itemNames.length; i++) {
//             currentNames.push(await itemNames[i].getText());
//         }

//         expect(currentNames).toEqual(sortedNamesAsc);
//     });

//     it('should sort products by name descending', async () => {
//         await (await browser.$('.select_container .product_sort_container')).selectByAttribute('value', 'za');

//         const itemNames = await browser.$$('.inventory_item_name');
//         const currentNames: string[] = [];
//         for (let i = 0; i < await itemNames.length; i++) {
//             currentNames.push(await itemNames[i].getText());
//         }

//         expect(currentNames).toEqual(sortedNamesDesc);
//     });

//     after(async () => {
//         await browser.deleteSession();
//     });
// });








// import { remote } from 'webdriverio';

// describe('Collect product titles', () => {
//     let browser: WebdriverIO.Browser;
//     let itemNamesArray: string[] = [];

//     before(async () => {
//         browser = await remote({
//             logLevel: 'info',
//             path: '/',
//             capabilities: {
//                 browserName: 'chrome'
//             }
//         });

//         await browser.setWindowSize(1280, 720);
//         await browser.url('https://www.saucedemo.com/');
        
//         await (await browser.$('[data-test="username"]')).setValue('standard_user');
//         await (await browser.$('[data-test="password"]')).setValue('secret_sauce');
//         await (await browser.$('[data-test="login-button"]')).click();

//         // Збір назв товарів
//         const itemNames = await browser.$$('.inventory_item_name');
//         for (let i = 0; i < await itemNames.length; i++) {
//             itemNamesArray.push(await itemNames[i].getText());
//         }
        
//         console.log(itemNamesArray); // Виведення назв товарів у консоль
//     });

//     after(async () => {
//         await browser.deleteSession();
//     });

//     it('should collect product titles', async () => {
//         expect(itemNamesArray.length).toBe(6); // Перевірка, що зібрано 6 назв
//     });
// });




// import { remote } from 'webdriverio';

// describe('Collect and sort product titles and prices', () => {
//     let browser: WebdriverIO.Browser;
//     let itemNamesArray: string[] = [];
//     let sortedNamesAsc: string[] = [];
//     let sortedNamesDesc: string[] = [];

//     let itemPricesArray: number[] = [];
//     let sortedPricesAsc: number[] = [];
//     let sortedPricesDesc: number[] = [];

//     before(async () => {
//         browser = await remote({
//             logLevel: 'info',
//             path: '/',
//             capabilities: {
//                 browserName: 'chrome'
//             }
//         });

//         await browser.url('https://www.saucedemo.com/');
//         await (await browser.$('[data-test="username"]')).setValue('standard_user');
//         await (await browser.$('[data-test="password"]')).setValue('secret_sauce');
//         await (await browser.$('[data-test="login-button"]')).click();

//         // Збір назв товарів
//         const itemNames = await browser.$$('.inventory_item_name');
//         itemNamesArray = await Promise.all(itemNames.map(async el => (await el.getText()) as string));
//         sortedNamesAsc = [...itemNamesArray].sort();
//         sortedNamesDesc = [...itemNamesArray].sort().reverse();

//         // Збір цін товарів
//         const itemPrices = await browser.$$('.inventory_item_price');
//         itemPricesArray = await Promise.all(itemPrices.map(async el => parseFloat((await el.getText()).replace('$', ''))));
//         sortedPricesAsc = [...itemPricesArray].sort((a, b) => a - b);
//         sortedPricesDesc = [...itemPricesArray].sort((a, b) => b - a);
//     });

//     beforeEach(async () => {
//         await browser.setWindowSize(1280, 720);
//         await browser.url('https://www.saucedemo.com/');
//         await (await browser.$('[data-test="username"]')).setValue('standard_user');
//         await (await browser.$('[data-test="password"]')).setValue('secret_sauce');
//         await (await browser.$('[data-test="login-button"]')).click();

//         expect(await (await browser.$('.select_container .product_sort_container')).isDisplayed()).toBe(true);
//     });

//     it('should sort products by price ascending', async () => {
//         await (await browser.$('.select_container .product_sort_container')).selectByAttribute('value', 'lohi');

//         const itemPrices = await browser.$$('.inventory_item_price');
//         const currentPrices = await Promise.all(itemPrices.map(async el => parseFloat((await el.getText()).replace('$', ''))));

//         expect(currentPrices).toEqual(sortedPricesAsc);
//     });

//     it('should sort products by price descending', async () => {
//         await (await browser.$('.select_container .product_sort_container')).selectByAttribute('value', 'hilo');

//         const itemPrices = await browser.$$('.inventory_item_price');
//         const currentPrices = await Promise.all(itemPrices.map(async el => parseFloat((await el.getText()).replace('$', ''))));

//         expect(currentPrices).toEqual(sortedPricesDesc);
//     });

//     it('should sort products by name ascending', async () => {
//         await (await browser.$('.select_container .product_sort_container')).selectByAttribute('value', 'az');

//         const itemNames = await browser.$$('.inventory_item_name');
//         const currentNames = await Promise.all(itemNames.map(async el => (await el.getText()) as string));

//         expect(currentNames).toEqual(sortedNamesAsc);
//     });

//     it('should sort products by name descending', async () => {
//         await (await browser.$('.select_container .product_sort_container')).selectByAttribute('value', 'za');

//         const itemNames = await browser.$$('.inventory_item_name');
//         const currentNames = await Promise.all(itemNames.map(async el => (await el.getText()) as string));

//         expect(currentNames).toEqual(sortedNamesDesc);
//     });

//     after(async () => {
//         await browser.deleteSession();
//     });
// });
