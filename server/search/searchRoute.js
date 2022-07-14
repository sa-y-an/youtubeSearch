'use strict';

const express = require('express');
const app = express.Router();
const searchController = require('./searchController');

/**POST : Route to cache the data */
app.post('/yt/post', (req, res, next) => {
  searchController.getResults(req, res);
});
