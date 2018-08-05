
// connect to mongodb
require('./config/config');
require('./db/mongoose');

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const hbs = require('hbs');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
let articleRouter = require('./routes/article');
var contactRouter = require('./routes/contact');
let authorRouter = require('./routes/author');
const {changeFormat} = require('./public/javascripts/utils');

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
