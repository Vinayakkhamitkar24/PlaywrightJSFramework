const{test,expect} = require('@playwright/test');
const data=JSON.parse(JSON.stringify(require("../testdata/testData.json")));

const {POManager} = require('../page/POManager');



test("@smoke Client App Test",async ({page})=>
{
     const email = data.email;
     const password = data.password;
     const productName = data.productName;

     const poManager = new POManager(page);

     const loginPage = poManager.getLoginPage();
     const dashboardPage = poManager.getDashboardPage();
     const checkoutdPage = poManager.getChekoutpage();
     const ordersPage = poManager.getOrdersPage();
     
     await loginPage.launchAppUrl(data.appUrl);

     await loginPage.loginToApplication(email,password);

     await dashboardPage.searchProductAndAddtoCart(productName);

     await dashboardPage.navigateToCart();

     const bool=await checkoutdPage.verifyAddedCartProduct(productName);
     expect(bool).toBeTruthy();

     await checkoutdPage.checkoutOrder();

     await checkoutdPage.selectCountryFromDropdown("ind","India");

     const boolCoupan=await checkoutdPage.fillOrderDetails(data.cvv,data.name,data.couponCode);
     expect(boolCoupan).toBeTruthy();

     await checkoutdPage.placeOrder();

     const productTitleTxt= await ordersPage.verifyPlacedOrderDetails();
     expect(productTitleTxt).toBe(productName);

     const cleanedString = await ordersPage.getOrderId();
     console.log(cleanedString);

     const orderSummaryId= await ordersPage.verifyOrderInOrderHistory(cleanedString);
     expect(cleanedString).toBe(orderSummaryId);
          
});