const router = require('express').Router();

const useAuth = require('../middlewares/auth');
const AuthRoutes = require('../routes/auth.route');
const CountryRoutes = require('../routes/countries.route');
const StatisticRoutes = require('../routes/statistics.route');

router.use('/auth', AuthRoutes);
router.use(useAuth);
router.use('/countries', CountryRoutes);
router.use('/statistics', StatisticRoutes);


module.exports = router;
