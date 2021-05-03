const express = require('express');
const path = require('path');

const router = express.Router();

const api = require('../controllers');
const middleware = require('../middleware');

//page urls
router.get('/login', api.loginViewController);

router.get('/admin', middleware.isLoggedIn, (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'admin.html'));
});

router.get('/passwordoptions', middleware.isLoggedIn, (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'changepassword.html'));
});

module.exports = router;