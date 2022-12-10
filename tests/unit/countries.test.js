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

describe('Test Countries', () => {
  describe('GET /countries', () => {
    test('should return 200 and countries with specific structure', async () => {
      const res = await request(app)
        .get('/api/countries')
        .set('Authorization', `Bearer ${API_TOKEN}`)
        .expect(StatusCodes.OK);

      expect(res.body).toHaveProperty('countries');

      res.body.countries.forEach((country) => {
        expect(country).toMatchObject({
          id: expect.any(Number),
          code: expect.any(String),
          name: expect.any(Object),
        });

        expect(country.name).toMatchObject({
          ka: expect.any(String),
          en: expect.any(String),
        });
      });

    });
  });
});