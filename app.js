const express         = require('express');
const cors = require('cors')
const app             = express();
const morgan          = require('morgan');
const path            = require('path');
const apiroutes       = require('./routes');
const db              =require('./db')
const bodyParser      = require('body-parser');
const config          = require('./config'); 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.set('superSecret', config.secret); // secret variable
app.use(cors())
//import UserController from './controllers/UserController'
//var UserController = require('./controllers/UserController');
app.use('/',apiroutes)

app.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});
//All routes will go here

//app.use('/users', UserController);
//app.use(express.static(path.join(__dirname, 'controllers')));



module.exports = app;