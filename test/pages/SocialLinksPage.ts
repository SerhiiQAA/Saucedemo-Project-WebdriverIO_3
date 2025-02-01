import { Browser } from 'webdriverio';

export class SocialLinksPage {
    private browser: Browser;

    constructor(browser: Browser) {
        this.browser = browser;
    }

    get twitterIcon() { return this.browser.$('.social_twitter'); }
    get facebookIcon() { return this.browser.$('.social_facebook'); }
    get linkedInIcon() { return this.browser.$('.social_linkedin'); }

    async clickTwitter(): Promise<void> {
        await (await this.twitterIcon).click();
    }

    async clickFacebook(): Promise<void> {
        await (await this.facebookIcon).click();
    }

    async clickLinkedIn(): Promise<void> {
        await (await this.linkedInIcon).click();
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
