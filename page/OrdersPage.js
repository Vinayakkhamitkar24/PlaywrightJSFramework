class OrdersPage 
{
    constructor(page) 
    {
        this.page = page;
        this.productTitle= page.locator(".product-info-column [class='title']");
        this.orderIdLbl = page.locator("[class*='em-spacer'] label[class*='ng-star-inserted']");
        this.myOrdersLink = page.locator(".btn-custom[routerlink='/dashboard/myorders']");
        this.myOrdersHeader = page.locator(".thead-dark");
        this.orderIdsRow = page.locator(".ng-star-inserted [scope='row']");
        this.viewOrderBtnLocator=page.locator(".ng-star-inserted button[class*='primary']");
        this.orderSummaryHeader = page.locator("[class='email-title']");
        this.summaryOrderId = page.locator("//div[contains(@class, 'col-text -main')]");
        this.thankyouPage = page.locator(".hero-primary");

    }

    async verifyOrderInOrderHistory(cleanedString)
    {
        
        await this.myOrdersLink.waitFor();
        await this.myOrdersLink.click();
        await this.myOrdersHeader.waitFor();
        
        const orderIdCount = await this.orderIdsRow.count();
        console.log(orderIdCount);

        for (let j = 0; j < orderIdCount; j++) {
            const val = await this.orderIdsRow.nth(j).textContent();
            if (val === cleanedString) {
                await this.viewOrderBtnLocator.nth(j).click();
                break;
            }
        }
        const orderSummaryId = await this.summaryOrderId.textContent();
        return orderSummaryId;

    }

    async verifyPlacedOrderDetails() 
    {

        await this.productTitle.first().waitFor();
   
        const productTitleTxt=await this.productTitle.first().textContent();

        console.log(productTitleTxt);

        return productTitleTxt;
    }

    async getOrderId()
    {
        await this.thankyouPage.waitFor();

        const OrderId = await this.orderIdLbl.textContent();
   
        const cleanedString = OrderId.replace(/^\s*\|\s*|\s*\|\s*$/g, '').trim();
   
        return cleanedString;
    }

    
}

module.exports = { OrdersPage };