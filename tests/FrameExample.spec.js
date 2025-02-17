const{test,expect} = require('@playwright/test');

test("Frame Example Test",async ({page})=>
{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

    await page.setViewportSize({ width: 1920, height: 1080 })

    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();

    page.on('dialog',dialog => dialog.accept())

    await page.locator("#confirmbtn").click();

    await page.locator("#mousehover").hover();

    const framepage = page.frameLocator("#courses-iframe");

    await framepage.locator("li a[href*='lifetime-access']:visible").click();

    const textCheck=await framepage.locator(".text h2").textContent();

    const number=textCheck.split(" ")[1];

    console.log(number);


});