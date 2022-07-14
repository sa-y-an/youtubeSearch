'use strict';
const cron = require('node-cron');
const commonConfig = require('../commonconfig.json');
const searchService = require('./searchService');
const responseHelper = require('../utils/responseHelper');

/** Actual CronJob */
async function cronJob() {
  const d = new Date();
  console.log('INFO ::: Running Scheduled CronJob at time ', d.getTime());
  let req, res;
  const result = searchService.generateNewResults(
    req,
    (err, data, statusCode) => {
      if (parseInt(statusCode) === 200) {
        console.log(
          `INFO ::: Result of crobJob running ${JSON.stringify(data)}`
        );
        console.log(data);
      } else {
        console.log(
          'ERROR ::: Problem with Generating New data, CronJob failed'
        );
      }
    }
  );
}

var task;

/** cronjob sceduler */
function start() {
  console.log('INFO ::: Starting CronJob');
  console.log(
    `INFO ::: It is scheduled as per the cron ${commonConfig.cronSchedule}`
  );
  task = cron.schedule(commonConfig.cronSchedule, () => {
    cronJob();
  });
}

/** Wrapper function to make the cronJob run only once
 * source : https://stackoverflow.com/questions/12713564/function-in-javascript-that-can-be-called-only-once
 */
function once(fn, context) {
  var result;
  return function () {
    if (fn) {
      result = fn.apply(context || this, arguments);
      fn = null;
    }
    return result;
  };
}
var startOnce = once(start);

function stopJob() {
  task.stop();
  console.log('CronJob stopped');
}

module.exports = {
  start: startOnce,
  stop: stopJob,
};
