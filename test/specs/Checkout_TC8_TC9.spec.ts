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
        expect(await browser.getUrl()).toContain('/inventory.html');
    });

    it('Checkout with product (Test Case ID 8)', async () => {
        await checkoutPage.openCart();
        await expect(checkoutPage.title).toHaveText('Your Cart');
        expect(await browser.getUrl()).toContain('/cart.html');
        
        await checkoutPage.checkout();
        await expect(checkoutPage.title).toHaveText('Checkout: Your Information');
        expect(await browser.getUrl()).toContain('/checkout-step-one.html');
        expect(await checkoutPage.isCheckoutInfoDisplayed()).toBe(true);

        await checkoutPage.fillCheckoutInfo('James', 'Bond', '111111');
        await expect(checkoutPage.title).toHaveText('Checkout: Overview');
        expect(await browser.getUrl()).toContain('/checkout-step-two.html');

        await checkoutPage.finishCheckout();
        await expect(checkoutPage.title).toHaveText('Checkout: Complete!');
        expect(await browser.getUrl()).toContain('/checkout-complete.html');
        await expect(checkoutPage.completeHeader).toHaveText('Thank you for your order!');

        await checkoutPage.backToProducts();
        await expect(checkoutPage.title).toHaveText('Products');
        expect(await browser.getUrl()).toContain('/inventory.html');
    });

    it('Checkout without products (Test Case ID 9)', async () => {
        await checkoutPage.openCart();
        await expect(checkoutPage.title).toHaveText('Your Cart');
        expect(await browser.getUrl()).toContain('/cart.html');
        expect(await checkoutPage.isCartEmpty()).toBe(true);

        await checkoutPage.checkout();
        await expect(checkoutPage.title).toHaveText('Your Cart');
        expect(await browser.getUrl()).toContain('/cart.html');
        await expect(checkoutPage.cartContentsContainer).toHaveText('Cart is empty');
    });
});
