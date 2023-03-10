
exports.error400Status = ((error, request, response, next) => {
if (error.code === '22P02') {
response.status(400).send({msg: 'Bad Request'});
} else {
  next(error);
}
})

exports.error404Status = ((error, request, response, next) => {
  if (error.code === '23502' || error.code === '23503') {
    response.status(404).send({msg: 'Not found'})
  } else {
    next(error);
  }
})

exports.customErrorStatus = ((error, request, response, next) => {
if (error.status && error.msg) {
response.status(error.status).send({msg: error.msg});
} else {
  next(error);
}
})

exports.error500Status = ((error, request, response, next) => {
  console.log(error);

  response.status(500).send({msg: 'Internal Server Error'});

})