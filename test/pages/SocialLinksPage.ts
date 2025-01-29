import { Browser } from 'webdriverio';

export class SocialLinksPage {
    private browser: Browser;

    constructor(browser: Browser) {
        this.browser = browser;
    }

    async clickTwitter(): Promise<void> {
        await (await this.browser.$('[data-test="social-twitter"]')).click();
    }

    async clickFacebook(): Promise<void> {
        await (await this.browser.$('[data-test="social-facebook"]')).click();
    }

    async clickLinkedIn(): Promise<void> {
        await (await this.browser.$('[data-test="social-linkedin"]')).click();
    }

    async getWindowHandles(): Promise<string[]> {
        return await this.browser.getWindowHandles();
    }

    async switchToWindow(handle: string): Promise<void> {
        await this.browser.switchToWindow(handle);
    }

    async getCurrentUrl(): Promise<string> {
        return await this.browser.getUrl();
    }
}
