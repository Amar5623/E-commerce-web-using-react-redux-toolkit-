//routes/orderRoutes.js
const express = require('express');
const { placeOrder, getUserOrders, getAllOrders, updateOrderStatus, placesingleOrder} = require('../controllers/orderController');
const { authMiddleware, adminMiddleware, shopperMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

// Place a new order (shopper)
router.post('/place-single', authMiddleware,shopperMiddleware, placesingleOrder);

//Place a order from cart
router.post('/place', authMiddleware,shopperMiddleware, placeOrder);

// Get orders of the current user (shopper)
router.get('/my-orders', authMiddleware,shopperMiddleware, getUserOrders);

// Get all orders (admin only)
router.get('/all', authMiddleware, adminMiddleware, getAllOrders);

// Update order status (admin only)
router.put('/status/:orderId', authMiddleware, adminMiddleware, updateOrderStatus);

module.exports = router;
