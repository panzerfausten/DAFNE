var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var   config       = require('config');
var indexRouter        = require('./routes/index');
var usersRouter        = require('./routes/users');
var perspectivesRouter = require('./routes/perspectives');
var favoutiresRouter   = require('./routes/favourites');
var commentsRouter     = require('./routes/comments');



var app = express();
//Config files

const CORS_ORIGINS  = config.get('Cors.origins');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json({limit: '10MB'} ));
app.use(express.urlencoded({limit: '50mb', extended: false,parameterLimit:50000 }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({credentials: true, origin: CORS_ORIGINS}));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/perspectives', perspectivesRouter);
app.use('/favourites', favoutiresRouter);
app.use('/comments', commentsRouter);


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
