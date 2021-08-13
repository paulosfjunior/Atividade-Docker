const createError = require('http-errors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const serveFavicon = require('serve-favicon');
const serveStatic = require('serve-static');

var indexRouter = require('./routes/index');

var app = express();

const metodosPermitidos = ['GET', 'POST', 'PUT', 'DELETE'];

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(morgan('dev'));
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));
app.use(cookieParser());
app.use(helmet());
app.use(serveStatic(path.join(__dirname, 'public')));
app.use(serveFavicon(path.join(__dirname + '/public/images/favicon.ico')));

app.use(cors({ methods: metodosPermitidos }));

app.use(function onrequest(req, res, next) {
  if (!metodosPermitidos.includes(req.method)) {
    return res.status(405).json({ status: 405, err: 'Método não permitido', msg: '' });
  } else {
    next();
  }
});

app.use('/', indexRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

(async() => {
  const database = require('./utils/db');

  try {
    const resultado = await database.sync();
    console.log('Banco Criado');
  } catch (error) {
    console.log(error);
  }
})();

module.exports = app;