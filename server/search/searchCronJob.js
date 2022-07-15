'use strict';
const cron = require('node-cron');
const commonConfig = require('../commonconfig.json');
const searchService = require('./searchService');
const responseHelper = require('../utils/responseHelper');
const Search = require('./searchModel');
const mongoose = require('mongoose');

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

async function cacheData() {
  const results = await Search.find().select('+ytId -_id');
  const existingIds = [];
  results.forEach((el) => existingIds.push(el.ytId));
  try {
    await redisClient.sAdd('ytIds', existingIds);
  } catch (err) {
    console.log('ERROR in caching in redis', err);
  }
}

/** cronjob sceduler */
async function start() {
  const ping = await redisClient.ping();
  console.log(ping);
  cacheData()
    .then(() => {
      console.log('INFO ::: Starting CronJob');
      console.log(
        `INFO ::: It is scheduled as per the cron ${commonConfig.cronSchedule}`
      );
      task = cron.schedule(commonConfig.cronSchedule, () => {
        cronJob();
      });
    })
    .catch((err) => {
      console.log('ERORR in caching redis', err);
      console.log('Thus exiting');
      process.exit(0);
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
