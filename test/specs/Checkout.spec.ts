import { remote, Browser } from 'webdriverio';
import { LoginPage } from '../pages/LoginPage';
import { CheckoutPage } from '../pages/CheckoutPage';

describe('SauceDemo tests', () => {
    let browser: Browser;
    let loginPage: LoginPage;
    let checkoutPage: CheckoutPage;

    beforeEach(async () => {
        browser = await remote({
            logLevel: 'info',
            path: '/',
            capabilities: {
                browserName: 'chrome'
            }
        });

        await browser.setWindowSize(1280, 720);
        loginPage = new LoginPage(browser);
        checkoutPage = new CheckoutPage(browser);

        await loginPage.open();
        expect(await browser.getUrl()).toContain('https:');
        await loginPage.login('standard_user', 'secret_sauce');
    });

    afterEach(async () => {
        await browser.deleteSession();
    });

    it('Checkout with product (Test Case ID 8)', async () => {
        await checkoutPage.openCart();
        expect(await checkoutPage.getTitleText()).toBe('Your Cart');
        expect(await browser.getUrl()).toContain('/cart.html');
        
        await checkoutPage.checkout();
        expect(await checkoutPage.getTitleText()).toBe('Checkout: Your Information');
        expect(await browser.getUrl()).toContain('/checkout-step-one.html');
        expect(await checkoutPage.isCheckoutInfoDisplayed()).toBe(true);

        await checkoutPage.fillCheckoutInfo('James', 'Bond', '111111');
        expect(await checkoutPage.getTitleText()).toBe('Checkout: Overview');
        expect(await browser.getUrl()).toContain('/checkout-step-two.html');

        await checkoutPage.finishCheckout();
        expect(await checkoutPage.getTitleText()).toBe('Checkout: Complete!');
        expect(await browser.getUrl()).toContain('/checkout-complete.html');
        expect(await checkoutPage.getCompleteHeaderText()).toBe('Thank you for your order!');

        await checkoutPage.backToProducts();
        expect(await checkoutPage.getTitleText()).toBe('Products');
        expect(await browser.getUrl()).toContain('/inventory.html');
    });

    it('Checkout without products (Test Case ID 9)', async () => {
        await checkoutPage.openCart();
        expect(await checkoutPage.getTitleText()).toBe('Your Cart');
        expect(await browser.getUrl()).toContain('/cart.html');
        expect(await checkoutPage.isCartEmpty()).toBe(true);

        await checkoutPage.checkout();
        expect(await checkoutPage.getTitleText()).toBe('Your Cart');
        expect(await browser.getUrl()).toContain('/cart.html');
        expect(await checkoutPage.getCartContentsText()).toContain('Cart is empty');
    });
});











// import { remote } from 'webdriverio';

// describe('template spec', () => {
//     it('Checkout with product', async () => {
//         const browser = await remote({
//             logLevel: 'info',
//             path: '/',
//             capabilities: {
//                 browserName: 'chrome'
//             }
//         });

//         await browser.setWindowSize(1280, 720);
//         await browser.url('https://www.saucedemo.com/');
//         expect(await browser.getUrl()).toContain('https:');

//         await (await browser.$('[data-test="username"]')).setValue('standard_user');
//         await (await browser.$('[data-test="password"]')).setValue('secret_sauce');
//         await (await browser.$('[data-test="login-button"]')).click();
        
//         await (await browser.$('.shopping_cart_link')).click();
        
//         const title = await browser.$('.title');
//         expect(await title.getText()).toBe('Your Cart');
//         expect(await browser.getUrl()).toContain('/cart.html');
        
//         await (await browser.$('#checkout')).click();
        
//         expect(await title.getText()).toBe('Checkout: Your Information');
//         expect(await browser.getUrl()).toContain('/checkout-step-one.html');
        
//         expect(await (await browser.$('.checkout_info')).isDisplayed()).toBe(true);
        
//         await (await browser.$('#first-name')).setValue('James');
//         await (await browser.$('#last-name')).setValue('Bond');
//         await (await browser.$('#postal-code')).setValue('111111');
        
//         await (await browser.$('#continue')).click();
        
//         expect(await title.getText()).toBe('Checkout: Overview');
//         expect(await browser.getUrl()).toContain('/checkout-step-two.html');
        
//         await (await browser.$('#finish')).click();
        
//         expect(await title.getText()).toBe('Checkout: Complete!');
//         expect(await browser.getUrl()).toContain('/checkout-complete.html');
        
//         expect(await (await browser.$('.complete-header')).getText()).toBe('Thank you for your order!');
        
//         await (await browser.$('#back-to-products')).click();
        
//         expect(await title.getText()).toBe('Products');
//         expect(await browser.getUrl()).toContain('/inventory.html');
        
//         await browser.deleteSession();
//     });

//     it('Checkout without products', async () => {
//         const browser = await remote({
//             logLevel: 'info',
//             path: '/',
//             capabilities: {
//                 browserName: 'chrome'
//             }
//         });

//         await browser.setWindowSize(1280, 720);
//         await browser.url('https://www.saucedemo.com/');
//         expect(await browser.getUrl()).toContain('https:');

//         await (await browser.$('[data-test="username"]')).setValue('standard_user');
//         await (await browser.$('[data-test="password"]')).setValue('secret_sauce');
//         await (await browser.$('[data-test="login-button"]')).click();
        
//         await (await browser.$('.shopping_cart_link')).click();
        
//         const title = await browser.$('.title');
//         expect(await title.getText()).toBe('Your Cart');
//         expect(await browser.getUrl()).toContain('/cart.html');
        
//         expect(await (await browser.$('.cart_item')).isExisting()).toBe(false);
        
//         await (await browser.$('#checkout')).click();
        
//         expect(await title.getText()).toBe('Your Cart');
//         expect(await browser.getUrl()).toContain('/cart.html');
        
//         expect(await (await browser.$('.cart_contents_container')).getText()).toContain('Cart is empty');
        
//         await browser.deleteSession();
//     });
// });
