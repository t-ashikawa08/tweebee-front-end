const router = require('express').Router();
const commonLib = require('../libraries/CommonLib');
const config = require('config');
const Tokens = require("csrf");
const tokens = new Tokens();

router.get('/profile', function(req, res, next) {
    res.render('users/profile', {
        user: req.session.user
    });
});

router.get('/profile_edit', function(req, res){
    commonLib.ajax(config.API + "/user/hobby_get", {user_id : req.session.user.id}, function(error, responce, body){
        if (error){
            console.log('error: ' + error.message);
            res.status(500);
            res.end('Internal Server Error');
            return;
        }

        var hobbies = body.result;
        res.render('users/profile_edit', {
            hobbies: hobbies,
        });    
    });
});

module.exports = router;