const amqp = require("amqplib");

// RabbitMQ connection
async function connectToRabbitMQ() {
    const amqpServer = "amqp://localhost";
    connection = await amqp.connect(amqpServer);
    channel = await connection.createChannel();
    await channel.assertQueue("product-service-queue");
}
connectToRabbitMQ();

// Producer
orderServiceQueue = async(products, req) => {
    channel.sendToQueue(
        "order-service-queue",
        Buffer.from(
            JSON.stringify({
                products
            })
        )
    );
}


// Consume
productServiceQueue = async() => {
    channel.consume("product-service-queue", (data) => {
        console.log("Consumed from product-service-queue");
        order = JSON.parse(data.content);
        channel.ack(data);
    });
}

const rabbitMQ = {
    orderServiceQueue: orderServiceQueue,
    productServiceQueue: productServiceQueue,
};

module.exports = rabbitMQ;