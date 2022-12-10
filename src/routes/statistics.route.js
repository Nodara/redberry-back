const router = require('express').Router();
const StatisticsController = require('../controllers/statistics.controller');

router.get('/', StatisticsController.getStatistics);

module.exports = router;