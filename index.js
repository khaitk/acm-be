const express = require("express");
let router = require ("./routers/product.route");
const mongoose = require("mongoose");

mongoose.connect("", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
  })
  .then(() => console.log("Product-Service Connected to MongoDB"))
  .catch((e) => console.log(e));

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

require('./routers/product.route')(app);

app.listen(3001, ()=> console.log('Server running at port 3001'));