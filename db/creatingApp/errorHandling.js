
exports.error400Status = ((error, request, response, next) => {
if (error.code === '22P02') {
response.status(400).send({msg: 'Bad Request'});
} else {
  next(error);
}
})

exports.error404Status = ((error, request, response, next) => {
if (error.status && error.msg) {
response.status(error.status).send({msg: error.msg});
} else {
  next(error);
}
})

exports.error500Status = ((error, request, response, next) => {

  response.status(500).send({msg: 'Internal Server Error'});

})