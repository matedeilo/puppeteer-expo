const puppeteer = require('puppeteer');

(async ()=> {
    const browser = await puppeteer.launch({ headless: false, slowMo: 200 });
    const page = await browser.newPage();

    await page.goto('https://bitbucket.org/account/signin/')
    await page.$eval('.aid-form', form => {
        form.submit();
    });

    await page.waitForSelector('.aid-form', {visible:true})
    await page.screenshot({path: 'screenshots/error.png'});
    await browser.close();
})();
