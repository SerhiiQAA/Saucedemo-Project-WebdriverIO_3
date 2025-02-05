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
        await loginPage.login('standard_user', 'secret_sauce');
        await expect(await browser.getUrl()).toContain('/inventory.html');
    });

    it('Checkout with product (Test Case ID 8)', async () => {
        await checkoutPage.openCart();
        await expect(await checkoutPage.getTitleText()).toBe('Your Cart');
        await expect(await browser.getUrl()).toContain('/cart.html');
        
        await checkoutPage.checkout();
        await expect(await checkoutPage.getTitleText()).toBe('Checkout: Your Information');
        await expect(await browser.getUrl()).toContain('/checkout-step-one.html');
        await expect(await checkoutPage.isCheckoutInfoDisplayed()).toBe(true);

        await checkoutPage.fillCheckoutInfo('James', 'Bond', '111111');
        await expect(await checkoutPage.getTitleText()).toBe('Checkout: Overview');
        await expect(await browser.getUrl()).toContain('/checkout-step-two.html');

        await checkoutPage.finishCheckout();
        await expect(await checkoutPage.getTitleText()).toBe('Checkout: Complete!');
        await expect(await browser.getUrl()).toContain('/checkout-complete.html');
        await expect(await checkoutPage.getCompleteHeaderText()).toBe('Thank you for your order!');

        await checkoutPage.backToProducts();
        await expect(await checkoutPage.getTitleText()).toBe('Products');
        await expect(await browser.getUrl()).toContain('/inventory.html');
    });

    it('Checkout without products (Test Case ID 9)', async () => {
        await checkoutPage.openCart();
        await expect(await checkoutPage.getTitleText()).toBe('Your Cart');
        await expect(await browser.getUrl()).toContain('/cart.html');
        await expect(await checkoutPage.isCartEmpty()).toBe(true);

        await checkoutPage.checkout();
        await expect(await checkoutPage.getTitleText()).toBe('Your Cart');
        await expect(await browser.getUrl()).toContain('/cart.html');
        await expect(await checkoutPage.getCartContentsText()).toBe('Cart is empty');
    });
});
