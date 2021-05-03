const express = require('express');
const router = express.Router();

const api = require('../controllers');
const middleware = require('../middleware');

//Api urls
router.post('/placeorder', api.placeOrder);
router.post('/submitminifig', api.submitMinifig);

router.post('/setcredentials', api.setCredentials);
router.post('/authenticate', api.authenticate);

router.put('/updatepassword', middleware.isLoggedIn, api.updatePassword);
router.put('/updateusername', middleware.isLoggedIn, api.updateUsername);

router.get('/orders', middleware.isLoggedIn, api.orders);
router.get('/order', middleware.isLoggedIn, api.order);

router.get('/ordersminifig', middleware.isLoggedIn, api.ordersMinifig);
router.get('/orderminifig', middleware.isLoggedIn, api.orderMinifig);

router.delete('/orderminifig', middleware.isLoggedIn, api.deleteOrderMinifig);
router.delete('/order', middleware.isLoggedIn, api.deleteOrder);

module.exports = router;
