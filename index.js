import puppeteer from 'puppeteer';
import fs from 'fs/promises'
const regionlist = [
    "Москва и область",
    "Санкт-Петербург и область",
    "Владимирская обл.",
    "Калужская обл.",
    "Рязанская обл.",
    "Тверская обл.",
    "Тульская обл."
];



(async () => {
    //Подготовка
    const args = process.argv

    if (args.length != 4) {
        return console.error("Недостаточно аргументов")
    }
    const linkStarted = args[2]
    
    let id = linkStarted.split("--").reverse()[0]   //Получаем уникальный идентификатор
    const region = regionlist.indexOf(args[3])
    if (region == -1) {
        browser.close()
        return console.error("Такого региона нет")
    }
    const WORKDIR = args[3]+"/"+id

    //Сбор данных
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.setViewport({ width: 1200, height: 1024 });
    await page.goto(linkStarted,{"waitUntil" : "networkidle0"})
    await page.waitForSelector("#__next")
    try{
        page.$(".UiLayoutContainer_container__Kve37 ")
    }catch (err) {
        console.error();("Некорректная ссылка")
        browser.close()
        return
      }
    await page.waitForSelector(".Tooltip_closeIcon__skwl0")
    await page.click(".Tooltip_closeIcon__skwl0")


    await page.waitForSelector(".Region_region__6OUBn")
    await page.click(".Region_region__6OUBn")
    await page.waitForSelector(".UiRegionListBase_item___ly_A")
    await page.click(`.UiRegionListBase_item___ly_A:nth-child(${region + 1})`)


    await page.waitForSelector(".Price_price__QzA8L")
    
    let ContentInfo = await page.evaluate(() => {
        const formater = (srcText)=>srcText.match(/\d|\s|\,|\./g).join("").trim()
        let Txt =""
        let Obj = {}
        let currentprice = document.querySelector(".Price_size_XL__MHvC1")
        if (currentprice) {
            Txt = Txt+"price=" +formater(currentprice.textContent)+'\n'
            Obj.currentprice= currentprice.textContent

        }
        let oldPrice = document.querySelector(".Price_size_XS__ESEhJ")
        if (oldPrice) {
            Txt = `${Txt}priceOld=${formater(oldPrice.textContent)}\n`
            Obj.oldPrice=oldPrice.textContent

        }
        
        let rating = document.querySelector("div[itemprop='ratingValue']")
        if (rating) {
            Txt = `${Txt}rating= ${formater(rating.textContent)}\n`
            Obj.rating= rating.textContent

        }
        let countRating = document.querySelector(".Summary_reviewsCountContainer___aY6I .Summary_title__lRoWU")
        if (countRating) {
            Txt = `${Txt}reviewCount= ${formater(countRating.textContent)}\n`
            Obj.countRating= formater(countRating.textContent)

        }
        return Txt
    })
    //Сохранение
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const bodyHeight = await page.evaluate(() => document.body.scrollHeight);
    await page.setViewport({ width: bodyWidth, height: bodyHeight });
    await fs.mkdir(WORKDIR,{ recursive: true })
    await fs.writeFile( WORKDIR+'/product.txt', ContentInfo)
    await page.screenshot({ path:  WORKDIR+"/screenshot.jpg" })


    browser.close()

})()


