const CountriesService = require('../services/countries.service');
const asyncController = require('../tools/asyncController');

const getCountries = asyncController(async (req, res,) => res
  .json({ success: true, countries: await CountriesService.getCountries() }));

module.exports = {
  getCountries,
};