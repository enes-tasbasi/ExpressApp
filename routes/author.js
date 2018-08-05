let express = require('express');
let router = express.Router();
const _ = require('lodash');
const fs = require("fs");

let {Author} = require('./../models/authors');
let {Article} = require('./../models/articles');


router.get('/author/:authorId', function (req, res, next) {
// TODO: fix the issue were it doens't render all the corresponding articles
    Author.findById(req.params.authorId).then((author) => {
        Article.find({author: [author._id]}).then((articles) => {
            res.render('author', {author, articles});

        });
    }).catch((e) => {
        res.render("An error occurred while creating this page")
    })

});

module.exports = router;
