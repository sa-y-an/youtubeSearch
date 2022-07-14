'use strict';

const searchService = require('./searchService');
const responseHelper = require('../utils/responseHelper');

module.exports = {
  /**Post to fetch results */
  generateNewResults: (req, res) => {
    searchService.generateNewResults(req, (err, data, statusCode) => {
      responseHelper(err, res, data, statusCode);
    });
  },

  /**Get all results in a paginated fashion */
  getAllStoredResults: (req, res) => {
    searchService.getAllStoredResults(req, (err, data, statusCode) => {
      responseHelper(err, res, data, statusCode);
    });
  },

  /** Search all stored results */
  searchAllStoredResults: (req, res) => {
    searchService.searchAllStoredResults(req, (err, data, statusCode) => {
      responseHelper(err, res, data, statusCode);
    });
  },
};
