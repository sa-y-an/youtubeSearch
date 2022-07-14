'use strict';

const mongoose = require('mongoose');
const validators = require('../utils/validators');

const thumbnailSchema = new mongoose.Schema({
  _id: false,
  medium: validators.urlValidator,
  default: validators.urlValidator,
  small: validators.urlValidator,
});

module.exports = {
  thumbnailModel: thumbnailSchema,
};
