'use strict';

const { google } = require('googleapis');
const commonConfig = require('../commonconfig.json');
const searchConfig = require('./searchConfig.json');
const responseMessage = require('../utils/responseMessage');

async function mainJob() {
  try {
    const searchQuery = {
      key: YT_API_KEY1,
      part: 'snippet',
      q: commonConfig.query,
      publishedAfter: searchConfig.publishedAfter,
      type: 'video',
      oder: 'date',
    };

    const youtubeData = await google.youtube('v3').search.list(searchQuery);

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

    const metadata = data.pageInfo;
    const totalResults = {
      metadata,
      results,
    };
    return totalResults;
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  getResults: async (req, callback) => {
    let response;
    try {
      const data = await mainJob();
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
