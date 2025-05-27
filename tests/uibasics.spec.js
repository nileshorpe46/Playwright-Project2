const {test, expect} = require('@playwright/test')


test('page fixture test', async ({page})=>{
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    await page.locator('input#username').fill('rahul')
    await page.locator('input#username').fill('')
    await page.locator('input#username').fill('rahulshettyacademy');
    await page.locator('input#password').fill('learning');
    await page.locator('input#signInBtn').click();
    // await expect(page.locator("div[style*='block']")).toContainText('Incorrect');
    console.log(await page.locator('h4.card-title a').nth(0).textContent());
    console.log(await page.locator('h4.card-title a').first().textContent());
    console.log(await page.locator('h4.card-title a').last().textContent());
});


test('wait mechanism test', async ({page})=>{
    await page.goto('https://rahulshettyacademy.com/client');
    await page.locator('input#userEmail').fill('anshika@gmail.com');
    await page.locator('input#userPassword').fill('Iamking@000');
    await page.locator('#login').click();
    // await page.waitForLoadState('networkidle');
    await page.locator('div.card-body b').last().waitFor();
    let list = await page.locator('div.card-body b').allTextContents();
    console.log(list);
    

})