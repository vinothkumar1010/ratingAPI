require("dotenv").config();
var mailer = require("nodemailer");

var mailConfig = {
  service: process.env.SERVICE_NAME,
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD
  }
};
var smtpConfig = {
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // use SSL
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD
  }
};

var transporter = mailer.createTransport(smtpConfig);

module.exports = transporter;
