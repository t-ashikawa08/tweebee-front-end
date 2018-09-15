const express = require('express');
const expressLayouts = require('express-ejs-layouts');

const path = require('path');
const routes = require('./routes/index');
const bodyParser = require('body-parser');
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(expressLayouts);
app.use('/', routes);

app.use(function (req, res, next) {
  res.removeHeader('X-Powered-By');
  res.removeHeader('ETag');
  res.header('Cache-Control', ['private', 'no-store', 'no-cache', 'must-revalidate', 'proxy-revalidate'].join(','));
  res.header('no-cache', 'Set-Cookie');
});

app.listen(3000, function () {
  console.log('listening on port 3000');
});