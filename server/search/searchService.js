'use strict';

const { google } = require('googleapis');
const commonConfig = require('../commonconfig.json');
const responseMessage = require('../utils/responseMessage');

async function main() {
  try {
    const youtubeData = await google.youtube('v3').search.list({
      key: YT_API_KEY1,
      part: 'snippet',
      q: commonConfig.query,
    });

    const { data } = youtubeData;
    const results = [];
    data.items.forEach((item) => {
      results.push({
        ytId: item.id.videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        publishTime: item.snippet.publishTime,
        thumbnailURLs: {
          default: item.snippet.thumbnails.default.url,
          medium: item.snippet.thumbnails.medium.url,
          high: item.snippet.thumbnails.high.url,
        },
      });
    });
    return results;
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  getResults: async (req, callback) => {
    let response;
    try {
      const data = await main();
      response = new responseMessage.GenericSuccessMessage();
      response.data = data;
      return callback(null, response, response.code);
    } catch (err) {
      console.log('ERROR ::: ', err);
      response = new responseMessage.GenericFailureMessage();
      return callback(null, response, response.code);
    }
  },
};
