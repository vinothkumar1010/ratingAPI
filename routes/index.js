var routes = require("express").Router();
var UserController = require("../controllers/UserController");
var MovieController = require("../controllers/MovieController");
routes.use("/user", UserController);
routes.use("/movies", MovieController);
module.exports = routes;
