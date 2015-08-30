
var restify = require('restify');
var config  = require('../config/env');

var client = restify.createJsonClient({
  url: config.fullContactHost
});

exports.getFullContactData = function(email, callback, res) {
  client.get(config.personApiUri + email, function(err, req, res, data) {
    if(err) {
      callback({
        success: false,
        error: err,
        email: email
      });
    } else {
      if(data.status === 200 && data.photos && data.photos.length > 0) {
        callback({
          success: true,
          email: email,
          profile_pic_url: data.photos[0].url,
          source: data.photos[0].type
        });
      } else {
          callback({
          success: false,
          error: 'results not available at this time',
          email: email
        });
      }
    }
  });
};