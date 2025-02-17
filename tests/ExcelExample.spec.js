const{test,expect} = require('@playwright/test');

const ExcelJs = require('exceljs');

async function writeExcel(searchText, replaceText, change, filepath) {

    const workbook = new ExcelJs.Workbook();

    await workbook.xlsx.readFile(await filepath);
    const worksheet = workbook.getWorksheet('Sheet1');
    const output = await readExcel(worksheet,searchText);

    const cell = worksheet.getCell(output.row,output.coloumn+change.colChange);
    cell.value=replaceText;
    await workbook.xlsx.writeFile(filepath);


};

async function readExcel(worksheet,searchText) {

    let output ={row:-1,coloumn:-1};
    worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {

            if(cell.value === searchText)
            {
                output.row = rowNumber;
                output.coloumn=colNumber;
            }
        })
    })

    return output;
};

//writeExcel("Mango",450,{rowChange:0,colChange:2},'C:/Users/khami/ExcelUtility/download.xlsx');

test("Upload and Download excel Validation",async({page})=>
{

    const txtSearch = 'Mango';
    const price = '350';//Math.floor(Math.random() * 500) + 1;
    
    await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");

    const promisedownload= page.waitForEvent('download');
    await page.locator("#downloadButton").click();
    await promisedownload;
   
    await writeExcel(txtSearch,price,{rowChange:0,colChange:2},"C:/Users/khami/Downloads/download.xlsx");

    await page.locator("#fileinput").click();
    await page.locator("#fileinput").setInputFiles("C:/Users/khami/Downloads/download.xlsx")

    const textLocator=page.getByText(txtSearch);
    const desiredRow=await page.getByRole('row').filter({has :textLocator});

    await expect(desiredRow.locator("#cell-4-undefined")).toContainText(price);

});