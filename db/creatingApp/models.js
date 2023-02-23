const db = require('../connection');

exports.getAllGames = () => {
  return db.query(
    `
    SELECT * FROM categories;
    `
  )
  .then((result) => {

    if(result.rows.length === 0) {
      return Promise.reject({status: 404, msg: 'categories not found'})
    }

    return result.rows;
  })
}

exports.getReviews = () => {
  return db.query(
    `
    SELECT * FROM reviews;
    `
  )
  .then((result) => {

    return result.rows
  })
}

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
      return Promise.reject({status: 404, msg: 'categories not found'})
    }

    return result.rows[0];
  })
}

exports.getCommentById = (review_id) => {
  return db.query(
    `
    SELECT * FROM comments WHERE review_id = $1;
    `
    ,
    [review_id]
  )
  .then((result) => {


    return result.rows
  })
}