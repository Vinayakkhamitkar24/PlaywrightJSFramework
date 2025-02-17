const { Before, After, BeforeStep, AfterStep, Status } = require('@cucumber/cucumber')
const { POManager } = require('../../page/POManager');
const playwright = require('playwright');

Before(async function () {

    const browser = await playwright.chromium.launch({ headless: false });;
    const context = await browser.newContext();
    this.page = await context.newPage();
    

    this.poManager = new POManager(this.page);
});

After(async function () {
    console.log("Closing Browser");
});

BeforeStep(async function () {
});

AfterStep(async function ({result}) {

    if(result.status==Status.FAILED)
    {
        await this.page.screenshot({path:'screenshot.png'});
    }

});

