const express = require("express");
const {getGameCategories} = require("./controller");

const app = express();

app.get("/api/categories", getGameCategories);

app.use((error, request, response, next) => {
  console.log(error);
  response.status(500).send("Server Error");
});

module.exports = app;