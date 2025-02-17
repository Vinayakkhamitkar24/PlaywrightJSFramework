const{LoginPage}=require('./LoginPage');
const{DashboardPage}=require('./DashboardPage');
const{CheckoutPage}=require('./CheckoutPage');
const{OrdersPage}=require('./OrdersPage');

class POManager
{
    constructor(page)
    {

        this.page =page;
        this.loginPage = new LoginPage(this.page);
        this.dashboardPage = new DashboardPage(this.page);
        this.checkoutdPage = new CheckoutPage(this.page);
        this.ordersPage = new OrdersPage(this.page);
    }

    getLoginPage()
    {
        return this.loginPage;
    }

    getDashboardPage()
    {
        return this.dashboardPage;
    }

    getChekoutpage()
    {
        return this.checkoutdPage;
    }

    getOrdersPage()
    {
        return this.ordersPage;
    }
}

module.exports={POManager};