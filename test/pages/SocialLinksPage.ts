import { Browser } from 'webdriverio';

export class SocialLinksPage {
  private browser: Browser;

  constructor(browser: Browser) {
    this.browser = browser;
  }

  get selectors() {
    return {
      twitterIcon: '.social_twitter',
      facebookIcon: '.social_facebook',
      linkedInIcon: '.social_linkedin'
    };
  }

  async clickTwitter(): Promise<void> {
    await this.browser.$(this.selectors.twitterIcon).click();
  }

  async clickFacebook(): Promise<void> {
    await this.browser.$(this.selectors.facebookIcon).click();
  }

  async clickLinkedIn(): Promise<void> {
    await this.browser.$(this.selectors.linkedInIcon).click();
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
