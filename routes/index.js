var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Save A Childs Heart' });  
});

/* GET heartwall page. */
router.get('/hearts', function(req, res) {
  res.render('hearts', {
    viewHeart: req.query.viewHeart || null,
    addHeart: req.query.addHeart || null,
    name: decodeURIComponent(req.query.name) || null,
    donation: req.query.donation || null,
    anonymous: req.query.anonymous || null,
    email: req.query.email || null,
    initials: req.query.initials || null,
    message: decodeURIComponent(req.query.message) || null,
    currency: req.query.currency || null,
    color: req.query.color || null,
    style: req.query.style || null,
    id: req.query.id || null,

    title: 'Save A Childs Heart'
    });
});

module.exports = router;

