'use strict';

/**health check route */
const healthCheck = require('./server/utils/healthCheck');

const { searchRouter } = require('./server/search/searchRoute');

module.exports = function (app) {
  app.use('/healthcheck', healthCheck);

  /**Serach related routes */
  app.use('/get/initialize', searchRouter);
};
