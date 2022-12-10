const User = require('../db/models/users.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ApiError = require('../error/ApiError');

const signIn = async ({ email, password }) => {
  const user = await User.findOne({
    where: {
      email,
    }
  });

  if (!user) {
    throw new ApiError('NOT_FOUND', 'USER_NOT_FOUND');
  }

  const passwordValidity = bcrypt.compareSync(password, user.password, Number(process.env.SALT_AMOUNT));

  let token;

  if (user && passwordValidity) {
    token = jwt
      .sign(
        {
          userId: user.id,
        },
        process.env.SECRET,
        {
          expiresIn: '10h'
        }
      );
    return token;
  }

  throw new ApiError('UNAUTHORIZED', 'BAD_CREDENTIALS');
};


const signUp = async ({ firstName, lastName, email, password }) => {
  const acc = await User.findOne({
    where: {
      email,
    }
  });

  if (acc) throw new ApiError('BAD_REQUEST', 'ALREADY_EXIST');

  const user = await User.create({
    email, firstName, lastName, password,
  }, {
    returning: true,
  });

  // exclude password
  delete user.dataValues.password;

  return { user };
};


module.exports = {
  signIn, signUp
};
