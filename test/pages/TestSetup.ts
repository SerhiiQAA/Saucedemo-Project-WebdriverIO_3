import { remote } from 'webdriverio';

export class TestSetup {
    browser: WebdriverIO.Browser | undefined;
    
    async initBrowser() {
        this.browser = await remote({
            logLevel: 'info',
            path: '/',
            capabilities: {
                browserName: 'chrome'
            }
        });
        await this.browser.setWindowSize(1280, 720);
    }
    
    async afterEach() {
        if (this.browser) {
            await this.browser.deleteSession();
            this.browser = undefined;
        }
    }
}