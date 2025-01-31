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

        // Possible options:
        // web: { width: 1280, height: 800 },
        // tablet: { width: 768, height: 1024 },
        // mobile: { width: 375, height: 812 };
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
