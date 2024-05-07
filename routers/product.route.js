let auth  = require("../middleware/auth");
let productController = require("../controllers/product.controller");

module.exports = function (app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    //Route
    app.post('/buy-product', productController.buyProduct);
    app.post('/product', productController.createProduct);
}

