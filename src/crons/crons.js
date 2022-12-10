const moment = require('moment');
const cron = require('node-cron');
const { fetchCountries } = require('../services/countries.service');
const statisticsService = require('../services/statistics.service');

const fetchStatistics = (date) => {
  const minute = moment(date).minute();
  return cron.schedule(`${minute} * * * *`, async () => {
    await statisticsService.fetchStatistics();
  });
};

const startCronJobs = async () => {
  // it will execute just once
  await fetchCountries();

  const date = new Date();
  fetchStatistics(date).start();
};

module.exports = startCronJobs;