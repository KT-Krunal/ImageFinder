
var UserController = require('./controllers/User');
var userController = new UserController();

module.exports = function(app, express) {
  
  var apiRouter = express.Router();
  
  apiRouter.get('/users/:email', userController.getUser);
  
  return apiRouter;
}