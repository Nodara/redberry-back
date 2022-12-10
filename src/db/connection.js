const { Sequelize, } = require('sequelize');

const Country = require('./models/countries.model');
const Statistic = require('./models/statistics.model');
const User = require('./models/users.model');

const signale = require('signale');

const { name, username, password, host, dialect } = require('./config');

const models = {
  'countries': Country,
  'statistics': Statistic,
  'users': User,
};

const connection = new Sequelize(
  name,
  username,
  password,
  {
    host,
    dialect,
    logging: false,
  }
);

// Model Instance Initializations
Object.values(models).forEach((model) => model.init(connection));

// Relations
Country.hasMany(Statistic, {
  as: 'statistics',
  foreignKey: {
    name: 'country_id',
    allowNull: false,
  }
});

Statistic.belongsTo(Country, {
  as: 'country',
  foreignKey: {
    name: 'country_id',
    allowNull: false,
  }
});

// Authenticate and synchronizations
const syncDatabase = async () => {
  await connection.authenticate()
    .then(() => {
      signale.success('db connnect sucesfully');
      return;
    })
    .then(async () => {
      await Promise.all(
        Object.keys(models).map(
          (model) =>
            models[model]
              .sync({ force: false })
              .catch((err) => console.log(`DB:Error while syncing ${model} model, reason: `, err))));

    }, (error) => {
      console.log('DB:Error, ', error);
    });
};

module.exports = {
  connection,
  syncDatabase
};