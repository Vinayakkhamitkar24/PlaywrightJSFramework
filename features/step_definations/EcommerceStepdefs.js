//const { playwright } = require('@playwright/test');
const playwright = require('playwright');
const { expect } = require('@playwright/test');
const { Given, When, Then } = require('@cucumber/cucumber');
const { POManager } = require('../../page/POManager');
const data=JSON.parse(JSON.stringify(require("../../testdata/testData.json")));


Given('User Login to site using {string} and {string}',{timeout:100*1000}, async function (email, password) {


    this.email = data.email;
    this.password = data.password;
    this.productName = data.productName;

    //this.poManager = new POManager(page);
    this.loginPage = this.poManager.getLoginPage();
    this.dashboardPage = this.poManager.getDashboardPage();
    this.checkoutdPage = this.poManager.getChekoutpage();
    this.ordersPage = this.poManager.getOrdersPage();

    await this.loginPage.launchAppUrl(data.appUrl);

    await this.loginPage.loginToApplication(this.email, this.password);


});


When('Add {string} product to cart',{timeout:100*1000},async function (productName) {
    // Write code here that turns the phrase above into concrete actions
    await this.dashboardPage.searchProductAndAddtoCart(this.productName);

    await this.dashboardPage.navigateToCart();
});


When('check added product showing in cart',{timeout:100*1000},async function () {
    // Write code here that turns the phrase above into concrete actions
    const bool = await this.checkoutdPage.verifyAddedCartProduct(this.productName);
    expect(bool).toBeTruthy();

    await this.checkoutdPage.checkoutOrder();
});

When('Checkout and fill all details and place order',{timeout:100*1000}, async function () {

    await this.checkoutdPage.selectCountryFromDropdown("ind","India");
    const boolCoupan = await this.checkoutdPage.fillOrderDetails(data.cvv, data.name, data.couponCode);
    expect(boolCoupan).toBeTruthy();

    await this.checkoutdPage.placeOrder();
});


Then('Verify order placed succesfully',{timeout:100*1000},async function () {

    const productTitleTxt = await this.ordersPage.verifyPlacedOrderDetails();
    expect(productTitleTxt).toBe(this.productName);

    this.cleanedString = await this.ordersPage.getOrderId();
    console.log(this.cleanedString);
});

Then('Verify Placed order in order History',{timeout:100*1000}, async function () {
    const orderSummaryId = await this.ordersPage.verifyOrderInOrderHistory(this.cleanedString);
    expect(this.cleanedString).toBe(orderSummaryId);
});
