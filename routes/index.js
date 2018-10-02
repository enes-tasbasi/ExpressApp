var express = require('express');
const fs = require("fs");
var router = express.Router();
const mongoose = require('mongoose');

const {Article} = require('../models/articles');
const {Author}  = require('../models/authors');
let {authenticate} = require('../middleware/authenticate');

/* GET home page. */

router.get('/', authenticate,  function(req, res, next) {

    Article.find().then((articles) => {
        Author.find().then((authors) => {

            //if the user is logged in, the user object will also be passed to hbs
            let hbsData = (req.token) ? { articles, authors, user: req.user} : { articles, authors };
            res.render('index', hbsData);
        }, e => res.send(e));
    }, (e) => {
        res.render("A problem occurred while saving the article.");
    });


});


module.exports = router;
