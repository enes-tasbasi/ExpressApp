
// connect to mongodb
require('./config/config');
require('./db/mongoose');

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const hbs = require('hbs');
const mongoose = require('mongoose');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
let articleRouter = require('./routes/article');
var contactRouter = require('./routes/contact');
let authorRouter = require('./routes/author');
const {changeFormat} = require('./public/javascripts/utils');
let {Article} = require('./models/articles');
let {Author} = require('./models/authors');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


//register hbs partials
hbs.registerPartials(__dirname +  '/views/partials');
hbs.registerHelper('changeFormat', changeFormat);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.get('/', indexRouter);
app.get('/users', usersRouter);
app.get('/article/:articleTitle', articleRouter);
app.get('/contact', contactRouter);
app.get('/author/:authorId', authorRouter);

// this route gets called from the form in the main page
app.post('/submitArticle', (req, res) => {

    let article = new Article;
    article.title = req.body.title;
    article.body = req.body.body;
    article.author[0] = mongoose.Types.ObjectId(req.body.author);
    console.log(article.author);
    article.save().then((doc) => {
        res.redirect('/');
    }, (e) => {
        res.render("Couldn't save the article");
    });
});

app.get('/deleteArticle/:articleId', (req, res) => {

    Article.deleteOne({ _id: req.params.articleId }).then((doc) => {
        res.redirect('/');
    }, (e) => {
        res.render("Couldn't remove article");
    });
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
