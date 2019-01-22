const express = require('express');
const expressLayouts = require('express-ejs-layouts');

const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('./libraries/Passport');

//routing files
const index = require('./routes/index');
const users = require('./routes/users');
const cooperation = require('./routes/cooperation');
const api_user = require('./routes/api/user');
const api_hobby = require('./routes/api/hobby');

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
    maxAge: 1000 * 60 * 60 * 24 //one day
  }
}));

//cookieParser
app.use(cookieParser())

//bodyParser
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

//session check
const sessionCheck = (req, res, next) => {
  if (req.session && req.session.user) {
      next();
  } else {
      res.redirect('/');
  }
};

//passport
app.use(passport.initialize());
app.use(passport.session());

//routing files routing
app.use('/', index);
app.use('/users', sessionCheck, users);
app.use('/cooperation', cooperation);
app.use('/api/user', api_user);
app.use('/api/hobby', api_hobby);

//view files routing
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//public dir routing
app.use(express.static(path.join(__dirname, 'public')));

//not found
app.use(function(req, res, next){
  res.status(404);
  res.render('404');
});

//http header information
app.use(function (req, res, next) {
  res.removeHeader('X-Powered-By');
  res.removeHeader('ETag');
  res.header('Cache-Control', ['private', 'no-store', 'no-cache', 'must-revalidate', 'proxy-revalidate'].join(','));
  res.header('no-cache', 'Set-Cookie');
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
});

app.listen(3000, function () {
  console.log('listening on port 3000');
});