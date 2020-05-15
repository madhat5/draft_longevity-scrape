const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const fs = require('fs');

const scrapeRes = [{
    name: 'String',
    pos: 'String',
    pickNum: 'Number',
    pickRd: 'Number',
    team: 'String',
    age: 'Number',
    yearsPlayed: 'Number',
    college: 'String',
    profileUrl: 'String'
}];

const draftYrs = [2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019]

async function draftLists(page) {
    const data = [];
    
    for (var i = 0; i < draftYrs.length; i++) {
        await page.goto('https://www.pro-football-reference.com/years/' + draftYrs[i] + '/draft.htm')

        const html = await page.content();
        const $ = cheerio.load(html);
        // TEST
        // fs.writeFileSync('./test' + draftYrs[i] + '.html', html);
        
        $('#drafts > tbody > tr').each((i, el) => {
            const nameEl = $(el).find('td:nth-child(4) > a');
            const posEl = $(el).find('td:nth-child(5)');
            const pickNumEl = $(el).find('td:nth-child(2)');
            const pickRdEl = $(el).find('th');
            const teamEl = $(el).find('td:nth-child(3)');
            const ageEl = $(el).find('td:nth-child(6)');
            const yearsPlayedEl = $(el).find('td:nth-child(7)');
            const collegeEl = $(el).find('td:nth-child(28)');

            const name = $(nameEl).text();
            const pos = $(posEl).text();
            const pickNum = +($(pickNumEl).text());
            const pickRd = +($(pickRdEl).text());
            const team = $(teamEl).text();
            const age = +($(ageEl).text());
            const yrDrafted = draftYrs[i];
            const yearsPlayed = 2020 - (+($(yearsPlayedEl).text()));
            const college = $(collegeEl).text();
            const profileUrl = 'https://www.pro-football-reference.com' + $(nameEl).attr('href');;

            const dataRow = {
                name,
                pos,
                pickNum,
                pickRd,
                team,
                age,
                yrDrafted,
                yearsPlayed,
                college,
                profileUrl
            }
            data.push(dataRow)
        })
        await sleep(1000);
    }
    return data;
}

// FORCED LAG
async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// CUSTOM WRITEFILE
async function writeFile(drafts) {
    fs.writeFile('./data/data.json', JSON.stringify(drafts, null, 4), (err) => {
        console.log('Write-file success');
    });
};

async function main() {
    const browser = await puppeteer.launch({
        headless: true
    })
    const page = await browser.newPage();

    const drafts = await draftLists(page);
    // console.log(drafts);
    writeFile(drafts);
}
main();