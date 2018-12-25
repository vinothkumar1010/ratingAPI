var mongoose = require("mongoose");
mongoose.set("debug", true);
mongoose.connect("mongodb://localhost:27017/ratingapp");

mongoose.Promise = global.Promise;
//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));
