import { LoginPage } from '../pages/LoginPage';
import { MenuPage } from '../pages/MenuPage';
import { setWindowSize } from '../../utils/windowUtils';

describe('SauceDemo tests', () => {
    let loginPage: LoginPage;
    let menuPage: MenuPage;

    before(async () => {
        //Window sizes: web, tablet, mobile
        await setWindowSize(browser);
        
        loginPage = new LoginPage(browser);
        menuPage = new MenuPage(browser);
    });

    beforeEach(async () => {
        await loginPage.open();
        await loginPage.login('standard_user', 'secret_sauce');
        expect(await browser.getUrl()).toContain('/inventory.html');
    });

    it('Menu components (Test Case ID 4)', async () => {
        await menuPage.openMenu();
        const menuItemsCount = await menuPage.getMenuItemsCount();
        expect(menuItemsCount).toBe(4);
    });

    it('Logout', async () => {
        await menuPage.openMenu();

        const initialUrl = await menuPage.getCurrentUrl();
        await menuPage.logout();
        
        const newUrl = await menuPage.getCurrentUrl();
        expect(newUrl).not.toBe(initialUrl);

        //Checking that the input fields are empty
        expect(await menuPage.getUsernameValue()).toHaveValue('');
        expect(await menuPage.getPasswordValue()).toHaveValue('');
    });
});

