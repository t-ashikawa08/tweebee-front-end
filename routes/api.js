const router = require('express').Router();
const commonLib = require('../libraries/CommonLib');
const config = require('config');

const getError = function(res, error, header) {
    if(error){
        res.status(500);
        res.end('Internal Server Error');
        return true;
    } else {
        return false;
    }
}

router.get('/master', function(req, res, next) {
    commonLib.ajax(config.API + "/hobby/master", {}, function(error, responce, body){
        if (getError(res, error, responce )) return;

        res.send(JSON.stringify(body.result));
    });
});

router.get('/user/hobby_get', function(req, res, next){
    commonLib.ajax(config.API + "/user/hobby_get", {user_id : req.session.user.id}, function(error, responce, body){
        if (getError(res, error, responce )) return;

        res.send(JSON.stringify(body.result));    
    });
});

router.post('/user/hobby_register', function(req, res, next) {
    var json = req.body;
    json.user_id = req.session.user.id;

    commonLib.ajax(config.API + "/user/hobby_register", json, function(error, responce, body){
        if (getError(res, error, responce )) return;
        res.send(JSON.stringify(body.result));
    });
});

router.post('/user/hobby_delete', function(req, res, next) {
    var json = req.body;
    json.user_id = req.session.user.id;

    commonLib.ajax(config.API + "/user/hobby_delete", json, function(error, responce, body){
        if (getError(res, error, responce )) return;
        res.send(JSON.stringify(body.result));
    });
});

module.exports = router;