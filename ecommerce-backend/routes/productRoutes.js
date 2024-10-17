// routes/productRoutes.js
const express = require('express');
const { createProduct, getProducts, updateProduct, deleteProduct, getSellerProducts, getProductbyid } = require('../controllers/productController');
const {authMiddleware, sellerMiddleware} = require('../middleware/authMiddleware');

const router = express.Router();

//seller routes
router.post('/', authMiddleware, sellerMiddleware, createProduct);
router.put('/:id', authMiddleware,sellerMiddleware, updateProduct); 
router.delete('/:id', authMiddleware,sellerMiddleware, deleteProduct);
router.get('/seller', authMiddleware,sellerMiddleware, getSellerProducts);

//other routes
router.get('/:id', authMiddleware, getProductbyid);
router.get('/', getProducts);

module.exports = router;
