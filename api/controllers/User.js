var mongoose            = require('mongoose');
var User                = require('../models/user').User;
var fullContactClient   = require('../utils/fullContactClient');

/**
* This class exposes methods for CRUD operations for User db schema
*/
var userController = function() {
  return {
    getUser: getUser
  }

  /**
  * method to insert new user to db
  */
  function createUser(user, res) {
    User.create(user, function (err, user) {
      if (!err) console.log('user saved successfully to database. email id: ' + user.email);
    });
  };

  /**
  * method to search user image by email id using third party services
  * currently it only connects to FullContact service API for lookup however this
  * can be easily extended to search multiple services 
  *
  */
  function searchUser(email, res) {
    
    /**
    * handle the api response
    */
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

  /**
  * method to find user image by provided email id
  */
  function getUser(req, res) {

    var email = req.query.email;

    if(!email) {
      return res.status(400).send('"email" query parameter not provided');
    }

    User.findOne({email: email}).exec(function(err, user) {
      if (err) {
        console.log('db error: ' + err.toString());
        return res.status(500).send('we are looking into it. come back soon!');
      }

      if(!user) {
        //search for the image using various services
        searchUser(email, res);
      } else {
        console.log('user found in database. email: ' + email);
        res.type('json').json(user);
      }
    });
  };
}

module.exports = userController;
