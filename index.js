/*const {Builder, By, Key, until, webdriver} = require('selenium-webdriver');
var map = webdriver.promise.map;*/
var webdriver = require('selenium-webdriver');
var By = webdriver.By;
var Builder = webdriver.Builder;
var map = webdriver.promise.map;

function downloadImage(driver,url){

    if(!(url.indexOf('http')>=0)) url += 'https://www.megaphone.pt/'+url;

    driver.executeScript("var link = document.createElement('a');link.href = "+url+";link.download = "+url+";document.body.appendChild(link);link.click();document.body.removeChild(link);");
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

(async function example() {
    let driver = await new Builder().forBrowser('firefox').build();

    //for(let i = 1; i<=4; i++) {
    for await (let i of [1,2,3,4]){

        try {

            await driver.get('https://www.megaphone.pt/categorias/conjuntos?page='+i);
            let elements = driver.findElements(By.xpath('//*/li/div/div/div/a/img'));/*.then((images) => images.map((elems, e) => e.getAttribute("src"))
            .then(function(values) {
                var link = document.createElement('a');
                link.href = values;
                link.download = values;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }));*/
            map(elements, (e,i,a) => { // e = element; i = index; a = original array;
                e.getAttribute("src")
                    .then(function (values) {
                        if (!(values.indexOf('gif') >= 0)) {
                            console.log(values);
                            //downloadImage(driver,values);
                        }
                    });
                e.getAttribute("data-src")
                    .then(function (values) {
                        if (!!values) {
                            console.log(values);
                            //downloadImage(driver,values);
                        }
                    });

            });

            await sleep(5000);

        } finally {
            //await driver.quit();

        }

    }
})();
