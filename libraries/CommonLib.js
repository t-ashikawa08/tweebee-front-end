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
            form: json
        };
    
        request(options, callback);
    }    
}

module.exports = CommonLib;