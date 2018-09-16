const router = require('express').Router();
const Tokens = require("csrf");
const tokens = new Tokens();

router.get('/profile', function(req, res, next) {
    res.render('users/profile', {
        user: req.session.user
    });
});

module.exports = router;