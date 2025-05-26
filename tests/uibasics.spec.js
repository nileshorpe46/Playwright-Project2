const {test} = require('@playwright/test')

test.only('browser fixture test', async({page})=>{
    // const context = await browser.newContext();
    // const page = await context.newPage();
    await page.goto('https://google.com');
});

test('page fixture test', async({page})=>{
    await page.goto('https://rahulshettyacademy.com/loginpagePractise');
});


