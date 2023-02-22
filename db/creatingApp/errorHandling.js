
exports.error400Status = ((error, response, request, next) => {

response(400).send({msg: 'Bad Request'});
  next(error);
})

exports.error404Status = ((error, response, request, next) => {
  
response(404).send({msg: 'Not Found'});

  next(error);
})

exports.error500Status = ((error, response, request, next) => {
  response(500).send({msg: 'Internal Server Error'});

})