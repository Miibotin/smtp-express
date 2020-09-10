'use strict';
const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv').config();

app.set('port', 3000);
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

app.listen(process.env.PORT || 5000);

let transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.GMAIL_USERNAME,
    pass: process.env.GMAIL_PASSWORD
  }
});

app.post('/', function (req, res, err) {
  let info = transporter.sendMail({
    from: req.body[1].value, // NOT NEEDED WITH GOOGLE
    to: '', // list of receivers
    subject: `Message from ${req.body[0].value}`, // Subject line
    text: req.body[2].value + "\n\n\n\n Original sender's adrress is: " + req.body[1].value // plain text body
  });

  res.end('{"success" : "Updated Successfully", "status" : 200}');
});