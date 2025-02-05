import { LoginPage } from '../pages/LoginPage';
import { SocialLinksPage } from '../pages/SocialLinksPage';
import { setWindowSize } from '../../utils/windowUtils';

describe('Social Media Links', () => {
    let loginPage: LoginPage;
    let socialMediaPage: SocialLinksPage;

    before(async () => {
        await setWindowSize(browser);
        loginPage = new LoginPage(browser);
        socialMediaPage = new SocialLinksPage(browser);

        await loginPage.open();
        await loginPage.login('standard_user', 'secret_sauce');
        await expect(await browser.getUrl()).toContain('/inventory.html');
    });

    it('should open Twitter page (Test Case ID 7 / 1)', async () => {
        await socialMediaPage.clickTwitter();

        const handles = await socialMediaPage.getWindowHandles();
        await expect(handles.length).toBeGreaterThan(1);

        await browser.switchToWindow(handles[1]);
        await expect(await socialMediaPage.getCurrentUrl()).toMatch(/https:\/\/(twitter|x)\.com\/saucelabs/);

        await browser.closeWindow();
        await browser.switchToWindow(handles[0]);
    });

    it('should open Facebook page (Test Case ID 7 / 2)', async () => {
        await socialMediaPage.clickFacebook();

        const handles = await socialMediaPage.getWindowHandles();
        await expect(handles.length).toBeGreaterThan(1);

        await browser.switchToWindow(handles[1]);
        await expect(await socialMediaPage.getCurrentUrl()).toBe('https://www.facebook.com/saucelabs');

        await browser.closeWindow();
        await browser.switchToWindow(handles[0]);
    });

    it('should open LinkedIn page (Test Case ID 7 / 3)', async () => {
        await socialMediaPage.clickLinkedIn();

        const handles = await socialMediaPage.getWindowHandles();
        await expect(handles.length).toBeGreaterThan(1);

        await browser.switchToWindow(handles[1]);
        await expect(await socialMediaPage.getCurrentUrl()).toBe('https://www.linkedin.com/company/sauce-labs/');

        await browser.closeWindow();
        await browser.switchToWindow(handles[0]);
    });
});
