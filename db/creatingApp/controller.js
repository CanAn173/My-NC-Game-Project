const {getAllGames} = require("./models");

exports.getGameCategories = (request, response, next) => {
  getAllGames()
    .then((games) => {
      console.log(games)
      response.status(200).send({games});
    })
    .catch((error) => {
      next(error);
    })
}