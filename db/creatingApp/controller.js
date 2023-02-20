const {getAllGames, getReviews} = require("./models");

exports.getGameCategories = (request, response, next) => {
  getAllGames()
    .then((games) => {
      response.status(200).send({games});
    })
    .catch((error) => {
      next(error);
    })
};

exports.getCustomerReviews = (request, response, next) => {
  getReviews()
    .then((review) => {
      response.status(200).send({review});
    })
    .catch((error) => {
      next(error);
    })
}