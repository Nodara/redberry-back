const router = require('express').Router();

const CountriesController = require('../controllers/countries.controller');

router.get('/', CountriesController.getCountries);

module.exports = router;
