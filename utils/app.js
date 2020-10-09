var puppeteer = require('puppeteer');
var selectors = require('./selector')
var download = require('image-downloader');
var path = require('path');


var browser, MainPage;

var product = {
    "title": "",
    "price": "",
    "dealPrice": "",
    "imageUR": "",
    "imagePath": ""
}

module.exports = async(ProductURL) => {
    browser = await puppeteer.launch({ headless: false, defaultViewport: null })
    MainPage = await browser.newPage();
    console.log(ProductURL)
    await fetchProduct(ProductURL)
    browser.close()

    return JSON.stringify(product);

}

const fetchProduct = async(ProductURL) => {
    await MainPage.goto(ProductURL)
        //Get Product Title from amazon
    product.title = await MainPage.$eval(selectors.PRODUCT_NAME, e => e.textContent)
        //Removes /n and unwanted space from product title
    product.title = product.title.replace(/\s\s+/g, '');
    //Get Product Price

    //Check if any deal price
    if (await MainPage.$(selectors.DEAL_PRICE)) {
        product.dealPrice = await MainPage.$eval(selectors.DEAL_PRICE, e => e.textContent);
    }
    //check if any price
    if (await MainPage.$(selectors.OUR_PRICE)) {
        product.price = await MainPage.$eval(selectors.OUR_PRICE, e => e.textContent)
    }

    //Get Product Image url

    product.imageUR = await MainPage.$eval(selectors.PRODUCT_IMAGE, e => e.src)
        //Download Image from image url

    await downloadimage(product.imageUR)

    // await loadProducts();

}

const storePrduct = () => {
    var fs = require('fs');
    var products = loadProducts();
    if (products) {
        products.push(product)
            //console.log(products)
        fs.writeFileSync('products.json', JSON.stringify(products))
    } else {
        fs.writeFileSync('products.json', JSON.stringify(product))
    }
    return;
}
const loadProducts = () => {
    try {
        var fs = require('fs');
        var products = fs.readFileSync('products.json')
        products = JSON.parse(products)
        return products;
    } catch (err) {
        console.log('File is Empty')
    }

}

const downloadimage = (ImageURL) => {

    const options = {
        url: ImageURL,
        dest: './public/images' // will be saved to /path/to/dest/image.jpg

    }
    download.image(options)
        .then(({ filename }) => {
            product.imagePath = filename;
            console.log('Saved to', filename) // saved to /path/to/dest/image.jpg
            storePrduct();
        })
        .catch((err) => console.error(err))
}