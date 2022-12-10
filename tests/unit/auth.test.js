const request = require('supertest');
const { faker } = require('@faker-js/faker');
const app = require('../../src/bin/app');
const { StatusCodes } = require('http-status-codes');
const User = require('../../src/db/models/users.model');

const { insertUser } = require('../fixtures/user.fixture');
const setupTestDb = require('../utils/setupTestDb');
setupTestDb();


describe('Auth routes', () => {

  describe('POST /auth/sign-up', () => {
    let newUser;

    beforeEach(() => {
      newUser = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email().toLowerCase(),
        password: faker.internet.password()
      };
    });

    test('should return 201 and successfully register user if request data is ok',
      async () => {

        const res = await request(app)
          .post('/api/auth/sign-up')
          .send(newUser)
          .expect(StatusCodes.CREATED);

        // password must be excluded!
        expect(res.body.user).not.toHaveProperty('password');

        expect(res.body.user).toEqual({
          id: expect.anything(),
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          email: newUser.email,
          createdAt: expect.anything(),
          updatedAt: expect.anything(),
        });

        const user = await User.findByPk(res.body.user.id);

        // user must be in database
        expect(user).toBeDefined();

        // user password must be hashed
        expect(user.password).not.toBe(newUser.password);

        // user properties in db must be equal to mock one's
        expect(user)
          .toMatchObject({
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            email: newUser.email
          });

        await User.destroy({ where: { id: user.id } });
      });
  });

  describe('POST /auth/sign-in', () => {
    let mockUser;
    beforeEach(() => {
      mockUser = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email().toLowerCase(),
        password: faker.internet.password()
      };
    });

    test('should return 200 and token user credentials are valid', async () => {
      await insertUser(mockUser);

      const res = await request(app)
        .post('/api/auth/sign-in')
        .send({ email: mockUser.email, password: mockUser.password })
        .expect(StatusCodes.OK);

      expect(res.body).toHaveProperty('token');
    });

    test('should return 301 and message', async () => {
      await insertUser(mockUser);

      const res = await request(app)
        .post('/api/auth/sign-in')
        .send({ email: mockUser.email, password: `${mockUser.password}1234` })
        .expect(StatusCodes.UNAUTHORIZED);

      expect(res.body.message).toBe('BAD_CREDENTIALS');

    });
  });
});