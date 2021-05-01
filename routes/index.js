const express = require('express');
const router = express.Router();

const api = require('../controllers');

router.post('/placeorder', api.placeOrder);
router.post('/submitminifig', api.submitMinifig);

router.get('/orders', api.orders);
router.get('/order', api.order);

router.get('/ordersminifig', api.ordersMinifig);
router.get('/orderminifig', api.orderMinifig);

router.delete('/orderminifig', api.deleteOrderMinifig);
router.delete('/order', api.deleteOrder);

module.exports = router;