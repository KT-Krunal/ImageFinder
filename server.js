'use strict';

//Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// Setup Express Server for API as well as Client app
var express        = require('express');
var app            = express();
var server         = require('http').createServer(app);
var config         = require('./api/config/env');
var http           = require('http');
// api routes
var apiRoutes      = require('./api/routes')(app, express);

//app.disable('etag');

// connect to database
require('./api/config/mongoose')(config);

// setup API route
app.use('/api', apiRoutes);

// serve the app
app.use(express.static('app/public'));


// Start server
server.listen(config.port, function () {
  var port = server.address().port;
  console.log('App listening at port %d', config.port);
});

exports = module.exports = app;




