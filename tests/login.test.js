const { chromium } = require('playwright');
const LoginPage = require('../pageObjects/loginPage');

describe('Login Tests', () => {
    let browser, page, loginPage;

    beforeAll(async () => {
        browser = await chromium.launch();
        page = await browser.newPage();
        loginPage = new LoginPage(page);
    });

    afterAll(async () => {
        await browser.close();
    });

    test('Valid login', async () => {
        await page.goto('https://www.saucedemo.com/');
        await loginPage.login('standard_user', 'secret_sauce');
        expect(await page.url()).toContain('inventory.html');
    });
});