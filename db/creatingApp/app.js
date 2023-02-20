const express = require("express");
const {getGameCategories, getCustomerReviews} = require("./controller");

const app = express();

app.get("/api/categories", getGameCategories);

app.get("/api/reviews", getCustomerReviews);

app.use((error, request, response, next) => {

  response.status(500).send("Server Error");
});

module.exports = app;