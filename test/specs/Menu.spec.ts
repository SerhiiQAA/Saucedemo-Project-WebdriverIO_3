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

    // The tests below do not pass yet, as the corresponding features have not been implemented. 
    // This is for the future. Please comment and run the following tests as needed
    // Uncomment and implement the following tests if needed

    // it('About', async () => {
    //     await menuPage.openMenu();
        
    //     await (await browser.$('#about_sidebar_link')).click();
        
    //     await browser.pause(1000);
    //     expect(await browser.getUrl()).toContain('saucelabs.com');
        
    //     const box = await browser.$('.MuiBox-root.css-6ohz81');
    //     expect(await box.getText()).toContain('The world relies on your code.');
    // });

    // it('All Items', async () => {
    //     await menuPage.openMenu();
        
    //     await (await browser.$('#reset_sidebar_link')).click();
        
    //     expect(await browser.getUrl()).not.toBe('https://www.saucedemo.com/inventory.html');
    // });

    // it('Reset App State', async () => {
    //     await menuPage.openMenu();
        
    //     await (await browser.$('#reset_sidebar_link')).click();
        
    //     expect(await browser.getUrl()).not.toBe('https://www.saucedemo.com/inventory.html');
    // });
});

