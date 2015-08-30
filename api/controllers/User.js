var mongoose            = require('mongoose');
var User                = require('../models/User').User;
var fullContactClient   = require('../utils/fullContactClient');

var UserController = function() {
  return {
    getUser: getUser
  }

  function createUser(user, res) {
    User.create(user, function (err, user) {
      if (!err) console.log('user saved successfully to database. email id: ' + user.email);
    });
  };

  //this method can be easily extended to consume various services to find the result
  function searchUser(email, res) {
    
    function handleFullContactResponse(data) {
      if(data && data.success == true) {
        //insert the record into the database for future reference
        var resObj = {
                email: data.email,
                profile_pic_url: data.profile_pic_url,
                source: data.source
        };
        
        createUser(resObj);
        //return the response
        res.type('json').json(resObj);
      } else {
        console.log('FullContact API did not return any result for email:' + email);
        return res.status(404).send('user not found');
      }
    };

    console.log('User not found..check FullContact API first.');
    fullContactClient.getFullContactData(email, handleFullContactResponse);
  };

  function getUser(req, res) {
    User.findOne({email: req.params.email}).exec(function(err, user) {
      if (err) {
        console.log('db error: ' + err.toString());
        return res.status(500).send('we are looking into it. come back soon!');
      }

      if(!user) {
        //search for the image using various services
        searchUser(req.params.email, res);
      } else {
        console.log('user found in database. email: ' + req.params.email);
        res.type('json').json(user);
      }
    });
  };
}

module.exports = UserController;
