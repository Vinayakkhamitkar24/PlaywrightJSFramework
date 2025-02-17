const{test,expect,request} = require('@playwright/test');
const {APIUtils}=require('../utils/APIUtils');
const loginPayload ={userEmail:"khamitkarv323@gmail.com",userPassword:"password"}
const orderPayload ={orders:[{country:"Cuba",productOrderedId:"676a631fe2b5443b1f004a20"}]}
const fakeResponsePayload = {data:[],message:"No Orders"};

let response;

test.beforeAll(async ()=>
{
   const apiContext= await request.newContext();
   const apiUtils=new APIUtils(apiContext,loginPayload);
   response=await apiUtils.createOrder(orderPayload);

});

test("@smoke Place Order Negative Scenario",async({page})=>
{

   await page.addInitScript(value =>{
      window.localStorage.setItem('token',value);
     },response.token);

     await page.goto("https://rahulshettyacademy.com/client/");

     //Network Intercept with fake response
     await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",async route =>
     {
       const response = await page.request.fetch(route.request());
       let body = JSON.stringify(fakeResponsePayload);
       await route.fulfill(
         {
            response,
            body
         });
     });

     
     await page.locator(".card-body b").first().waitFor();

     await page.locator(".btn.btn-custom[routerlink='/dashboard/myorders']").click();

     await page.waitForLoadState('networkidle');
     const txt=await page.locator(".mt-4").textContent();
     console.log(txt);

     const val = " You have No Orders to show at this time. Please Visit Back Us ";
     expect(txt).toBe(val);

     //await page.pause();

});

test("Place Order Positive Scenario",async ({page})=>
    {

         await page.addInitScript(value =>{
          window.localStorage.setItem('token',value);
         },response.token);

         await page.goto("https://rahulshettyacademy.com/client/");
         await page.locator(".card-body b").first().waitFor();

         await page.locator(".btn.btn-custom[routerlink='/dashboard/myorders']").click();
    
         await page.locator(".thead-dark").waitFor();
    
         const placedOrderIds= page.locator(".ng-star-inserted [scope='row']");
    
         const orderIdCount = await placedOrderIds.count();
    
         console.log(orderIdCount);
    
         const placedOrderIdsVal = page.locator(".ng-star-inserted [scope='row']");
    
         for(let j=0;j<orderIdCount;j++)
         {
            const val=await placedOrderIdsVal.nth(j).textContent();
            if(val === response.orderId)
            {
               const viewOrderBtn =page.locator(".ng-star-inserted button[class*='primary']");
               await viewOrderBtn.nth(j).click();
               break;
            }
         }
    
         await page.locator("[class='email-title']").waitFor();
    
         const orderSummaryId= await page.locator(".col-text.-main").textContent();

         expect(response.orderId).toBe(orderSummaryId);
               
    });
