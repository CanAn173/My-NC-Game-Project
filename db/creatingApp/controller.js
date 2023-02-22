const {getAllGames, getReviews, getReviewsById, getCommentsById} = require("./models");


exports.getGameCategories = (request, response, next) => {
  getAllGames()
    .then((games) => {
      console.log(games)
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
};

exports.getCustomerReviewsById = (request, response, next) => {
  const { review_id } = request.params;
  getReviewsById(review_id)

  .then((result) => {
    response.status(200).send({ result });
  })
  .catch((error) => {
    next(error);
  })
};

// exports.getCommentsByReviewId = (request, response, next) => {
//   const { review_id } = request.params;
//   getCommentsById(review_id)

//   .then((result) => {
//     response.status(200).send({ result });
//   })
//   .catch((error) => {
//     next(error);
//   })
// }