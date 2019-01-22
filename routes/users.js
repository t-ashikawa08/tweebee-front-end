const router = require('express').Router();

router.get('/profile', function(req, res, next) {
    res.render('users/profile', {
        user: req.session.user
    });
});

router.get('/profile_edit', function(req, res){
    res.render('users/profile_edit');
});

module.exports = router;