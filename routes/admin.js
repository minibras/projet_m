var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    if ((req.session.passport) && (req.session.passport.user != null)) {
        res.render('admin', {
            auth: true,
            title: 'Zone perso'
        });
    } else res.redirect('/');
});

module.exports = router;
