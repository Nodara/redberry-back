const { default: axios } = require('axios');
const Country = require('../db/models/countries.model');

const fetchCountries = async () => {
  const { data: countries } = await axios.get(`${process.env.API_URL}/countries`);
  await Promise.all(countries.map((c) => Country.findOrCreate({
    where: {
      code: c.code,
      name: c.name
    }
  })));
};


const getCountries = async () => Country.findAll();

module.exports = {
  fetchCountries,
  getCountries,
};