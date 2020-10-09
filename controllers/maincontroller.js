var fetchProductData = require('../utils/app.js');
const fetchproduct = async(req, res) => {
    var Product_URL = req.body.ProductURL;
    if (Product_URL) {
        var product;
        await fetchProductData(Product_URL).then(pro => product = JSON.parse(pro));
    }
    //var image = product.imagePath.split("\\").pop();

    res.send('<div class="row" style="margin-top:80px;"> <div class="col lg-6"><img src="' + product.imageUR + '" height="400px" width="auto"></div><div class="col lg-6"><div class="row"><h4>' + product.title + '</h4></div><div class="row"><h5>Deal Price : ₹ 59,999.00</h5></div><div class="row"><h5 style="color:green">In Stock</h5></div></div></div>')
}

module.exports = fetchproduct