const {test, expect} = require('@playwright/test')


test('page fixture test', async ({page})=>{
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    await page.locator('input#username').fill('rahul')
    await page.locator('input#username').fill('')
    await page.locator('input#username').fill('rahulshettyacademy');
    await page.locator('input#password').fill('learning');
    // await page.locator('input#signInBtn').click();
    // await expect(page.locator("div[style*='block']")).toContainText('Incorrect');
    // console.log(await page.locator('h4.card-title a').nth(0).textContent());
    // console.log(await page.locator('h4.card-title a').first().textContent());
    // console.log(await page.locator('h4.card-title a').last().textContent());

    await page.locator('input#usertype').nth(1).check();
    await page.locator('button#okayBtn').click();
    // await page.pause();
    
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

test('child window test', async ({browser}) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const pagelink = await page.locator('[href*="documents-request"]'); 

    const [newPage] = await Promise.all([context.waitForEvent('page'), pagelink.click()]);

    let linktext = await newPage.locator('.red').textContent();
    let finaltext = linktext.split('@')[1].split(' ')[0]
    console.log(finaltext);
    
    
});

test('playwright selectors test', async({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://rahulshettyacademy.com/angularpractice/');
    await page.getByLabel('Check me out if you Love IceCreams!').check();
    await page.getByLabel(/Stu/).check();
    await page.getByLabel(/Gend/).selectOption('Female');
    await page.getByPlaceholder(/Pass/).fill('mypassword');
    
});











