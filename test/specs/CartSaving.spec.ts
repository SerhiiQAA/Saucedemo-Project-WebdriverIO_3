import { remote, Browser } from 'webdriverio';
import { LoginPage } from '../pages/LoginPage';
import { CartPage } from '../pages/CartPage';

describe('SauceDemo tests', () => {
    let browser: Browser;
    let loginPage: LoginPage;
    let cartPage: CartPage;

    beforeEach(async () => {
        browser = await remote({
            logLevel: 'info',
            path: '/',
            capabilities: {
                browserName: 'chrome'
            }
        });

        await browser.setWindowSize(1280, 720);
        loginPage = new LoginPage(browser);
        cartPage = new CartPage(browser);

        await loginPage.open();
        expect(await browser.getUrl()).toContain('https:');
        await loginPage.login('standard_user', 'secret_sauce');
    });

    afterEach(async () => {
        await browser.deleteSession();
    });

    //We randomly select a product from the ones available on the page each time we run the test

    it('Saving the cart after logout (Test Case ID )', async () => {
        await cartPage.addRandomProductToCart();
        expect(await cartPage.getCartBadgeText()).toContain('1');
        
        await cartPage.openMenu();
        await cartPage.logout();
        
        expect(await cartPage.getUsernameValue()).toBe('');
        expect(await cartPage.getPasswordValue()).toBe('');
        
        //Check that the added product has a Remove button
        await loginPage.login('standard_user', 'secret_sauce');
        expect(await cartPage.getCartBadgeText()).toContain('1');
        expect(await cartPage.getInventoryText()).toContain('Remove');
    });
});















// import { remote } from 'webdriverio';

// describe('template spec', () => {
//     it('Saving the cart after logout', async () => {
//         const browser = await remote({
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
        
//         const buttons = await browser.$$('.pricebar button');
//         expect(buttons).toBeElementsArrayOfSize(6);

//         const randomIndex = Math.floor(Math.random() * await buttons.length);
//         await buttons[randomIndex].click();
        
//         const cartBadge = await browser.$('[data-test="shopping-cart-badge"]');
//         expect(await cartBadge.getText()).toContain('1');
        
//         await (await browser.$('.bm-burger-button')).click();
//         await (await browser.$('[data-test="logout-sidebar-link"]')).click();
        
//         expect(await (await browser.$('[data-test="username"]')).getValue()).toBe('');
//         expect(await (await browser.$('[data-test="password"]')).getValue()).toBe('');
        
//         await (await browser.$('[data-test="username"]')).setValue('standard_user');
//         await (await browser.$('[data-test="password"]')).setValue('secret_sauce');
//         await (await browser.$('[data-test="login-button"]')).click();
        
//         expect(await cartBadge.getText()).toContain('1');
//         expect(await (await browser.$('.inventory_list')).getText()).toContain('Remove');
        
//         await browser.deleteSession();
//     });
// });
