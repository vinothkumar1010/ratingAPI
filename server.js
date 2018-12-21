var app = require('./app');
var port = process.env.PORT || 8080; // used to create, sign, and verify tokens

var server = app.listen(port, function() {
  console.log('Express server listening on port ' + port);
});