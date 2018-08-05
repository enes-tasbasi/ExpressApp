var express = require('express');
const fs = require("fs");
var router = express.Router();
const mongoose = require('mongoose');

const {Article} = require('../models/articles');
const {Author}  = require('../models/authors');


/* GET home page. */

router.get('/', function(req, res, next) {


    // let temp = Article();
    //
    // temp.title = 'How to code';
    // temp.body = 'Lorem ipsum.....';
    // let aut = [type = mongoose.Types.ObjectId("5b63bbe1be6116828a82b407")];
    // temp.author = aut;
    // temp.save().then((doc) => {
    //     res.send(doc);
    // }, (e) => {
    //     res.send(e);
    // });

    Article.find().then((articles) => {
        Author.find().then((authors) => {
            res.render('index', { articles, authors });
        }, e => res.send(e));
    }, (e) => {
        res.render("A problem occurred while saving the article.");
    });


});


module.exports = router;
