import { LoginPage } from '../pages/LoginPage';  
import { setWindowSize } from '../../utils/windowUtils';

describe('SauceDemo tests', () => {
    let page: LoginPage;

    before(async () => {
        await setWindowSize(browser);
        page = new LoginPage(browser);
    });

    beforeEach(async () => {
        await page.open();
    });

    it('Valid data (Test Case ID 1)', async () => {
        expect(await page.getPasswordFieldType()).toBe('disc');

        await page.login('standard_user', 'secret_sauce');

        expect(await page.getTitleText()).toBe('Products');
        expect(await browser.getUrl()).toContain('/inventory.html');
        expect(await page.isInventoryListDisplayed()).toBe(true);
        expect(await page.getInventoryItemsCount()).toBe(6);
    });

    it('Password invalid (Test Case ID 2)', async () => {
        await page.login('standard_user', 'secret_sauce111111111111111111111');
        expect(await page.isErrorIconDisplayed()).toBe(true);
        expect(await page.isErrorButtonDisplayed()).toBe(true);
        expect(await page.getErrorMessage()).toHaveText('Epic sadface: Username and password do not match any user in this service');
    });

    it('Login invalid (Test Case ID 3)', async () => {
        await page.login('standard_user11111111111111', 'secret_sauce');
        expect(await page.isErrorIconDisplayed()).toBe(true);
        expect(await page.isErrorButtonDisplayed()).toBe(true);
        expect(await page.getErrorMessage()).toHaveText('Epic sadface: Username and password do not match any user in this service');
    });

    it('Empty fields', async () => {
        await page.login('', '');
        expect(await page.isErrorIconDisplayed()).toBe(true);
        expect(await page.isErrorButtonDisplayed()).toBe(true);
        expect(await page.getErrorMessage()).toHaveText('Epic sadface: Username is required');
    });
});
