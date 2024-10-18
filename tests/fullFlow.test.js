require('dotenv').config();
const { chromium } = require('playwright');
const LoginPage = require('../pageObjects/loginPage');
const InventoryPage = require('../pageObjects/inventoryPage');
const CartPage = require('../pageObjects/cartPage');

describe('Full Shopping Flow', () => {
    let browser, page, loginPage, inventoryPage, cartPage;

    beforeAll(async () => {
        browser = await chromium.launch();
        page = await browser.newPage();
        loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page);
        cartPage = new CartPage(page);
        await page.goto('https://www.saucedemo.com/');
        await loginPage.login('standard_user', 'secret_sauce');
    });

    afterAll(async () => {
        await browser.close();
    });

    test('Full flow: Login -> Select items -> Checkout', async () => {
        // Randomly select 2 items
        await inventoryPage.addItemToCart(0);
        await inventoryPage.addItemToCart(1);
        // Go to cart
        await inventoryPage.goToCart(); // Use the method here
        // Remove an item
        await cartPage.removeItem(0); // remove the first item
        // Proceed to checkout
        await cartPage.checkout();
        // Fill the checkout form
        await page.fill('#first-name', 'John');
        await page.fill('#last-name', 'Doe');
        await page.fill('#postal-code', '12345');
        await page.click('.btn_primary');
        // Finish the checkout process
        await page.click('.btn_action');
        expect(await page.isVisible('h2.complete-header')).toBeTruthy(); // Check for the confirmation message
    });
    
});
