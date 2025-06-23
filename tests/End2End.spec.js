const {test, expect} = require('@playwright/test');

test('Registration test', async ({browser}) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://rahulshettyacademy.com/client');
    await page.locator('a[href*="/auth/register"]').click();
    await page.locator('h1:has-text("Register")').waitFor();
    await page.locator('#firstName').fill('Nilesh');
    await page.locator('#lastName').fill('Orpe');
    await page.locator('#userEmail').fill('nilesh.orpe@gmail.com');
    await page.locator('#userMobile').fill('7893231539');
    await page.locator('select[formcontrolname="occupation"]').selectOption('2: Student');
    await page.getByRole('radio', { name: 'Male', exact: true }).click();
    await page.locator('input#userPassword').fill('Nilesh@123');
    await page.locator('input#confirmPassword').fill('Nilesh@123');
    await page.locator('input[formcontrolname="required"]').check();
    await page.locator('input#login').click();
});


test('end to end test', async ({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/client');
    await page.locator('input#userEmail').fill('nilesh.orpe@gmail.com');
    await page.locator('input#userPassword').fill('Nilesh@123');
    await page.locator('input#login').click();

    await page.waitForLoadState('networkidle');
    const products = page.locator('div.card-body');
    const productCount = await products.count();
    console.log(productCount);
    
    
    
    for(let i=0; i<productCount; i++){
        if(await products.nth(i).locator('b').textContent() == 'ADIDAS ORIGINAL'){
            await products.nth(i).locator('text="Add To Cart"').click();
            break;
        }
    }

    await page.locator('button[routerlink*="/cart"]').click();
    await page.locator('div.cart li').last().waitFor();
    expect(page.locator('h3:has-text("ADIDAS ORIGINAL")')).toBeVisible();

    await page.locator('button:has-text("Checkout")').click();
    await page.locator('div.payment').waitFor();
    
    expect(await page.locator('div.user__name label').textContent()).toBe('nilesh.orpe@gmail.com');
    
    await page.locator('input[placeholder="Select Country"]').pressSequentially('ind',{delay:100});
    const countries = page.locator('section.ta-results button');
    await countries.last().waitFor();
    const countryCount = await countries.count();

    for(let i=0; i<countryCount; i++){
        let country = await countries.nth(i).textContent();
        console.log(country);
        
        if(country.trim() == 'India'){
            await countries.nth(i).click();
            break;
        }
    }
    
    await page.locator('div.payment__cc input.input.txt').nth(1).fill('122');
    await page.locator('div.payment__cc input.input.txt').nth(2).fill('Nilesh');
    await page.locator('a.action__submit').click();
    await page.locator('h1.hero-primary').waitFor();
    expect(await page.locator('h1.hero-primary').textContent()).toEqual(' Thankyou for the order. ');

    const cartItems = page.locator('td.line-item.product-info-column').first().locator('div');
    const cartItemsCount = await cartItems.count();
    let flag = false;

    for(let i=0; i<cartItemsCount; i++){
        const itemName = await cartItems.nth(i).textContent();
        if(itemName.trim() == 'ADIDAS ORIGINAL'){
            flag = true;
            break;
        }
    }

    if(flag){
        expect(true).toBeTruthy();
    }else{
        expect(false).toBeTruthy();
    }

    const orderId=await page.locator('label.ng-star-inserted').textContent();

    await page.locator('button[routerLink*="/myorders"]').click();
    await page.locator('tbody').waitFor();
    let tablerow=page.locator('tbody tr');

    for(let i=0;i< await tablerow.count();i++){
        const roworderid=await tablerow.nth(i).locator('th').textContent();
        if(orderId.includes(roworderid)){
            await tablerow.nth(i).locator('td button').first().click();
            break;
        }
    }

    await page.locator('div.email-title').waitFor();
    const orderSummaryOrderId=await page.locator('div.col-text').textContent();

    expect(orderId).toContain(orderSummaryOrderId);
    
});


