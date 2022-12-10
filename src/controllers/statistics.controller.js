const StatisticsService = require('../services/statistics.service');
const asyncController = require('../tools/asyncController');

const getStatistics = asyncController(async (req, res) => {
  const data = await StatisticsService.getStatistics();
  return res.json({ success: true, statistics: data });
});

module.exports = {
  getStatistics,
};