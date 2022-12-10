require('dotenv').config();

const { syncDatabase } = require('../db/connection');
syncDatabase();

const app = require('./app');

const startCronJobs = require('../crons/crons');

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  startCronJobs();
});
