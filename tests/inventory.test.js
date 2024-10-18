require('dotenv').config();
const { chromium } = require('playwright');
const InventoryPage = require('../pageObjects/inventoryPage');
const LoginPage = require('../pageObjects/loginPage');

describe('Inventory Tests', () => {
    let browser, page, inventoryPage, loginPage;

    beforeAll(async () => {
        browser = await chromium.launch();
        page = await browser.newPage();
        loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page);
        await page.goto('https://www.saucedemo.com/');
        await loginPage.login('standard_user', 'secret_sauce');
    });

    afterAll(async () => {
        await browser.close();
    });

    test('Select 2 items', async () => {
        await inventoryPage.addItemToCart(0);
        await inventoryPage.addItemToCart(1);
        expect(await inventoryPage.getItemsCount()).toBe(6); // 6 items in the inventory
    });

    test('Select 3 items', async () => {
        await inventoryPage.addItemToCart(2);
        expect(await inventoryPage.getItemsCount()).toBe(6);
    });

    test('Select 4 items', async () => {
        await inventoryPage.addItemToCart(3);
        expect(await inventoryPage.getItemsCount()).toBe(6);
    });
});
