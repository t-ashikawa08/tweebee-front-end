const router = require('express').Router();
const commonLib = require('../../libraries/CommonLib');
const config = require('config');

router.get('/hobby_get', function(req, res, next){
    var json = {
        user_id : req.session.user.id, 
        type: req.query.type 
    }
    
    commonLib.ajax(config.API + "/user/hobby_get", json, function(error, responce, body){
        if (commonLib.getError(res, error, body )) return;
        res.send(JSON.stringify(body.result));    
    });
});

router.post('/hobby_register', function(req, res, next) {
    var json = req.body;
    json.user_id = req.session.user.id;

    commonLib.ajax(config.API + "/user/hobby_register", json, function(error, responce, body){
        if (commonLib.getError(res, error, body )) return;
        res.send(JSON.stringify(body.result));
    });
});

router.post('/hobby_delete', function(req, res, next) {
    var json = req.body;
    json.user_id = req.session.user.id;

    commonLib.ajax(config.API + "/user/hobby_delete", json, function(error, responce, body){
        if (commonLib.getError(res, error, body )) return;
        res.send(JSON.stringify(body.result));
    });
});

module.exports = router;