const Product = require("../models/product.entity");

findOneProduct = async(productIds) => {
    // Get products from database with the given ids
    const products = await Product.find({ _id: { $in: productIds } });

    return products;
}

saveProduct = async(req) => {
    const product = await new Product({ ...req.body });
    await product.save();

    return product;
}

const productService = {
    findOneProduct: findOneProduct,
    saveProduct : saveProduct
};

module.exports = productService;