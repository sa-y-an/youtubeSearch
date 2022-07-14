'use strict';

const mongoose = require('mongoose');
const validators = require('../utils/validators');

const thumbnailSchema = new mongoose.Schema({
  _id: false,
  mediumURL: {
    type: String,
    validate: validators.urlValidator,
  },
  defaultURL: {
    type: String,
    validate: validators.urlValidator,
  },
  highURL: {
    type: String,
    validate: validators.urlValidator,
  },
});

module.exports = {
  thumbnailModel: thumbnailSchema,
};
