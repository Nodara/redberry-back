const { StatusCodes } = require('http-status-codes');

class ApiError extends Error {
  constructor(type, errorMessage) {
    super(errorMessage);
    this.apiMessage = errorMessage;
    this.statusCode = StatusCodes[type];
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ApiError;