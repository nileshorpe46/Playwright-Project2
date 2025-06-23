const { test, expect } = require('@playwright/test');
const { POManager } = require('../pageobjects/POManager');


test('Page object model test', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage();

    const url = 'https://rahulshettyacademy.com/client';
    const username = 'nilesh.orpe@gmail.com';
    const password = 'Nilesh@123';
    await loginPage.openUrl(url);
    await loginPage.doLogin(username, password);

    const productName='ADIDAS ORIGINAL';
    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.addProductToCart(productName);
    await dashboardPage.navigateToCart();

    const cartPage = poManager.getCartPage();
    await expect(await cartPage.getCartItemLocator(productName)).toBeVisible();
    await cartPage.navigateToOrderPage();
    
    const orderPage = poManager.getOrderPage();
    expect()

    await page.pause();
})