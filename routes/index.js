var routes          = require('express').Router();
var UserController = require('../controllers/UserController');
routes.use("/user",UserController)
module.exports=routes;