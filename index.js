const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://google.com');
  await page.screenshot({path: 'screenshots/example.png'});

  await browser.close();

  await page.goto('https://google.com');
  await page.pdf({path: 'page.pdf'});

})();