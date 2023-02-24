

const {getAllGames, getReviews, getReviewsById, getCommentById, postCommentById} = require("./models");

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
};

exports.getCustomerReviewsById = (request, response, next) => {
  const { review_id } = request.params;
  getReviewsById(review_id)

  .then((customerReviews) => {
    response.status(200).send({ customerReviews });
  })
  .catch((error) => {
    next(error);
  })
};


exports.getCommentsByReviewId = (request, response, next) => {
  const { review_id } = request.params;
  getCommentById(review_id)

  .then((commentsById) => {

    response.status(200).send({ commentsById });

  })
  .catch((error) => {
    next(error);
  })
}

exports.postCustomerReviewsById = (request, response, next) => {
  const {review_id} = request.params;
  const newBody = request.body;

  postCommentById(review_id, newBody)

  .then((comment) => {
    
    response.status(201).send({ comment });

  })
  .catch((error) => {
    next(error);
  })
}
