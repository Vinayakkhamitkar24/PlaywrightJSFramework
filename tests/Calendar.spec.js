const{test,expect}=require('@playwright/test')

test("Calendar Example Test", async({page}) =>
{
    const month="6";
    const date="15";
    const year="2027";

    const expectedDateList=[month,date,year];

    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");

    await page.locator(".react-date-picker__inputGroup").click();
    await page.locator(".react-calendar__navigation").click();
    await page.locator(".react-calendar__navigation").click();

    await page.getByText(year).click();

    await page.locator(".react-calendar__year-view__months__month").nth(Number(month)-1).click();
    

    await page.locator("//abbr[text()='"+date+"']").click();

    await page.locator("[inputmode='numeric']").first().waitFor();
    const inputs = page.locator("[inputmode='numeric']");

    const cnt=await inputs.count();

    console.log(cnt);

    for (let i=0 ;i< cnt ; i++)
    {
        const value=await inputs.nth(i).getAttribute('value');
        expect(value).toEqual(expectedDateList[i]);
    
    }


});
