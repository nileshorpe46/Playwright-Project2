const {test, expect} = require('@playwright/test')


test('page fixture test', async ({page})=>{
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    await page.locator('input#username').fill('rahul')
    await page.locator('input#username').fill('')
    await page.locator('input#username').fill('rahulshettyacademy');
    await page.locator('input#password').fill('learning');
    await page.locator('input#signInBtn').click();
    // await expect(page.locator("div[style*='block']")).toContainText('Incorrect');
    
});