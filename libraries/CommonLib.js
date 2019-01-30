const SUCCESS_CODE = '000'; // 正常終了コード
const PARAMETER_INVALID_ERROR = '101'; // パラメータバリデーションエラーコード
const REGIST_FAILD_ERROR = '102'; // パラメータバリデーションエラーコード
const USER_NOT_EXIST_ERROR = '103'; // ユーザー取得失敗エラーコード
const USER_HOBBY_REGISTER_ERROR = '104'; // ユーザー趣味情報登録失敗エラーコード
const USER_HOBBY_DELETE_ERROR = '105'; // ユーザー趣味情報削除失敗エラーコード
const USER_HOBBY_ALREADY_REGISTER_ERROR = '106'; // ユーザー趣味情報重複エラーコード
const HOBBY_ALREADY_REGISTER_ERROR = '107'; // ユーザー趣味情報重複エラーコード
const DELETE_FAILD_ERROR = '108'; // ユーザー削除エラーコード
const TWEET_FAILD_ERROR = '109'; // ツイート失敗エラーコード
const SELECT_FAILD_ERROR = '110'; // データ取得エラーコード

const lib = {
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
    getError: function(res, error, body){
        if(error || (body.code !== '000' && body.code !== SELECT_FAILD_ERROR)){
            console.log(body);
            res.end('Internal Server Error');
            return true;
        } else {
            return false;
        }
    },
}

module.exports = lib;