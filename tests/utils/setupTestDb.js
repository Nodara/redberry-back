const { connection, syncDatabase } = require('../../src/db/connection');
const User = require('../../src/db/models/users.model');

const setupTestDb = () => {
  beforeAll(async () => {
    await syncDatabase();
  });

  afterAll(async () => {
    await User.destroy({
      where: {},
      truncate: true
    });

    await connection.close();
  });
};

module.exports = setupTestDb;
