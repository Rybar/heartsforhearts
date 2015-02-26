var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Heart Wall' });
});

/* GET heartwall page. */
router.get('/heartwall', function(req, res) {
  res.render('hearts', { title: 'Heart Wall' });
});

module.exports = router;
