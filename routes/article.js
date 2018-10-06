let express = require('express');
let router = express.Router();
const _ = require('lodash');
const mongoose = require('mongoose');

//let articles = require('../public/javascripts/example-articles').articles;
let {changeFormat, pickElement} = require('./../public/javascripts/utils');
let {Article} = require('../models/articles');
let {Author} = require('../models/authors');
let {authenticate} = require


router.get('/article/:articleId', function (req, res, next) {

    Article.findById(req.params.articleId).then((article) => {

            Author.findById(article.author[0]).then((author) => {
                res.render('article', {article, author});
            }, (e) => {
                res.send(e);
            });

    }, (e) => {
        res.render(e + "Specified article does not exist");
    });

});

module.exports = router;
