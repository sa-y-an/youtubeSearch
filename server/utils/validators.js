'use strict';

const validate = require('mongoose-validator');

const urlValidator = [
  validate({
    validator: 'isURL',
    message: 'provide a valid url',
  }),
];

module.exports = {
  urlValidator,
};
