'use strict';

var username = process.env.USERNAME
  , pw = process.env.PASSWORD;

module.exports = {
  create: {
    user: username,
    pass: pw,
    language: 116,
    run: true,
    private: true
  },
  details: {
    user: username,
    pass: pw,
    withOutput: true
  }
};