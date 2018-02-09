const puppeteer = require('puppeteer');

const SEARCH_INPUT = "body > div.header > search-form > form > input"
const RESULT_ITEM = "body > div.header > search-form > form > div.search_results_autocomplete_container > search-results > div > div.global_search-search_results > div > search-result-section:nth-child(1) > div > div:nth-child(2) > search-result-items > div > search-result-item > div"
const LYRIC_CONTAINER = "body > routable-page > ng-outlet > song-page > div > div > div.song_body.column_layout > div.column_layout-column_span.column_layout-column_span--primary > div > defer-compile:nth-child(2) > lyrics > div > section"


async function run() {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('https://genius.com/');

    await page.click(SEARCH_INPUT);
    await page.keyboard.type("Never Gonna Give You Up");
    await page.waitForSelector(RESULT_ITEM, {visible:true}).then(() => {
        page.click(RESULT_ITEM).then(() => {
          console.log('click done');
        });
      }).catch((err) => {
        console.log('catch');
      });

      await page.waitFor(3000);
      let lyricsHtml = await page.evaluate((sel) => {
            let frag = document.querySelector(sel);
            return frag.innerText || frag.textContent;
      }, LYRIC_CONTAINER);

      console.log(lyricsHtml)
      await browser.close();
}

run();

