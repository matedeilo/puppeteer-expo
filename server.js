const express = require('express')

const SEARCH_INPUT = "body > div.header > search-form > form > input"
const RESULT_ITEM = "body > div.header > search-form > form > div.search_results_autocomplete_container > search-results > div > div.global_search-search_results > div > search-result-section:nth-child(1) > div > div:nth-child(2) > search-result-items > div > search-result-item > div"
const LYRIC_CONTAINER = "body > routable-page > ng-outlet > song-page > div > div > div.song_body.column_layout > div.column_layout-column_span.column_layout-column_span--primary > div > defer-compile:nth-child(2) > lyrics > div > section"

const app = express()

app.get('/api/scrape', (req, res) =>  {
    const param = req.query.uri;

    if (!param) {
        res.json({
          error: "Missing required parameter `uri`"
        });
        return;
      }

    const puppeteer = require('puppeteer');
    (async() => {
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
        console.log(param)
        await page.goto(param);

        await page.waitFor(3000);
        let lyricsText = await page.evaluate((sel) => {
                let frag = document.querySelector(sel);
                return frag.innerText || frag.textContent;
            }, LYRIC_CONTAINER);
        await browser.close();
        res.json({result: lyricsText})
    })();
});

app.listen(3001, () => console.log('Example app listening on port 3001!'))