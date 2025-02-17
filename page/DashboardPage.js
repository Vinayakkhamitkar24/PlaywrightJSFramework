class DashboardPage
{
    constructor(page)
    {
        this.page=page;
        this.products = page.locator(".card-body");
        this.productCards = page.locator(".card-body b");
        this.cartLink = page.locator("[routerlink='/dashboard/cart']");
    }


    async searchProductAndAddtoCart(productName)
    {

        const count = await this.products.count();
        
        for(let i=0 ; i<count;i++)
        {
             const productTitle= await this.products.nth(i).locator("b").textContent();
   
             if(productTitle===productName)
             {
                  await this.products.nth(i).locator("text= Add To Cart").click();
                  break;
             }
        }
   
        
    }

    async navigateToCart()
    {
        await this.cartLink.click();
    }

}

module.exports={DashboardPage};