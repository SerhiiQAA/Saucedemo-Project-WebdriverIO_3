import { remote } from 'webdriverio';

export class BrowserWindow {
    [x: string]: any;
    constructor(browser: any) {
        this.browser = browser;
        this.sizes = {
            web: { width: 1280, height: 720 },
            mobile: { width: 375, height: 667 },
            laptop: { width: 1440, height: 900 }
        };
    }

    async setWindowSize(option: string | number) {
        if (this.sizes[option]) {
            const { width, height } = this.sizes[option];
            await this.browser.setWindowSize(width, height);
        } else {
            throw new Error(`Wrong size option: ${option}`);
        }
    }
}