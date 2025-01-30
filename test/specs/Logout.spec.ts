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

    it('Logout (Test Case ID 4)', async () => {
        await cartPage.openMenu();
        await cartPage.logout();
        
        //Fields are empty
        expect(await cartPage.getUsernameValue()).toBe('');
        expect(await cartPage.getPasswordValue()).toBe('');

    });
});
