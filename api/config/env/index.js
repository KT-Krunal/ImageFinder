'use strict';

var _ = require('lodash');

// All configurations will extend these options
// ============================================
var all = {
  env: process.env.NODE_ENV,
  port: process.env.PORT || 3001,
  fullContactHost: 'https://api.fullcontact.com',
  personApiUri: '/v2/person.json?apiKey=9581211c43ae43ab&email='
};

// Export the config object based on the NODE_ENV
// ==============================================
module.exports = _.merge(
  all,
  require('./' + process.env.NODE_ENV + '.js') || {});
