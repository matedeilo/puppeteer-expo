const puppeteer = require('puppeteer');

const STEP1 = '#serviceMenu > li:nth-child(3) > a'
const STEP2 = '#siteContent > div > div > section > ul > li:nth-child(1) > article > a'
const STEP3 = '#siteContent > div > div > ul > li:nth-child(4) > a'

const INPUT_CITY = '#ContentPlaceHolder1_ctl01_txtAddressQuery'

async function getNumberOfItems(page){
    return await page.evaluate((sel) => { 
        document.querySelector(sel).getElementsByClassName('mapItemRow').length;
  }, 'branchList');
}

(async ()=> {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto('http://intl.scotiabank.com/es-pe/locator/Default.aspx')
    await page.click(INPUT_CITY);
    await page.keyboard.type("Lima");
    await page.keyboard.press('Enter');
    
    await page.waitForNavigation();
    console.log('finish load');
    let itemsLength = await page.evaluate((sel) => { 
            return document.querySelector(sel).getElementsByClassName('mapItemRow').length;
      }, '#branchList')

        console.log(itemsLength)
        for (let i =0; i < itemsLength; i++){
            const locSelector = `#branchList [id$='_${i}'] div`;
            let location = await page.evaluate((sel) => {
                let item = document.querySelector(sel);
                console.log(item)
                return {
                    lat: item.getAttribute("lat"),
                    lng: item.getAttribute("lng"),
                    type: item.getAttribute("rel"),
                    name: item.querySelector('div:nth-of-type(2) a').innerText
                }
            }, locSelector);
           console.log('Item', location);
        }

    await browser.close();
})();

