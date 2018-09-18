var express = require('express');
var router = express.Router();

let {authenticate} = require('./../middleware/authenticate');

router.get('/contact', function(req, res, next) {
    res.render('contact', { title: 'Express' });

});

module.exports = router;