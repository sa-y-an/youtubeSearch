'use strict';

const healthCheck = require('./server/utils/healthCheck');

module.exports = function (app) {
  app.use('/healthcheck', healthCheck);
};
