'use strict';

function getMongoDatabaseUrls() {
  let mongoMainUrl;

  ENVIRONMENT = process.env.NODE_ENV;

  if (ENVIRONMENT === 'production') {
    mongoMainUrl = `mongodb+srv://${mongoMainUser}:${mongoMainPass}@${mongoMainHost}/${mongoMainDB}?retryWrites=true&w=majority`;
  } else {
    mongoMainUrl = `mongodb+srv://${mongoMainUser}:${mongoMainPass}@${mongoMainHost}/${mongoMainDB}?retryWrites=true&w=majority`;
  }
  return { mongoMainUrl };
}

let { mongoMainUrl } = getMongoDatabaseUrls();

function getRedisCoonfig() {
  let redisConfig;

  redisConfig = {
    socket: {
      port: redisPORT,
      host: redisHOST,
    },
  };

  return redisConfig;
}
const redisConfig = getRedisCoonfig();

module.exports = {
  mongoMainUrl: mongoMainUrl,
  redisConfig,
};
