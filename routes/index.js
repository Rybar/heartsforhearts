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
    //initials: req.query.initials || null,
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
    var mailOptions = {
      to: req.query.email,
      from: 'ryan.malm@gmail.com',
      subject: 'TEST SACH HEART Confirmation!',
      text: [
        'Greetings from SACH!\n\n',
        'Thank you for donating for a heart surgery.\n',
        'Feel free to email us at this address if you have any questions about SACH.\n',
        "Your heart is at .\n",
        'Good luck with the challenges!\n\n',
        '- the Volunteer Camp Counselor Team'
      ].join('')
    };
    //check for email in URL query string
    if(req.query.email) {
      console.log("email in query, sending email..");
      transporter.sendMail(mailOptions, function(err, response) {
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

