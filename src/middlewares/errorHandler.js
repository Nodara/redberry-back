/* eslint-disable no-unused-vars */
const errorHandler = (err, req, res, next) => {
  const { statusCode, apiMessage } = err;
  return res.status(statusCode).json(apiMessage ? { message: apiMessage } : {});
};

module.exports = errorHandler;