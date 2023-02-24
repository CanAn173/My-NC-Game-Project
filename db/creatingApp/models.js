const db = require('../connection');

// GET-/api/categories
exports.getAllGames = () => {
  return db.query(
    `
    SELECT * FROM categories;
    `
  )
  .then((result) => {

    if(result.rows.length === 0) {
      return Promise.reject({status: 404, msg: 'not found'})
    }

    return result.rows;
  })
}

// GET-/api/reviews
exports.getReviews = () => {
  return db.query(
    `
    SELECT * FROM reviews;
    `
  )
  .then((result) => {

    if(result.rows.length === 0) {
      return Promise.reject({status: 404, msg: 'not found'})
    }

    return result.rows
  })
}

// GET-/api/reviews/:review_id
exports.getReviewsById = (review_id) => {

  return db.query(
    `
    SELECT * FROM reviews WHERE review_id = $1;
    `
    ,
    [review_id]
  )
  .then((result) => {

    if(result.rows.length === 0) {
      return Promise.reject({status: 404, msg: 'not found'})
    }

    return result.rows[0];
  })
}

// GET-api/review/:review_id/comments
exports.getCommentById = (review_id) => {
  return db.query(
    `
    SELECT * FROM comments WHERE review_id = $1;
    `
    ,
    [review_id]
  )
  .then((result) => {

    if(result.rows.length === 0) {
      return Promise.reject({status: 404, msg: 'not found'})
    }

    return result.rows
  })
}

// POST-/api/reviews/:review_id/comments
exports.postCommentById = (review_id, {userName, body}) => {

  return db.query(
    `
    INSERT INTO comments
    (author, body, review_id)
    VALUES
    ($1, $2, $3)
    RETURNING *;
    `
  ,
  [userName, body, review_id]
  )
  .then((result) => {

    if(result.rows.length === 0) {

      return Promise.reject({status: 404, msg: 'Not found'})
    }
    
    return result.rows[0];
  })
}

// PATCH-/api/reviews/:review_id
exports.changeInVotes = (review_id, { inc_votes }) => {

  return db.query(
    `
    UPDATE reviews
    SET
    votes = votes + $1 WHERE review_id = $2
    RETURNING *;
    `
    ,
    [inc_votes, review_id]
  )
  .then((result) => {

    if(result.rows.length === 0) {

      return Promise.reject({status: 404, msg: 'not found'})
    }
    
    return result.rows[0];
  });
}