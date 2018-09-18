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
let articleRouter = require('./routes/article');
var contactRouter = require('./routes/contact');
let authorRouter = require('./routes/author');
let userRouter = require('./routes/user');
const {changeFormat} = require('./public/javascripts/utils');
let {Article} = require('./models/articles');
let {Author} = require('./models/authors');

let {authenticate} = require('./middleware/authenticate');

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


//register hbs partials
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('changeFormat', changeFormat);
hbs.registerHelper('articlePreview', articlePreview);

function articlePreview(body) {
    if(body.length > 559) {
        return body.slice(0, 555) + "...";
    }

    return body;
}

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', indexRouter);
app.get('/article/:articleTitle', articleRouter);
app.get('/contact', contactRouter);
app.get('/author/:authorId', authorRouter);
app.post('/user', userRouter);
app.get('/user/me', userRouter);
app.post('/user/login', userRouter);
app.delete('/user/me/token', userRouter);

// this route gets called from the form in the main page
app.get('/submitArticle', (req, res) => {

    let article = new Article;
    article.title = req.query.title;
    article.body = req.query.body;
    article.author[0] = mongoose.Types.ObjectId(req.query.author);
    article.save().then((doc) => {
        res.redirect('/');
    }, (e) => {
        res.send(e + "  Couldn't save the article");
    });
});
app.get('/deleteArticle/:articleId', (req, res) => {

    Article.deleteOne({_id: req.params.articleId}).then((doc) => {
        res.redirect('/');
    }, (e) => {
        res.render("Couldn't remove article");
    });
});


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
