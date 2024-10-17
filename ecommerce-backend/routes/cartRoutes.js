//routes/cartRoutes.js
const express = require("express");
const router = express.Router();
const {addProductToCart, getCart ,removeProductFromCart, clearCart} = require("../controllers/cartController");
const { authMiddleware, shopperMiddleware } = require("../middleware/authMiddleware");

// Add product to cart
router.post("/add", authMiddleware, shopperMiddleware, addProductToCart);

// Get cart for the logged-in user
router.get("/", authMiddleware, shopperMiddleware, getCart);

// Remove product from cart
router.delete("/remove/:productId", authMiddleware, shopperMiddleware, removeProductFromCart);

// Clear the cart
router.delete("/clear", authMiddleware, shopperMiddleware, clearCart);

module.exports = router;
