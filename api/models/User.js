var mongoose         = require('mongoose');
var Schema           = mongoose.Schema;

/**
* User schema for mongo database
*/
var userSchema = new Schema({
  email:                { type: String, required: '{PATH} is required!', lowercase: true, unique: true },
  profile_pic_url:      { type: String, required: '{PATH} is required!' },
  source:               { type: String}
});

var User = mongoose.model('User', userSchema);

module.exports = {
  User: User
};

