import { remote, Browser } from 'webdriverio';
import { LoginPage } from '../pages/LoginPage';
import { SocialLinksPage } from '../pages/SocialLinksPage';
import { setWindowSize } from '../../utils/windowUtils';


describe('Social Media Links', () => {
    let browser: Browser;
    let loginPage: LoginPage;
    let socialMediaPage: SocialLinksPage;

    beforeEach(async () => {
        browser = await remote({
            logLevel: 'info',
            path: '/',
            capabilities: {
                browserName: 'chrome'
            }
        });

        // web: { width: 1280, height: 720 },
        // mobile: { width: 375, height: 667 },
        // laptop: { width: 1440, height: 900 };
        await setWindowSize(browser);

        loginPage = new LoginPage(browser);
        socialMediaPage = new SocialLinksPage(browser);

        await loginPage.open();
        await loginPage.login('standard_user', 'secret_sauce');
    });

    afterEach(async () => {
        await browser.deleteSession();
    });

    // Footer Links (Test Case ID 7)
    it('should open Twitter page (Test Case ID 7 / 1)', async () => {
        await socialMediaPage.clickTwitter();

        const handles = await socialMediaPage.getWindowHandles();
        expect(handles.length).toBeGreaterThan(1);

        await socialMediaPage.switchToWindow(handles[1]);
        const currentUrl = await socialMediaPage.getCurrentUrl();
        
        //We check whether the URL matches the old twitter.com domain or the new x.com domain
        expect(currentUrl).toMatch(/https:\/\/(twitter|x)\.com\/saucelabs/);  
    });

    it('should open Facebook page (Test Case ID 7 / 2)', async () => {
        await socialMediaPage.clickFacebook();

        const handles = await socialMediaPage.getWindowHandles();
        expect(handles.length).toBeGreaterThan(1);

        await socialMediaPage.switchToWindow(handles[1]);
        expect(await socialMediaPage.getCurrentUrl()).toBe('https://www.facebook.com/saucelabs');
    });

    it('should open LinkedIn page (Test Case ID 7 / 3)', async () => {
        await socialMediaPage.clickLinkedIn();

        const handles = await socialMediaPage.getWindowHandles();
        expect(handles.length).toBeGreaterThan(1);

        await socialMediaPage.switchToWindow(handles[1]);
        expect(await socialMediaPage.getCurrentUrl()).toBe('https://www.linkedin.com/company/sauce-labs/');
    });
});













// import { remote } from 'webdriverio';

// describe('template spec', () => {
//     it('Menu components', async () => {
//         const browser = await remote({
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

//         // You can uncomment these lines if you need to perform click actions
//         await (await browser.$('[data-test="social-twitter"]')).click();
//         await (await browser.$('[data-test="social-facebook"]')).click();
//         await (await browser.$('[data-test="social-linkedin"]')).click();
        
//         await browser.deleteSession();
//     });
// });

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
        
//         await browser.pause(1000); // Equivalent to cy.wait(1000)
//     });

//     it('should open Twitter page', async () => {
//         const twitterLink = await browser.$('[data-test="social-twitter"]');
//         const url = await twitterLink.getAttribute('href');
//         expect(url).toBe('https://twitter.com/saucelabs');
//     });

//     it('should open Facebook page', async () => {
//         const facebookLink = await browser.$('[data-test="social-facebook"]');
//         const url = await facebookLink.getAttribute('href');
//         expect(url).toBe('https://www.facebook.com/saucelabs');
//     });

//     it('should open LinkedIn page', async () => {
//         const linkedInLink = await browser.$('[data-test="social-linkedin"]');
//         const url = await linkedInLink.getAttribute('href');
//         expect(url).toBe('https://www.linkedin.com/company/sauce-labs/');
//     });

//     afterEach(async () => {
//         await browser.deleteSession();
//     });
// });
