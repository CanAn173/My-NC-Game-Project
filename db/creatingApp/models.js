const db = require('../connection');

exports.getAllGames = () => {
  return db.query(
    `
    SELECT * FROM categories;
    `
  )
  .then((games) => {

    if(games.rows.length === 0) {
      return Promise.reject({status: 404, msg: 'categories not found'})
    }

    return games.rows;
  })
}

exports.getReviews = () => {
  return db.query(
    `
    SELECT * FROM reviews;
    `
  )
  .then((reviews) => {
    
    if(reviews.rows.length === 0) {
      return Promise.reject({status: 404, msg: 'reviews not found'})
    }


    return reviews.rows
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
      return Promise.reject({status: 404, msg: 'reviews not found'});
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
    // console.log(result);
    
    return result.rows
  })
}