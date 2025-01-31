import { remote, Browser } from 'webdriverio';
import { LoginPage } from '../pages/LoginPage';
import { CartPage } from '../pages/CartPage';
import { setWindowSize } from '../../utils/windowUtils';


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

        // Possible options:
        // web: { width: 1280, height: 800 },
        // tablet: { width: 768, height: 1024 },
        // mobile: { width: 375, height: 812 };
        await setWindowSize(browser);

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

    it('Saving the cart after logout (Test Case ID 5)', async () => {
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