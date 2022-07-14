'use strict';

const express = require('express');
const searchRouter = express.Router();
const searchController = require('./searchController');

/**POST : Route to generate new data manually */
searchRouter.post('/yt/post', (req, res, next) => {
  searchController.generateNewResults(req, res);
});

/** GET: Fetch All Stored Results */
searchRouter.get('/get/storedResults', (req, res, next) => {
  searchController.getAllStoredResults(req, res);
});

/** GET:  Search the results based on text from user */
searchRouter.get('/search/text', (req, res, next) => {
  searchController.searchAllStoredResults(req, res);
});

module.exports = {
  searchRouter,
};
