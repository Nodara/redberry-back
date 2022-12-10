const express = require('express');
const cors = require('cors');

const apiRoutes = require('./routes');
const errorConverter = require('../middlewares/errorConverter');
const errorHandler = require('../middlewares/errorHandler');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/api', apiRoutes);

app.use(errorConverter);
app.use(errorHandler);

module.exports = app;
