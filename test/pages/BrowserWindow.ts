import { remote } from 'webdriverio';

export class BrowserWindow {
    [x: string]: any;
    constructor(browser: any) {
        this.browser = browser;
        this.sizes = {
            web: { width: 1280, height: 800 },
            tablet: { width: 768, height: 1024 },
            mobile: { width: 375, height: 812 }
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