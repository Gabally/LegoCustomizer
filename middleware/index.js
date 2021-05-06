const { body, validationResult } = require('express-validator');

module.exports = {
    isLoggedIn(req, res, next)
    {
        req.session.authorized ? next() : res.redirect('/login');
    }
}