//var router          = require('express').Router();
const router = require("express").Router();

var User = require("../models/User/User");
var jwt = require("jsonwebtoken"); // used to create, sign, and verify tokens
const config = require("../config");
var transporter=require("../helpers/transport")

// CREATES A NEW USER
router.post("/createAccount", function(req, res) {
   User.findOne(
    {
      email: req.body.email
    },
    function(err, user) {
      if (err) throw err;
      console.log(user);
      if (!user) {
        console.log("Creating a new account");
        User.create(
          {
            name: req.body.name,
            email: req.body.email
          },
          function(err, user) {
            console.log(err);
            if (err)
            {
              return res
                .status(500)
                .send("There was a problem adding the information to the database.");
            }
            else
            {
              console.log("We are going to send an email");
              console.log(transporter);
              mailOptions={
                  to : req.body.email,
                  subject : "Please confirm your Email account",
                  html : "Hello,<br> Please Click on the link to verify your email.<br><a href=''>Click here to verify</a>" 
                }
                transporter.sendMail(mailOptions, function(error, info) {
                  if (error) {
                    console.log('Got an error', error);
                    return res
                      .status(500)
                      .send("There was a problem sending an email.");
                  } else {
                    console.log('Sent email', info);
                    res.status(200).send(user);
                  }
              });
            }
                
            
          }
        );
      }else if (user) {
        res.json({
          success: false,
          message: "User exists already !!!"
        });
      }
    }); 
 /*  User.create(
    {
      name: req.body.name,
      email: req.body.email
    },
    function(err, user) {
      if (err)
        return res
          .status(500)
          .send("There was a problem adding the information to the database.");
      res.status(200).send(user);
    }
  ); */
});
// check user is a valid user or not
//https://scotch.io/tutorials/authenticate-a-node-js-api-with-json-web-tokens
router.post("/authenticate", function(req, res) {
  console.log("********************");
  console.log(req.body.email);
  User.findOne(
    {
      email: req.body.email
    },
    function(err, user) {
      if (err) throw err;
      console.log(user);
      if (!user) {
        res.json({
          success: false,
          message: "Authentication failed. User not found."
        });
      } else if (user) {
        // check if password matches
        if (user.password != req.body.password) {
          res.json({
            success: false,
            message: "Authentication failed. Wrong password."
          });
        } else if (user.active === false) {
          res.json({
            success: false,
            message: "not active user"
          });
        } else {
          // if user is found and password is right
          // create a token with only our given payload
          // we don't want to pass in the entire user since that has the password
          const payload = {
            admin: user.admin
          };

          var token = jwt.sign(payload, config.secret, {
            expiresIn: "1d" // expires in 24 hours
          });
          console.log(user);
          // return the information including token as JSON
          res.json({
            success: true,
            message: "Enjoy your token!",
            token: token,
            userName: user.name,
            userid: user.user_id
          });
        }
      }
    }
  );
});
router.use(function(req, res, next) {
  // check header or url parameters or post parameters for token
  var token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, config.secret, function(err, decoded) {
      if (err) {
        return res.json({
          success: false,
          message: "Failed to authenticate token."
        });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });
  } else {
    // if there is no token
    // return an error
    return res.status(403).send({
      success: false,
      message: "No token provided."
    });
  }
});
//app.use("/",router);
module.exports = router;
