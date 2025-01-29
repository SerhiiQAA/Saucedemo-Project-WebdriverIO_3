import { Browser, remote } from 'webdriverio';
import { LoginPage } from '../test/pages/LoginPage';
import { CartPage } from '../test/pages/CartPage';

let browser: Browser;
let loginPage: LoginPage;
let cartPage: CartPage;

export async function setup(): Promise<void> {
    browser = await remote({
        logLevel: 'info',
        path: '/',
        capabilities: {
            browserName: 'chrome'
        }
    });

    await browser.setWindowSize(1280, 720);
    loginPage = new LoginPage(browser);
    cartPage = new CartPage(browser);

    await loginPage.open();
    expect(await browser.getUrl()).toContain('https:');
    await loginPage.login('standard_user', 'secret_sauce');
}

export async function teardown(): Promise<void> {
    await browser.deleteSession();
}
