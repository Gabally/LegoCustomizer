const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

const api = require('../controllers');
const middleware = require('../middleware');

//Api urls
router.post('/placeorder', 
    body('email').isEmail().isLength({ min: 1, max: 320 }),
    body('date').isDate(),
    body('notes').isLength({ min: 1, max: 1000 }),
    api.placeOrder);
router.post('/submitminifig',
    body('email').isEmail().isLength({ min: 1, max: 320 }),
    body('name').isLength({ min: 1, max: 40 }),
    body('phone').isLength({ min: 1, max: 20 }),
    body('notes').isLength({ min: 1, max: 1000 }),
    body('front').notEmpty(),
    body('back').notEmpty(),
    api.submitMinifig);

router.post('/setcredentials', 
    body('username').isLength({ min: 1, max: 40 }),
    body('password').isLength({ min: 8, max: 60 }),
    api.setCredentials);
router.post('/authenticate', 
    body('username').notEmpty(),
    body('password').notEmpty(),
    api.authenticate);
router.post('/notifyemails', 
    body('emails').isArray(),
    body("emails.*").isEmail(),
    middleware.isLoggedIn, api.setNotifyEmails);

router.put('/updatepassword', 
    body('password').notEmpty(),
    body('newpassword').isLength({ min: 8, max: 60 }),
    middleware.isLoggedIn, api.updatePassword);
router.put('/updateusername', 
    body('password').notEmpty(),
    body('username').isLength({ min: 1, max: 40 }),
    middleware.isLoggedIn, api.updateUsername);

router.get('/orders', middleware.isLoggedIn, api.orders);
router.get('/order', middleware.isLoggedIn, api.order);

router.get('/ordersminifig', middleware.isLoggedIn, api.ordersMinifig);
router.get('/orderminifig', middleware.isLoggedIn, api.orderMinifig);
router.get('/notifyemails', middleware.isLoggedIn, api.notifyEmails);

router.delete('/orderminifig', middleware.isLoggedIn, api.deleteOrderMinifig);
router.delete('/order', middleware.isLoggedIn, api.deleteOrder);

module.exports = router;
