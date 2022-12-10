const ApiError = require('../error/ApiError');

const errorConverter = (err, req, res, next) => {
  let error = err;

  if (!(error instanceof ApiError)) {
    error = new ApiError('INTERNAL_SERVER_ERROR', 'SOMETHING_WENT_WRONG');
  }

  next(error, req, res, next);
};

module.exports = errorConverter;
