var express = require('express');
var router = express.Router();

/* GET heartwall page. */
router.get('/heartwall', function(req, res) {
  res.render('hearts', { title: 'Heart Wall' });
});

module.exports = router;
