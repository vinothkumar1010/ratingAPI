const router = require("express").Router();

var Movies = require("../models/Movies/Movies");
var jwt = require("jsonwebtoken"); // used to create, sign, and verify tokens
const config = require("../config");
// CREATES A NEW USER
router.post("/addNewMovie", function(req, res) {
  Movies.create(
    {
      name: req.body.movieName,
      language: req.body.movieLanguage,
      region: req.body.movieRegion,
      released: req.body.movieReleased,
      release_date: new Date(Date.now()).toISOString(),
      poster: ""
    },
    function(err, user) {
      if (err) {
        console.log(err);
        return res
          .status(500)
          .send("There was a problem adding the information to the database.");
      }
      res.status(200).send(Movies);
    }
  );
});
module.exports = router;
