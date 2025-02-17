class LoginPage
{
    constructor(page)
    {

        this.page = page;
        this.userName= page.locator("[type='email']");
        this.password= page.locator("[type='password']");
        this.loginBtn= page.locator("[name='login']");
    }

    async launchAppUrl(url)
    {
        await this.page.goto(url);
    }

    async loginToApplication(email,password)
    {
        //"Vinayak@42"
        await this.userName.fill(email);
        await this.password.fill(password)
        await this.loginBtn.click();
        await this.page.waitForLoadState('networkidle');
    }

   
}

module.exports={LoginPage};