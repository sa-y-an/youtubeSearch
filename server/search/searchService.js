'use strict';

const { google } = require('googleapis');
const gaxios = require('gaxios');
const commonConfig = require('../commonconfig.json');
const searchConfig = require('./searchConfig.json');
const responseMessage = require('../utils/responseMessage');
const Search = require('./searchModel');

const basicFilter = {
  ytId: 1,
  title: 1,
  description: 1,
  publishedTime: 1,
  thumbnails: 1,
  _id: 0,
};

/** Helper Function to Paginate The API */
async function getPaginatedResults(query, options, callback) {
  let response;
  try {
    const results = await Search.paginate(query, options);
    if (!results.total) {
      console.log(
        'INFO::: No results found based on query: ' + JSON.stringify(query)
      );
      response = new responseMessage.ObjectDoesNotExistInDB();
      return callback(null, response, response.code);
    } else {
      console.log(
        'INFO::: results returned for query: ' + JSON.stringify(query)
      );
      response = new responseMessage.GenericSuccessMessage();
      response.total = results.total;
      response.limit = results.limit;
      response.page = results.page;
      response.pages = results.pages;
      response.data = results.docs;
      return callback(null, response, response.code);
    }
  } catch (err) {
    console.log(
      'ERROR ::: In finding results for query: ' +
        JSON.stringify(query) +
        '. Error: ' +
        JSON.stringify(err)
    );
    console.log(`ERROR ::: ${err.message}, stack: ${err.stack}`);
    response = new responseMessage.GenericFailureMessage();
    return callback(null, response, response.code);
  }
}

async function mainJob() {
  try {
    const searchQuery = {
      key: YT_API_KEY1,
      part: 'snippet',
      q: commonConfig.query,
      publishedAfter: searchConfig.publishedAfter,
      type: 'video',
      oder: 'date',
      maxResults: parseInt(searchConfig.maxResults),
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
    console.log('API KEYS ERROR');
    if (err instanceof gaxios.GaxiosError) {
      console.log(err.message);
      process.exit(0);
    }
    console.log(err.message);
    console.log(err);
  }
}

/** Async function to check if the data exists in cache */
async function getFilteredData(data) {
  // This call could be further optimized by fetching all the data once in a hash set
  // and then querrying, instead of individually querring for each element
  const promises = data.map(async (el) => {
    const flag = !(await redisClient.sIsMember('ytIds', el.ytId));
    if (flag) return el;
    return flag;
  });
  const results = await Promise.all(promises);
  return results;
}

module.exports = {
  /**API to check if new results exists and if it does store them in database */
  generateNewResults: async (req, callback) => {
    let response;
    try {
      const data = await mainJob();
      const trydata = await getFilteredData(data);
      const newdata = [];

      trydata.forEach(async (el) => {
        if (el != false) {
          newdata.push(el);
          console.log(el.ytId);
          await redisClient.sAdd('ytIds', el.ytId);
        }
      });

      const result = await Search.insertMany(newdata);
      response = new responseMessage.GenericSuccessMessage();
      // response.len = len;
      response.data = result;
      return callback(null, response, response.code);
    } catch (err) {
      console.log(err);
      console.log('ERROR in generate try catch ::: ', err);
      response = new responseMessage.GenericFailureMessage();
      return callback(null, response, response.code);
    }
  },

  /** API to fetch all the stored Results in a paginated fashion */
  getAllStoredResults: (req, callback) => {
    const query = {};
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    const sort = req.query.sort || 'publishedDate';
    const options = {
      page: page,
      limit: limit,
      select: basicFilter,
      sort: sort,
    };
    getPaginatedResults(query, options, callback);
  },

  /**Function to search data based on the given query */
  searchAllStoredResults: async (req, callback) => {
    const searchText = req.query.text;

    if (!searchText || searchText.length > 40) {
      const response = new responseMessage.GenericFailureMessage();
      return callback(null, response, parseInt(response.code));
    }

    const searchQuery = {
      $text: {
        $search: searchText,
      },
    };
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    const sort = req.query.sort || 'name';
    const options = {
      page: page,
      limit: limit,
      select: basicFilter,
      sort: sort,
    };
    getPaginatedResults(searchQuery, options, callback);
  },
};
