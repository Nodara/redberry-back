const jwt = require('jsonwebtoken');
const ApiError = require('../error/ApiError');

const useAuth = (req, res, next) => {
  try {
    const headers = req.headers;
    if (!headers.authorization) throw new Error();

    const token = headers.authorization.split(' ')[1];

    if (!token) throw new Error();

    const { userId } = jwt.verify(token, process.env.SECRET);

    req.user = {
      userId
    };

    return next();

  } catch (e) {
    throw new ApiError('UNAUTHORIZED');
  }
};

module.exports = useAuth;