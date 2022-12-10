const User = require('../../src/db/models/users.model');

const insertUser = async (mockUser) => await User.create(mockUser, {
  returning: true,
});

module.exports = {
  insertUser,
};