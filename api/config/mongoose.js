var mongoose = require('mongoose');
var userModel = require('../models/user');

module.exports = function(config) {
  
  mongoose.connect(config.mongo.uri);
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error...'));
  db.once('open', function callback() {
    console.log('connected to search database..');
  });

};
