
var UserController = require('./controllers/user');
var userController = new UserController();

module.exports = function(app, express) {
  
  var apiRouter = express.Router();
  
  apiRouter.get('/search/', userController.getUser);
  
  return apiRouter;
}