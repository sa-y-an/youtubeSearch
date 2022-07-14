'use strict';

const express = require('express');
const searchRouter = express.Router();
const searchController = require('./searchController');

/**POST : Route to cache the data */
searchRouter.post('/yt/post', (req, res, next) => {
  searchController.getResults(req, res);
});

/** GET: Search Results */
searchRouter.get('/get/storedResults', (req, res, next) => {
  searchController.getAllStoredResults(req, res);
});

module.exports = {
  searchRouter,
};
