import { remote, Browser } from 'webdriverio';
import { LoginPage } from '../pages/LoginPage';
import { MenuPage } from '../pages/MenuPage';

describe('SauceDemo tests', () => {
    let browser: Browser;
    let loginPage: LoginPage;
    let menuPage: MenuPage;

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
        menuPage = new MenuPage(browser);

        await loginPage.open();
        expect(await browser.getUrl()).toContain('https:');
        await loginPage.login('standard_user', 'secret_sauce');
    });

    afterEach(async () => {
        await browser.deleteSession();
    });

    it('Logout (Test Case ID 4)', async () => {
        await menuPage.openMenu();
        const menuItemsCount = await menuPage.getMenuItemsCount();

        //4 items are displayed
        expect(menuItemsCount).toBe(4);
   
        const initialUrl = await menuPage.getCurrentUrl();
        await menuPage.logout();
        
        const newUrl = await menuPage.getCurrentUrl();
        expect(newUrl).not.toBe(initialUrl);

        //Checking that the input fields are empty
        expect(await menuPage.getUsernameValue()).toBe('');
        expect(await menuPage.getPasswordValue()).toBe('');
    })
})