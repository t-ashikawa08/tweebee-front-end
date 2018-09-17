const router = require('express').Router();
const commonLib = require('../libraries/CommonLib');
const config = require('config');

router.get('/master', function(req, res, next) {
    commonLib.ajax(config.API + "/hobby/master", {}, function(error, responce, body){
        if (error){
            console.log('error: ' + error.message);
            res.status(500);
            res.end('Internal Server Error');
            return;
        }

        res.send(JSON.stringify(body.result));
    });
});

router.post('/user/hobby_register', function(req, res, next) {
    var json = req.body;
    json.user_id = req.session.user.id;

    commonLib.ajax(config.API + "/user/hobby_register", json, function(error, responce, body){
        if (error){
            console.log('error: ' + error.message);
            res.status(500);
            res.end('Internal Server Error');
            return;
        }

        res.send(JSON.stringify(body.result));
    });
});

module.exports = router;