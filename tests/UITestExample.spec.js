const{test,expect} = require('@playwright/test');

test.describe.configure({mode:"parallel"});
test('Playwright Browser Context',async ({browser})=>
{
   const context= await browser.newContext();
   const page=await context.newPage();
   const username = page.locator('#username');
   const password = page.locator("[name='password']");
   const signInBtn = page.locator('#signInBtn');

   const cardTitles= page.locator(".card-body a");

   await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
   console.log(await page.title());
   await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
   await username.fill("abc");
   await password.fill("abc");
   await signInBtn.click();
   console.log(await page.locator("[style*='block']").textContent());
   await expect(page.locator("[style*='block']")).toContainText('Incorrect');

   await username.fill("");
   await username.fill("rahulshettyacademy");

   await password.fill("");
   await password.fill("learning");

   await signInBtn.click();

   console.log(await cardTitles.first().textContent());
   console.log(await cardTitles.nth(1).textContent());
   console.log(await cardTitles.allTextContents());

});

test('UI Element Tests',async ({page})=>{
 
   await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

   const username = page.locator('#username');
   const password = page.locator("[name='password']");
   const signInBtn = page.locator('#signInBtn');

   await username.fill("rahulshettyacademy");
   await password.fill("learning");

   await page.locator(".radiotextsty").last().click();

   await page.locator("#okayBtn").click();

   expect(page.locator(".radiotextsty").last()).toBeChecked();

   const dropdown= await page.locator("select.form-control");
   await dropdown.selectOption('Consultant');

   await page.locator("#terms").click();
   await expect(page.locator("#terms")).toBeChecked();
   await page.locator("#terms").uncheck();

   expect(await page.locator("#terms").isChecked()).toBeFalsy();

   const documentLink = page.locator("[href*='documents-request']");
   await expect(documentLink).toHaveAttribute("class","blinkingText");


   //await signInBtn.click();

});

test('Handle Child Page',async({browser})=>{

   const context= await browser.newContext();
   const page=await context.newPage();

   await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

   const username = page.locator('#username');

   const documentLink = page.locator("[href*='documents-request']");

   const [childPage]= await Promise.all(
      [
         context.waitForEvent('page'), //Wait until Pending,Fullfilled,Rejected
         await documentLink.click(),
      ]
   )
   
   const text = await childPage.locator(".red").textContent();

   const domain=text.split("@");

   const domainName = domain[1].split(" ")[0];

   console.log(domainName);

   await username.fill(domainName);

   

});
