var express = require('express');
const fs = require("fs");
var router = express.Router();
const mongoose = require('mongoose');

const {Article} = require('../models/articles');
const {Author}  = require('../models/authors');
let {authenticate} = require('../middleware/authenticate');

/* GET home page. */

router.get('/', function(req, res, next) {

    Article.find().then((articles) => {
        Author.find().then((authors) => {
            res.render('index', { articles, authors });
        }, e => res.send(e));
    }, (e) => {
        res.render("A problem occurred while saving the article.");
    });


});


module.exports = router;
