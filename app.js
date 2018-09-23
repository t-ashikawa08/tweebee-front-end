const express = require('express');
const expressLayouts = require('express-ejs-layouts');

const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const config = require('config');
const passport = require('passport');
const TwitterStrategy = require('passport-twitter');

//routing files
const index = require('./routes/index');
const users = require('./routes/users');
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

//routing files routing
app.use('/', index);
app.use('/users', sessionCheck, users);
app.use('/api/user', api_user);
app.use('/api/hobby', api_hobby);


//view files routing
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//public files routing
app.use(express.static(path.join(__dirname, 'public')));

//twitter cooperation
passport.serializeUser((user, callback) => {
  callback(null, user);
});

passport.deserializeUser((obj, callback) => {
  callback(null, obj);
});

passport.use(new TwitterStrategy({
  consumerKey: config.TwitterConfig.ApiKey,
  consumerSecret: config.TwitterConfig.ApiSecretKey,
  callbackURL: config.CallBackUrl
}, (accessToken, refreshToken, profile, callback) => {
  process.nextTick(() => {
    return callback(null, profile);
  });
}));

app.use(passport.initialize());
app.use(passport.session());

//twitter cooperation routing
app.get('/cooperation', passport.authenticate('twitter'));
app.get('/cooperation/callback', passport.authenticate('twitter', {failureRedirect: '/login' }), (req, res) => {
  let user = req.session.passport.user._json;
  req.session.user = {
    id: user.id,
    name: user.name,
    screen_name: user.screen_name,
    description: user.description,
    location: user.location,
    url: user.url,
    profile_image_url_https: user.profile_image_url_https.replace("normal.jpg", "400x400.jpg"),
    oauth_token: req.query.oauth_token,
    oauth_token_secret: req.query.oauth_verifier
  }
  delete req.session.passport;
  res.redirect('/users/profile'); 
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