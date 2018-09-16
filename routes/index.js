var router = require('express').Router();
var Tokens = require("csrf");
var tokens = new Tokens();

router.get('/', function(req, res, next) {
    var secret = tokens.secretSync();
    var token = tokens.create(secret);
    
    req.session._csrf = secret;
    res.cookie("_csrf", token);
    
    res.render('index', { 
        title: 'Hello World!' 
    });
});

router.post("/login", function (req, res) {
    var secret = req.session._csrf;
    var token = req.cookies._csrf;

    if (tokens.verify(secret, token) === false) {
        throw new Error("Invalid Token");
    }
    
    delete req.session._csrf;
    res.clearCookie("_csrf");

    res.redirect("");
  });

module.exports = router;