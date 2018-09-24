const router = require('express').Router();

const config = require('config');
const commonLib = require('../libraries/CommonLib');
const passport = require('../libraries/Passport');

//twitter cooperation routing
router.get('/', passport.authenticate('twitter'));

router.get('/callback', passport.authenticate('twitter', {failureRedirect: '/login' }), (req, res) => {
    let user = req.session.passport.user._json;

    req.session.user = {
        id: user.id,
        name: user.name,
        screen_name: user.screen_name,
        description: user.description,
        location: user.location,
        url: user.url,
        profile_image_url_https: user.profile_image_url_https.replace("normal.jpg", "400x400.jpg"),
        oauth_token: req.query.oauth_token,
        oauth_token_secret: req.query.oauth_verifier
    }

    console.log("user:");
    console.log(req.session.user);

    delete req.session.passport;

    commonLib.ajax(config.API + "/user/register", { user_id: user.id }, function(error, responce, body){
        if (commonLib.getError(res, error, responce )) return;
        res.redirect('/users/profile');
    }); 
});

module.exports = router;
