const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const fs = require('fs')

const scrapeRes = [{
    name: 'String',
    pos: 'String',
    pickNum: 'Number',
    team: 'String',
    age: 'Number',
    yearsPlayed: 'Number',
    college: 'String',
    profileUrl: 'String'
}];

const draftYrs = [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019]

async function draftLists(page) {
    const data = []
    for (var i = 0; i < draftYrs.length; i++) {
        await page.goto('https://www.pro-football-reference.com/years/' + draftYrs[i] + '/draft.htm')

        const html = await page.content();
        const $ = cheerio.load(html);
        // TEST
        // fs.writeFileSync('./test' + draftYrs[i] + '.html', html);
        
        $('#drafts > tbody > tr').each((i, el) => {
            


            const dataRow = {
                name,
                pos,
                pickNum,
                team,
                age,
                yearsPlayed,
                college,
                profileUrl
            }
            data.push(dataRow)
        })
        
        await sleep(10000);
    }
    return data;
}

// FORCED LAG
async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// CUSTOM WRITEFILE
async function writeFile(listings) {
    fs.writeFile('./data.json', JSON.stringify(drafts, null, 4), (err) => {
        console.log('Write-file success');
    });
};

async function main() {
    const browser = await puppeteer.launch({
        headless: false
    })
    const page = await browser.newPage();

    const drafts = await draftLists(page);
    console.log(drafts);
    writeFile(drafts);
}
main();