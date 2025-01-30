import { remote, Browser } from 'webdriverio';
import { LoginPage } from '../pages/LoginPage';
import { MenuPage } from '../pages/MenuPage';
import { setWindowSize } from '../../utils/windowUtils';

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

        // Possible options:
        // web: { width: 1280, height: 800 },
        // tablet: { width: 768, height: 1024 },
        // mobile: { width: 375, height: 812 };
        await setWindowSize(browser);


        loginPage = new LoginPage(browser);
        menuPage = new MenuPage(browser);

        await loginPage.open();
        expect(await browser.getUrl()).toContain('https:');
        await loginPage.login('standard_user', 'secret_sauce');
    });

    afterEach(async () => {
        await browser.deleteSession();
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
        expect(await menuPage.getUsernameValue()).toBe('');
        expect(await menuPage.getPasswordValue()).toBe('');
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












// import { remote } from 'webdriverio';

// describe('template spec', () => {
//     let browser: WebdriverIO.Browser;

//     beforeEach(async () => {
//         browser = await remote({
//             logLevel: 'info',
//             path: '/',
//             capabilities: {
//                 browserName: 'chrome'
//             }
//         });

//         await browser.setWindowSize(1280, 720);
//         await browser.url('https://www.saucedemo.com/');
//         expect(await browser.getUrl()).toContain('https:');

//         await (await browser.$('[data-test="username"]')).setValue('standard_user');
//         await (await browser.$('[data-test="password"]')).setValue('secret_sauce');
//         await (await browser.$('[data-test="login-button"]')).click();
//     });

//     it('Menu components', async () => {
//         await (await browser.$('.bm-burger-button')).click();
        
//         const menuItems = await browser.$$('.bm-item-list a');
//         expect(menuItems.length).toBe(4);

        // const expectedNames = ['All Items', 'About', 'Logout', 'Reset App State'];
        // for (let i = 0; i < menuItems.length; i++) {
        //     const itemText = await menuItems[i].getText();
        //     expect(itemText).toBe(expectedNames[i]);
        // }
    // });

    // it('Logout', async () => {
    //     await (await browser.$('.bm-burger-button')).click();
        
    //     const initialUrl = await browser.getUrl();
        
    //     await (await browser.$('[data-test="logout-sidebar-link"]')).click();
        
    //     const newUrl = await browser.getUrl();
    //     expect(newUrl).not.toBe(initialUrl);

    //     expect(await (await browser.$('[data-test="username"]')).getValue()).toBe('');
    //     expect(await (await browser.$('[data-test="password"]')).getValue()).toBe('');
    // });

    // Uncomment and implement the following tests if needed

    // it('About', async () => {
    //     await (await browser.$('.bm-burger-button')).click();
        
    //     await (await browser.$('#about_sidebar_link')).click();
        
    //     await browser.pause(1000);
    //     expect(await browser.getUrl()).toContain('saucelabs.com');
        
    //     const box = await browser.$('.MuiBox-root.css-6ohz81');
    //     expect(await box.getText()).toContain('The world relies on your code.');
    // });

    // it('All Items', async () => {
    //     await (await browser.$('.bm-burger-button')).click();
        
    //     await (await browser.$('#reset_sidebar_link')).click();
        
    //     expect(await browser.getUrl()).not.toBe('https://www.saucedemo.com/inventory.html');
    // });

    // it('Reset App State', async () => {
    //     await (await browser.$('.bm-burger-button')).click();
        
    //     await (await browser.$('#reset_sidebar_link')).click();
        
    //     expect(await browser.getUrl()).not.toBe('https://www.saucedemo.com/inventory.html');
    // });

//     afterEach(async () => {
//         await browser.deleteSession();
//     });
// });
