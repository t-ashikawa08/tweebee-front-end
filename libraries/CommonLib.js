const CommonLib = {
    ajax: function(url, json, callback){
        const request = require('request');
        const options = {
            url: url,
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type':'application/json'
            },
            json: true,
            form: json,
            resolveWithFullResponse: true,
        };
    
        request(options, function(error, responce, body){
            callback(error, responce, body);
        });
    },
    getError: function(res, error, header){
        if(error){
            res.status(500);
            res.end('Internal Server Error');
            return true;
        } else {
            return false;
        }
    },
}

module.exports = CommonLib;