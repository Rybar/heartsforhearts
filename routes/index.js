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
1
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
      subject: 'Thank you for your donation to SACH!',
      text: [
        'Dear ' + req.query.dedicatedName + ',\n\n',
        req.query.name + " has donated to Save a Child's Heart in your honour. Not only that, they have created a personalised heart with a message for you at Hearts for Hearts!\n\n",
        
        "To view your personalized heart on the Hearts for Hearts wall, click the link below:\n\n",
        
        process.env.APP_URL + "?viewHeart="  + req.query.donationId + "\n\n", 

        "Save A Child's Heart is a non-profit organization committed to saving lives by improving the quality of ",
        "cardiac care for children from developing countries and creating centers of medical competence ",
        "in these countries. They have saved the lives of over 3000 children in desperate need of heart ",
        "surgery and trained dozens of medical professionals in the field.\n\n",

        "Hearts for Hearts is a fundraising platform formed through collaboration between SACH and ",
        "Free Code Camp,  Free Code Camp – a place where they teach people to code, and put those skills to use by coding pro bono for nonprofit organizations.\n\n",

        "Thank you for being part of this mission with us.\n\n",

        "The Hearts for Hearts Team,\n\n",
        
        "Shier Ziser - Save a Child's Heart,\n",
        "Christopher Nguyen, - Free Code Camp\n",
        "Ryan Malm - Free Code Camp\n"
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
      subject: 'A donation has been made in your honour.',
      text: [
        'Dear ' + req.query.dedicatedName + ',\n\n',
        "Thank you for donating to Save a Child's Heart via Hearts for Hearts. Your valued donation is going to help save the life of a child suffering from heart disease.\n\n",

        "To view your personalized heart on the Hearts for Hearts wall, click the link below:\n\n",
        
        process.env.APP_URL + "?viewHeart="  + req.query.donationId + "\n\n", 

        "Save A Child's Heart is a non-profit organization committed to saving lives by improving the quality of ",
        "cardiac care for children from developing countries and creating centers of medical competence ",
        "in these countries. They have saved the lives of over 3000 children in desperate need of heart ",
        "surgery and trained dozens of medical professionals in the field.\n\n",

        "Hearts for Hearts is a fundraising platform formed through collaboration between SACH and ",
        "Free Code Camp,  Free Code Camp – a place where they teach people to code, and put those skills to use by coding pro bono for nonprofit organizations.\n\n",

        "Thank you for being part of this mission with us.\n\n",

        "The Hearts for Hearts Team,\n\n",
        
        "Shier Ziser - Save a Child's Heart,\n",
        "Christopher Nguyen, - Free Code Camp\n",
        "Ryan Malm - Free Code Camp\n"
        
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

