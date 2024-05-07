let { orderServiceQueue, productServiceQueue } = require('../queues/rabbitmq.queue');
const { findOneProduct, saveProduct } = require("../services/product.service");

exports.createProduct = async (req, res) => {
    const { name, price, description } = req.body;
    // verify if name and price are not empty
    if (!name || !price || !description) {
      return res.status(400).json({
        message: "Please provide name, price and description",
      });
    }
    const product = await saveProduct(req);
   
    return res.status(201).json({
      message: "Product created successfully",
      product,
    });
}

// Buy a product
exports.buyProduct = async (req, res) => {
    const { productIds } = req.body;
    try {
        const products = await findOneProduct(productIds);

        // Send to RabbitMQ
        orderServiceQueue(products, req)

        // Consume from RabbitMQ
        const order = productServiceQueue();

        return res.status(201).json({
            message: "Order placed successfully",
            order,
        })
    } catch (error) {
        console.log(error);
    }
}

