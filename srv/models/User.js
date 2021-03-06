'use strict';

const mongoose = require('mongoose');
mongoose.Promise = Promise;

const mongoMask = require('./helpers/mongoMask');

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: String
},{
  timestamps: true,
  toObject: {transform: mongoMask}
});

const User = mongoose.model('User', userSchema);

module.exports = exports = User;
