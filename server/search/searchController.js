'use strict';

const searchService = require('./searchService');
const responseHelper = require('../utils/responseHelper');

module.exports = {
  /**Post to fetch results */
  getResults: (req, res) => {
    searchService.getResults(req, (err, data, statusCode) => {
      responseHelper(err, res, data, statusCode);
    });
  },

  getAllStoredResults: (req, res) => {
    searchService.getAllStoredResults(req, (err, data, statusCode) => {
      responseHelper(err, res, data, statusCode);
    });
  },
};
