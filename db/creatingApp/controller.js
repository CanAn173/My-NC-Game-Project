

const {getAllGames, 
getReviews, 
getReviewsById, 
getCommentById, 
postCommentById,
changeInVotes,
getAllUsers
} = require("./models");

// GET-/api/categories
exports.getGameCategories = (request, response, next) => {
  getAllGames()
    .then((games) => {

      response.status(200).send({games});
    })
    .catch((error) => {
      next(error);
    })
};

// GET-/api/reviews
exports.getCustomerReviews = (request, response, next) => {
  getReviews()
    .then((review) => {
      response.status(200).send({review});
    })
    .catch((error) => {
      next(error);
    })
};

// GET-/api/reviews/:review_id
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

// GET-/api/reviews/:review_id/comments
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

// POST-/api/reviews/:review_id/comments
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

// PATCH-/api/reviews/:review_id
exports.updatedVotesById = (request, response, next) => {
  const { review_id } = request.params;
  const newVotes = request.body;

  changeInVotes(review_id, newVotes)

  .then((review) => {

    response.status(200).send({ review });
    
  })
  .catch((error) => {
    next(error);
  })
}

// GET-/api/users
exports.getUsers = (request, response, next) => {
  getAllUsers()
    .then((users) => {

      response.status(200).send({users});
    })
    .catch((error) => {
      next(error);
    })
};