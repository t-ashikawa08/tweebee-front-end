const passport = require('passport');
const config = require('config');

const TwitterStrategy = require('passport-twitter');

//twitter cooperation
passport.serializeUser((user, callback) => {
    callback(null, user);
});

passport.deserializeUser((obj, callback) => {
    callback(null, obj);
});

passport.use(new TwitterStrategy({
    consumerKey: config.TwitterConfig.ApiKey,
    consumerSecret: config.TwitterConfig.ApiSecretKey,
    callbackURL: config.CallBackUrl
}, (accessToken, refreshToken, profile, callback) => {
    process.nextTick(() => {
        return callback(null, profile);
    });
}));

module.exports = passport;