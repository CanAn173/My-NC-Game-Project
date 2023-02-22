const db = require('../connection');

exports.getAllGames = () => {
  return db.query(
    `
    SELECT * FROM categories;
    `
  )
  .then((result) => {

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

    return result.rows[0];
  })
}

// exports.getCommentsById = (review_id) => {
//   return db.query()
// }