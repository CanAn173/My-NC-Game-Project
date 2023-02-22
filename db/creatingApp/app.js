const express = require("express");
const {getGameCategories, getCustomerReviews, getCustomerReviewsById} = require("./controller");
const {error400Status, error404Status, error500Status} = require('./errorHandling');

const app = express();

app.get("/api/categories", getGameCategories);

app.get("/api/reviews", getCustomerReviews);

app.get("/api/reviews/:review_id", getCustomerReviewsById);

app.use(error400Status);

app.use(error404Status);

app.use(error500Status);

module.exports = app;