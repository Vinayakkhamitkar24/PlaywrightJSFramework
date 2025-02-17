const {test,expect} = require('@playwright/test')

test("Unauthorized Access validation",async({page}) => {


    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("[type='email']").fill("khamitkarv323@gmail.com");
    await page.locator("[type='password']").fill("password");
    await page.locator("[name='login']").click();

    //await page.route('**/*.{jpg,png,jpeg}',route => route.abort());

    page.on('request',request=>console.log(request.url()));
    page.on('response',response=>console.log(response.url(),response.status()));

    await page.waitForLoadState('networkidle');

    await page.locator(".btn.btn-custom[routerlink='/dashboard/myorders']").click();

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
    route=>route.continue({url : 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=d5cf4d6c-4798-4bb4-b802-29d1b2cceede'}))

    await page.locator("button:has-text('View')").first().click();
    //const msg=await page.locator(".email-wrapper p").textContent()
    await expect(page.locator("p").last()).toHaveText("You are not authorize to view this order");

});