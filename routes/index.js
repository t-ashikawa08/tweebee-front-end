const router = require('express').Router();
const Tokens = require("csrf");
const tokens = new Tokens();

router.get('/', function(req, res, next) {
    let secret = tokens.secretSync();
    let token = tokens.create(secret);
    
    req.session._csrf = secret;
    res.cookie("_csrf", token);

    res.render('index', { 
        title: 'Hello World!' 
    });
});

router.post("/login", function (req, res) {
    let secret = req.session._csrf;
    let token = req.cookies._csrf;

    if (tokens.verify(secret, token) === false) {
        throw new Error("Invalid Token");
    }
    
    delete req.session._csrf;
    res.clearCookie("_csrf");

    console.log(req.body)

    res.redirect("/");
});

module.exports = router;