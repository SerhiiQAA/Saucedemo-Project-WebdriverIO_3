import { LoginPage } from '../pages/LoginPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { setWindowSize } from '../../utils/windowUtils';

describe('SauceDemo tests', () => {
    let loginPage: LoginPage;
    let checkoutPage: CheckoutPage;

    before(async () => {
        await setWindowSize(browser);
        loginPage = new LoginPage(browser);
        checkoutPage = new CheckoutPage(browser);
    });

    beforeEach(async () => {
        await loginPage.open();
        expect(await browser.getUrl()).toContain('https:');
        await loginPage.login('standard_user', 'secret_sauce');
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
        // success messege
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
        //error message
        expect(await checkoutPage.getCartContentsText()).toContain('Cart is empty');
    });
});
