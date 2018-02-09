const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');

(async ()=> {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.emulate(devices['iPhone 6']);

    await page.goto('https://oltursa.pe')
    await page.screenshot({path: 'screenshots/responsive.png'});
    await browser.close();
})();
