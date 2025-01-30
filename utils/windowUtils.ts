import { windowSizes, defaultSize } from './windowSizes';

export async function setWindowSize(browser: any, option: string = defaultSize) {
    const size = windowSizes[option];
    if (size) {
        const { width, height } = size;
        await browser.setWindowSize(width, height);
    } else {
        throw new Error(`Wrong size option: ${option}`);
    }
}
