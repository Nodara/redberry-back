const request = require('supertest');
const app = require('../../src/bin/app');
const { StatusCodes } = require('http-status-codes');
const { faker } = require('@faker-js/faker');
const setupTestDb = require('../utils/setupTestDb');

setupTestDb();

const { insertUser } = require('../fixtures/user.fixture');
const { generateAuthenticationToken } = require('../fixtures/auth.fixture');

let API_TOKEN;

beforeAll(async () => {

  const mockUser = {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email().toLowerCase(),
    password: faker.internet.password()
  };

  const { id: userId } = await insertUser(mockUser);

  API_TOKEN = generateAuthenticationToken(userId);

});

describe('Test Statistics', () => {
  describe('GET /statistics', () => {
    test('should return 200 and statistics with specific structure', async () => {
      const res = await request(app)
        .get('/api/statistics')
        .set('Authorization', `Bearer ${API_TOKEN}`)
        .expect(StatusCodes.OK);

      expect(res.body).toHaveProperty('statistics');

      res.body.statistics.forEach((statistic) => {
        expect(statistic).toMatchObject({
          id: expect.any(Number),
          confirmed: expect.any(Number),
          recovered: expect.any(Number),
          death: expect.any(Number),
          countryId: expect.any(Number),
          country: expect(Object),
        });

        expect(statistic.country).toMatchObject({
          name: expect.any(String),
        });
      });

    });
  });
});