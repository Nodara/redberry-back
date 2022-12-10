const jwt = require('jsonwebtoken');

const generateAuthenticationToken = (userId) => jwt.sign({
  userId: userId
},
  process.env.SECRET,
  {
    expiresIn: '10h'
  }
);

module.exports = {
  generateAuthenticationToken
};