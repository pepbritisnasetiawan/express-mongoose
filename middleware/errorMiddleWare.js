const ErrorHandler = require('../utils/ErrorHandler');

const validationError = (err) => {
  err.status = 400;
  err.message = Object.values(err.errors).map((item) => item.message);
  return new ErrorHandler(err.message, err.status);
};

const castError = (err) => {
  err.status = 404;
  err.message = 'Resource not found';
  return new ErrorHandler(err.message, err.status);
};

module.exports = (err, req, res, next) => {
  console.error(err);

  if (err.name === 'ValidationError') err = validationError(err);
  if (err.name === 'CastError') err = castError(err);

  const { status = 500, message = 'Something went wrong' } = err;
  res.status(status).send(message);
};
