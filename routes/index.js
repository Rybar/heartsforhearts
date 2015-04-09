require('dotenv').load();
var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

/* GET home page. */

// set up transporter for nodemail
var transporter = nodemailer.createTransport({
            service: 'Mandrill',
            auth: {
              user: process.env.MANDRILL_USERNAME,
              pass: process.env.MANDRILL_API_KEY
            }
  });
      
router.get('/data', function(req, res) {
  res.render('index', { title: 'Save A Childs Heart' });  
});

/* GET heartwall page. */
router.get('/', function(req, res) {
  res.render('hearts', {
    viewHeart: req.query.viewHeart || null,
    addHeart: req.query.addHeart || null,
    name: decodeURIComponent(req.query.name) || null,
    amount: req.query.amount || null,
    anonymous: req.query.anonymous || null,
    email: req.query.email || null,
    message: decodeURIComponent(req.query.message) || null,
    currency: req.query.currency || null,
    color: req.query.color || null,
    style: req.query.style || null,
    donationId: req.query.donationId || null,
    dedicatedName: req.query.dedicatedName || null,
    dedicatedEmail: req.query.dedicatedEmail || null,
    title: 'Save A Childs Heart'
    });
    
    // our confirmation email body
    var confirmationMailOptions = {
      to: req.query.email,
      from: 'devteam@freecodecamp.com',
      subject: 'TEST SACH HEART Confirmation!',
      text: [
        'Greetings from SACH!\n\n',
        'Thank you for donating for a heart surgery.\n',
        'Feel free to email us at this address if you have any questions about SACH.\n',
        "Your can view your heart here.\n",
      ].join('')
    };
    //check for email in URL query string
    if(req.query.email) {
      console.log("dedication email in query, sending email..");
      transporter.sendMail(confirmationMailOptions, function(err, response) {
        if (err) {
          console.log(err);
          return err; }
        else {
          console.log("successfully sent: " + response.message);
        }
      });
    }
    
    //dedication email body
    var dedicationMailOptions = {
      to: req.query.dedicatedEmail,
      from: 'devteam@freecodecamp.com',
      subject: 'TEST SACH HEART Confirmation!',
      text: [
        'Greetings from SACH!\n\n',
        req.query.name + " has made a donation to the Save A Child's Heart foundation and dedicated it to you.\n",
        'Feel free to email us at this address if you have any questions about SACH.\n',
        "Your can view the heart they purchased here (link) \n",
      ].join('')
    };
    //check for email in URL query string
    if(req.query.dedicatedEmail) {
      console.log("email in query, sending email..");
      transporter.sendMail(dedicationMailOptions, function(err, response) {
        if (err) {
          console.log(err);
          return err; }
        else {
          console.log("successfully sent: " + response.message);
        }
      });
    }
});

module.exports = router;

