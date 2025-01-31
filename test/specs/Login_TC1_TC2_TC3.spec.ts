import { remote, Browser } from 'webdriverio';
import { LoginPage } from '../pages/LoginPage';  
import { setWindowSize } from '../../utils/windowUtils';

describe('SauceDemo tests', () => {
    let browser: Browser;
    let page: LoginPage;

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

        page = new LoginPage(browser);
        await page.open();
    });

    afterEach(async () => {
        await browser.deleteSession();
    });

    it('Valid data (Test Case ID 1)', async () => {
        expect(await browser.getUrl()).toContain('https:');

        //Checking the -webkit-text-security CSS property for the password field
        expect(await page.getPasswordFieldType()).toBe('disc');

        await page.login('standard_user', 'secret_sauce');

        //Checking the correctness of title, URL, page elements
        expect(await page.getTitleText()).toBe('Products');
        expect(await browser.getUrl()).toContain('/inventory.html');
        expect(await page.isInventoryListDisplayed()).toBe(true);
        expect(await page.getInventoryItemsCount()).toBe(6);
    });

    it('Password invalid (Test Case ID 2)', async () => {
        expect(await browser.getUrl()).toContain('https:');
        await page.login('standard_user', 'secret_sauce111111111111111111111');
        //'X' icons are displayed
        expect(await page.isErrorIconDisplayed()).toBe(true);
        expect(await page.isErrorButtonDisplayed()).toBe(true);
        //error message
        expect(await page.getErrorMessage()).toBe('Epic sadface: Username and password do not match any user in this service');
    });

    it('Login invalid (Test Case ID 3)', async () => {
        expect(await browser.getUrl()).toContain('https:');
        await page.login('standard_user11111111111111', 'secret_sauce');
        //'X' icons are displayed
        expect(await page.isErrorIconDisplayed()).toBe(true);
        expect(await page.isErrorButtonDisplayed()).toBe(true);
        //error message
        expect(await page.getErrorMessage()).toBe('Epic sadface: Username and password do not match any user in this service');
    });

    it('Empty fields', async () => {
        expect(await browser.getUrl()).toContain('https:');
        await page.login('', '');
        //'X' icons are displayed
        expect(await page.isErrorIconDisplayed()).toBe(true);
        expect(await page.isErrorButtonDisplayed()).toBe(true);
        //error message
        expect(await page.getErrorMessage()).toBe('Epic sadface: Username is required');
    });
});
