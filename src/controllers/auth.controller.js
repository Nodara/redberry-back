const AuthService = require('../services/auth.service.js');
const { StatusCodes } = require('http-status-codes');
const asyncController = require('../tools/asyncController.js');

const signIn = asyncController(async (req, res) => {
  const {
    email,
    password,
  } = req.body;

  const token = await AuthService.signIn({
    email,
    password
  });

  return res.json({ token });
});

const signUp = asyncController(async (req, res) => {
  const userData = req.body;
  const user = await AuthService.signUp(userData);

  return res.status(StatusCodes.CREATED).json(user);
});


module.exports = {
  signIn,
  signUp,
};
