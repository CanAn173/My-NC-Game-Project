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