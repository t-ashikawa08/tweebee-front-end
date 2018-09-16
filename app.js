const express = require('express');
const expressLayouts = require('express-ejs-layouts');

const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

//routing files
const index = require('./routes/index');

//app create
const app = express();

//layout files
app.use(expressLayouts);

//session
app.use(session({
  secret: 'tweebee8',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 30 * 60 * 1000
  }
}));

//cookieParser
app.use(cookieParser())

//bodyParser
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

//routing files routing
app.use('/', index);

//view files routing
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//public files routing
app.use(express.static(path.join(__dirname, 'public')));

//http header information
app.use(function (req, res, next) {
  res.removeHeader('X-Powered-By');
  res.removeHeader('ETag');
  res.header('Cache-Control', ['private', 'no-store', 'no-cache', 'must-revalidate', 'proxy-revalidate'].join(','));
  res.header('no-cache', 'Set-Cookie');
});

app.listen(3000, function () {
  console.log('listening on port 3000');
});