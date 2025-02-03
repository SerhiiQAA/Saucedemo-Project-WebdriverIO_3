import { LoginPage } from '../pages/LoginPage';
import { CartPage } from '../pages/CartPage';
import { setWindowSize } from '../../utils/windowUtils';

describe('SauceDemo tests', () => {
    let loginPage: LoginPage;
    let cartPage: CartPage;

    before(async () => {
        //Window sizes: web, tablet, mobile
        await setWindowSize(browser);
        
        loginPage = new LoginPage(browser);
        cartPage = new CartPage(browser);
    });

    beforeEach(async () => {
        await loginPage.open();
        await loginPage.login('standard_user', 'secret_sauce');
        expect(await browser.getUrl()).toContain('/inventory.html');
    });

    //We randomly select a product from the ones available on the page each time we run the test
    it('Saving the cart after logout (Test Case ID 5)', async () => {
        await cartPage.addRandomProductToCart();
        expect(await cartPage.getCartBadgeText()).toContain('1');
        
        await cartPage.openMenu();
        await cartPage.logout();
            
        await expect(cartPage.usernameField).toHaveValue('');
        await expect(cartPage.passwordField).toHaveValue('');
        
        //Check that the added product has a Remove button
        await loginPage.login('standard_user', 'secret_sauce');
        expect(await cartPage.getCartBadgeText()).toContain('1');
        expect(await cartPage.getInventoryText()).toContain('Remove');
    });
});
