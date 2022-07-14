'use strict';

const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const { thumbnailModel } = require('../models/thumbnails');

const searchSchema = mongoose.Schema(
  {
    ytId: {
      type: String,
      unique: true,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      trim: true,
    },
    publishTime: {
      type: Date,
      required: true,
    },
    thumbnails: thumbnailModel,
  },
  {
    timestamps: true,
  }
);

searchSchema.plugin(mongoosePaginate);
searchSchema.index({ title: 'text', description: 'text' });
// create the model for Search Results and expose it to the app
module.exports = mongoose.mainConnection.model(
  'Search',
  searchSchema,
  'searches'
);
