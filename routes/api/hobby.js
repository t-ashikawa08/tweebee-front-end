const router = require('express').Router();
const commonLib = require('../../libraries/CommonLib');
const config = require('config');

router.get('/master', function(req, res, next) {
    commonLib.ajax(config.API + "/hobby/master", {}, function(error, responce, body){
        if (commonLib.getError(res, error, responce )) return;
        res.send(JSON.stringify(body.result));
    });
});

router.post('/register', function(req, res, next) {
    var json = req.body;

    commonLib.ajax(config.API + "/hobby/register/" + json.type, json, function(error, responce, body){
        if (commonLib.getError(res, error, responce )) return;
        res.send(JSON.stringify(body.result));
    });
});

module.exports = router;