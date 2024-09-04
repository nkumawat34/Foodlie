const express = require('express');
const router = express.Router();
const { createOrder ,fetchOrders} = require('../controllers/OrderController');

// Define route for creating a new order
router.post('/orders/:email', createOrder);
// Define route for fetching orders
router.get('/orders/:email', fetchOrders);
module.exports = router;
