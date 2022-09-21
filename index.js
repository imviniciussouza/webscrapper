const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://br.tradingview.com/symbols/TVC-DXY/',{
    waitUntill: 'load',
    timeout: 0
  });
  
  /*const element = await page.$(".tv-symbol-header__first-line");
  const text = await page.evaluate(element => element.textContent, element);*/

  const textNode = await page.evaluate(()=>{
    const nodeText = document.querySelector(".tv-symbol-price-quote__change-value").innerText;
    const text = [nodeText];
    
    return text
  });

  fs.writeFile('arreglo.json', JSON.stringify(textNode), err =>{
    if (err) throw new Error ('algo deu errado')
      console.log('deu certo')
  })
  //await browser.close();
})();






/*
const axios = require("axios");
const cheerio = require("cheerio");

const fetchTitles = async () => {
 try {
  const response = await        axios.get('https://br.investing.com/currencies/us-dollar-index');

        const html = response.data;

  const $ = cheerio.load(html);

  const titles = [];

  $('#quotes_summary_current_data span').each((_idx, el) => {
   const title = $(el).text()
   titles.push(title)
  });

  return titles;
 } catch (error) {
  throw error;
 }
};

fetchTitles().then((titles) => console.log(titles.slice(0,2)));
*/