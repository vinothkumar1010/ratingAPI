
//var router          = require('express').Router();
const router=require('express').Router();

var User = require('../models/User/User');

// CREATES A NEW USER
router.post('/createAccount', function (req, res) {
    User.create({
            name : req.body.name,
            email : req.body.email,
        }, 
        function (err, user) {
            if (err) return res.status(500).send("There was a problem adding the information to the database.");
            res.status(200).send(user);
        });
});
// check user is a valid user or not
router.post('/authenticate', function (req, res) {
    console.log("********************");
    User.findOne({
        name: req.body.email
      }, function(err, user) {
        
        if (err) throw err;
    
        if (!user) {
          res.json({ success: false, message: 'Authentication failed. User not found.' });
        } else if (user) {
    
          // check if password matches
          if (user.password != req.body.password) {
            res.json({ success: false, message: 'Authentication failed. Wrong password.' });
          } else {
    
            // if user is found and password is right
            // create a token with only our given payload
        // we don't want to pass in the entire user since that has the password
        const payload = {
          admin: user.admin     };
            var token = jwt.sign(payload, app.get('superSecret'), {
              expiresInMinutes: 1440 // expires in 24 hours
            });
    
            // return the information including token as JSON
            res.json({
              success: true,
              message: 'Enjoy your token!',
              token: token
            });
          } 
        }
    
      });
});
router.use(function(req, res, next) {

    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
  
    // decode token
    if (token) {
  
      // verifies secret and checks exp
      jwt.verify(token, app.get('superSecret'), function(err, decoded) {       if (err) {
          return res.json({ success: false, message: 'Failed to authenticate token.' });       } else {
          // if everything is good, save to request for use in other routes
          req.decoded = decoded;         next();
        }
      });
  
    } else {
  
      // if there is no token
      // return an error
      return res.status(403).send({ 
          success: false, 
          message: 'No token provided.' 
      });
  
    }
  });
//app.use("/",router);
module.exports=router;