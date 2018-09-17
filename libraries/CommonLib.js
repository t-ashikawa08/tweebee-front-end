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
    }    
}

module.exports = CommonLib;