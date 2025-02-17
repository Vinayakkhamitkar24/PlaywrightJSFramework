const{test,expect} = require('@playwright/test');

test("Client App Locator Test",async ({page})=>
{
     const email = "khamitkarv323@gmail.com";
     const productName = "ADIDAS ORIGINAL";

     const products = page.locator(".card-body");

     await page.goto("https://rahulshettyacademy.com/client");
     await page.getByPlaceholder("email@example.com").fill(email);
     await page.getByPlaceholder("enter your passsword").fill("password");
     await page.getByRole("button",{name:'Login'}).click();

     await page.waitForLoadState('networkidle');
     //await page.locator(".card-body b").first().waitFor();
     const cardTitles= await page.locator(".card-body b").allTextContents();
     
     await page.locator(".card-body").filter({hasText:productName})
     .getByRole("button",{name:" Add To Cart"}).click();

     await page.getByRole("listitem").getByRole("button",{name:"Cart"}).click();

     await page.locator(".cart li").first().waitFor();

     await expect(page.getByText(productName)).toBeVisible();


     await page.getByRole("button",{name:"Checkout"}).click();

     await page.getByPlaceholder("Select Country").pressSequentially("ind",{delay:100});

     const dropdown = page.locator(".ta-results");

     await dropdown.waitFor();

     await page.getByRole("button",{name:"India"}).nth(1).click();

     await page.locator("[class*='field small'] input[class='input txt']").fill("878");

     await page.locator("[class='field'] input[class='input txt']").fill("Vinayak");

     await page.locator("[name='coupon']").fill("rahulshettyacademy");

     await page.locator(".btn-primary").click();

     const boolCoupan= await page.locator("p:has-text('* Coupon Applied')").isVisible();

     expect(boolCoupan).toBeTruthy;

     expect(page.locator(".user__name label")).toHaveText(email);

     await page.locator(".action__submit").click();

     await page.locator(".product-info-column [class='title']").first().waitFor();

     const productTitleTxt=await page.locator(".product-info-column [class='title']").first().textContent();

     console.log(productTitleTxt);

     const OrderId = page.locator("[class*='em-spacer'] label[class*='ng-star-inserted']");

     const orderidVal = await OrderId.textContent();

     const cleanedString = orderidVal.replace(/^\s*\|\s*|\s*\|\s*$/g, '').trim();

     console.log(cleanedString);

     await page.locator(".btn.btn-custom[routerlink='/dashboard/myorders']").click();

     await page.locator(".thead-dark").waitFor();

     const placedOrderIds= page.locator(".ng-star-inserted [scope='row']");

     const orderIdCount = await placedOrderIds.count();

     console.log(orderIdCount);

     const placedOrderIdsVal = page.locator(".ng-star-inserted [scope='row']");

     for(let j=0;j<orderIdCount;j++)
     {
        const val=await placedOrderIdsVal.nth(j).textContent();
        if(val === cleanedString)
        {
           const viewOrderBtn =page.locator(".ng-star-inserted button[class*='primary']");
           await viewOrderBtn.nth(j).click();
           break;
        }
     }

     await page.locator("[class='email-title']").waitFor();

     const orderSummaryId= await page.locator(".col-text.-main").textContent();

     expect(cleanedString).toBe(orderSummaryId);
     
          
});