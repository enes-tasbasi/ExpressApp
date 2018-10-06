var express = require('express');
var router = express.Router();

let {authenticate} = require('./../middleware/authenticate');

router.get('/contact', function(req, res) {
    let hbsData = (req.token) ? { user: req.user} : {};
    console.log(req.token);
    console.log(hbsData);
    res.render('contact', hbsData);

});

module.exports = router;