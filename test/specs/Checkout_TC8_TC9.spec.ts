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
        const titleText = await checkoutPage.getTitleText();
        await expect(titleText).toBe('Your Cart');
        expect(await browser.getUrl()).toContain('/cart.html');
        
        await checkoutPage.checkout();
        const checkoutTitleText = await checkoutPage.getTitleText();
        await expect(checkoutTitleText).toBe('Checkout: Your Information');
        expect(await browser.getUrl()).toContain('/checkout-step-one.html');
        expect(await checkoutPage.isCheckoutInfoDisplayed()).toBe(true);

        await checkoutPage.fillCheckoutInfo('James', 'Bond', '111111');
        const overviewTitleText = await checkoutPage.getTitleText();
        await expect(overviewTitleText).toBe('Checkout: Overview');
        expect(await browser.getUrl()).toContain('/checkout-step-two.html');

        await checkoutPage.finishCheckout();
        const completeTitleText = await checkoutPage.getTitleText();
        await expect(completeTitleText).toBe('Checkout: Complete!');
        expect(await browser.getUrl()).toContain('/checkout-complete.html');
        const completeHeaderText = await checkoutPage.getCompleteHeaderText();
        await expect(completeHeaderText).toBe('Thank you for your order!');

        await checkoutPage.backToProducts();
        const productsTitleText = await checkoutPage.getTitleText();
        await expect(productsTitleText).toBe('Products');
        expect(await browser.getUrl()).toContain('/inventory.html');
    });

    it('Checkout without products (Test Case ID 9)', async () => {
        await checkoutPage.openCart();
        const titleText = await checkoutPage.getTitleText();
        await expect(titleText).toBe('Your Cart');
        expect(await browser.getUrl()).toContain('/cart.html');
        expect(await checkoutPage.isCartEmpty()).toBe(true);

        await checkoutPage.checkout();
        const cartTitleText = await checkoutPage.getTitleText();
        await expect(cartTitleText).toBe('Your Cart');
        expect(await browser.getUrl()).toContain('/cart.html');
        const cartContentsText = await checkoutPage.getCartContentsText();
        await expect(cartContentsText).toBe('Cart is empty');
    });
});
