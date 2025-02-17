class CheckoutPage 
{
    constructor(page) 
    {
        this.page = page;
        this.checkOutBtn=page.locator("text=Checkout");
        this.countryDropdown = page.locator("[placeholder*='Country']");
        this.countryOptions = page.locator(".ta-results");
        this.cvvTxtBox = page.locator("[class*='field small'] input[class='input txt']");
        this.nameField = page.locator("[class='field'] input[class='input txt']");
        this.couponCodeTxtBox = page.locator("[name='coupon']");
        this.couponOption = page.locator(".btn-primary");
        this.copounAppliedConfrimation = page.locator("p:has-text('* Coupon Applied')");
        this.carproduct= page.locator(".cart li");
        this.placeOrderBtn = page.locator(".action__submit");
        this.userEmail = page.locator(".user__name label");
    }

    async verifyAddedCartProduct(productName)
    {
             await this.carproduct.first().waitFor();
        
             const bool= await this.page.locator("h3:has-text('"+productName+"')").isVisible();

             return bool;

    }

    async selectCountryFromDropdown(countryInitial,country)
    {

        await this.countryDropdown.waitFor();

        await this.countryDropdown.pressSequentially(countryInitial, { delay: 100 });

        await this.countryOptions.waitFor();

        const optionCount = await this.countryOptions.locator("button").count();

        for (let i = 0; i < optionCount; i++) {
            const text = await this.countryOptions.locator("button").nth(i).textContent();
            if (text.trim() === country) {
                await this.countryOptions.locator("button").nth(i).click();
                break;
            }
        }

        
    }

    async fillOrderDetails(cvv,name,couponCode) 
    {

        await this.cvvTxtBox.fill("878");

        await this.nameField.fill("Vinayak");

        await this.couponCodeTxtBox.fill("rahulshettyacademy");

        await this.couponOption.click();

        await this.copounAppliedConfrimation.waitFor();
        
        const boolCoupan = await this.copounAppliedConfrimation.isVisible();

        return boolCoupan;

    }

    async checkoutOrder()
    {
        await this.checkOutBtn.click();
    }

    async placeOrder()
    {
        await this.placeOrderBtn.click();
    }

    async validateOrder()
    {
        
    }
}

module.exports={CheckoutPage};