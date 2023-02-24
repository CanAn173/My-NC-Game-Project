const express = require("express");
const {getGameCategories, getCustomerReviews, getCustomerReviewsById, getCommentsByReviewId, postCustomerReviewsById} = require("./controller");

const {error400Status, error404Status, error500Status, customErrorStatus} = require('./errorHandling');


const app = express();

app.use(express.json());

app.get("/api/categories", getGameCategories);

app.get("/api/reviews", getCustomerReviews);

app.get("/api/reviews/:review_id", getCustomerReviewsById);

app.get("/api/reviews/:review_id/comments", getCommentsByReviewId);

app.post("/api/reviews/:review_id/comments",
postCustomerReviewsById);

app.use(error400Status);

app.use(customErrorStatus);

app.use(error404Status);

app.use(error500Status);

module.exports = app;