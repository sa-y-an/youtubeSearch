'use strict';

const { google } = require('googleapis');
const commonConfig = require('../commonconfig.json');
const searchConfig = require('./searchConfig.json');
const responseMessage = require('../utils/responseMessage');
const Search = require('./searchModel');

async function mainJob() {
  try {
    const searchQuery = {
      key: YT_API_KEY1,
      part: 'snippet',
      q: commonConfig.query,
      publishedAfter: searchConfig.publishedAfter,
      type: 'video',
      oder: 'date',
      maxResults: 5,
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
          defaultURL: item.snippet.thumbnails.default.url,
          mediumURL: item.snippet.thumbnails.medium.url,
          highURL: item.snippet.thumbnails.high.url,
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
      const data = await mainJob();
      const existingIds = await Search.find().select('ytId -_id');

      // using hashset to cache the results
      // to be replaced by redis
      const cachedIds = new Set();
      existingIds.forEach((el) => cachedIds.add(el.ytId));

      console.log(cachedIds);
      const newdata = [];
      data.forEach((el) => {
        if (!cachedIds.has(el.ytId)) {
          newdata.push(el);
        }
      });

      const len = newdata.length;
      const result = await Search.insertMany(newdata);

      response = new responseMessage.GenericSuccessMessage();
      response.len = len;
      response.data = result;
      return callback(null, response, response.code);
    } catch (err) {
      console.log('ERROR ::: ', err);
      response = new responseMessage.GenericFailureMessage();
      return callback(null, response, response.code);
    }
  },
};
