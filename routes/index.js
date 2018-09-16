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

router.get('/cooperation', function(req, res){
    let Twitter = require('twitter');
 
    let client = new Twitter({
        consumer_key: '',
        consumer_secret: '',
        access_token_key: '',
        access_token_secret: ''
    });
    
    let params = {screen_name: 'nodejs'};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
        console.log(tweets);
    }
    });
});

module.exports = router;