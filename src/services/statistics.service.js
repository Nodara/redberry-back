const { default: axios } = require('axios');
const Country = require('../db/models/countries.model');
const Statistic = require('../db/models/statistics.model');

const fetchStatistics = async () => {
  // countries and it's statistics
  const countries = await Country.findAll({
    distinct: true,
    attributes: ['id', 'code', 'name'],
    include: {
      model: Statistic,
      as: 'statistics',
      // there could be countries without statistics.
      required: false
    },
  });


  // newly added statistics
  // api is able handle one country at a time, that's why it's in loop
  const statisticsApiData = await Promise.all(
    countries.map(({ code }) => axios
      .post(`${process.env.API_URL}/get-country-statistics`,
        {
          code
        })
    ),
  );


  const statisticsToCreateOrUpdate = statisticsApiData.map(({ data: s }) => {
    const country = countries.find((_c) => _c.code === s.code);

    return {
      ...(country && { id: country.statistics.id }),
      country_id: country.id,
      confirmed: s.confirmed || 0,
      recovered: s.recovered || 0,
      death: s.deaths || 0
    };

  });

  await Statistic.bulkCreate(statisticsToCreateOrUpdate,
    {
      updateOnDuplicate: ['confirmed', 'recovered', 'death']
    });

  return true;
};

const getStatistics = async () => Statistic.findAll({
  include: {
    model: Country,
    as: 'country',
    attributes: ['name']
  },
});

module.exports = { fetchStatistics, getStatistics };