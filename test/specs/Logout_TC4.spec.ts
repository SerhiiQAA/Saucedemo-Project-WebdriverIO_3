import { LoginPage } from '../pages/LoginPage';
import { MenuPage } from '../pages/MenuPage';
import { setWindowSize } from '../../utils/windowUtils';

describe('SauceDemo tests', () => {
    let loginPage: LoginPage;
    let menuPage: MenuPage;

    before(async () => {
        await setWindowSize(browser);
        
        loginPage = new LoginPage(browser);
        menuPage = new MenuPage(browser);
    });

    beforeEach(async () => {
        await loginPage.open();
        await loginPage.login('standard_user', 'secret_sauce');
        await expect(await browser.getUrl()).toContain('/inventory.html');
    });

    it('Logout (Test Case ID 4)', async () => {
        await menuPage.openMenu();
        const menuItemsCount = await menuPage.getMenuItemsCount();

        expect(menuItemsCount).toBe(4);
   
        const initialUrl = await menuPage.getCurrentUrl();
        await menuPage.logout();
        
        const newUrl = await menuPage.getCurrentUrl();
        expect(newUrl).not.toBe(initialUrl);

        expect(await menuPage.getUsernameValue()).toHaveValue('');
        expect(await menuPage.getPasswordValue()).toHaveValue('');
    })
})
