var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Save A Childs Heart' });  
});

/* GET heartwall page. */
router.get('/hearts', function(req, res) {
  res.render('hearts', { title: 'Save A Childs Heart' });
});

module.exports = router;
