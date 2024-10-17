//controllers/cartControllers.js
const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");
const Cart = require("../models/Cart");
const Product = require("../models/Product");

// Add product to cart
const addProductToCart = async (req, res) => {
    try {
      const { productId, quantity } = req.body;
      const userId = req.user.id; // Get authenticated user's ID from token
  
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: "Invalid user ID." });
      }
      if (!mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(400).json({ message: "Invalid product ID." });
      }
  
      let cart = await Cart.findOne({ user: userId });
  
      // If the cart doesn't exist, create a new one
      if (!cart) {
        cart = new Cart({ user: userId, items: [] });
      }
  
      const existingItem = cart.items.find(item => item.product.toString() === productId);
      if (existingItem) {
        existingItem.quantity += quantity; // Update existing item quantity
      } else {
        cart.items.push({ product: productId, quantity }); // Add new item
      }
  
      await cart.save(); // Save cart
      res.status(201).json(cart);
    } catch (error) {
      console.error('Error adding product to cart:', error);
      res.status(500).json({ message: error.message });
    }
  };
  

// Get cart for the logged-in shopper
const getCart = async (req, res) => {
  try {
    const userId = req.user.id; // Shopper's ID from token

    const cart = await Cart.findOne({ user: userId }).populate("items.product");
    if (!cart) return res.status(404).json({ message: "Cart not found." });

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const removeProductFromCart = async (req, res) => {
    try {
      const userId = req.user.id; 
      const { productId } = req.params;
  
      // Validate the product ID
      if (!mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(400).json({ message: "Invalid product ID." });
      }
  
      // Find the user's cart
      const cart = await Cart.findOne({ user: userId });
      if (!cart) return res.status(404).json({ message: "Cart not found." });
  
      // Remove the item with the given product ID
      const initialItemCount = cart.items.length;
      cart.items = cart.items.filter(item => item.product._id.toString() !== productId); 
  
      // If no items were removed, return an error
      if (cart.items.length === initialItemCount) {
        return res.status(404).json({ message: "Product not found in cart." });
      }
  
      await cart.save(); // Save the updated cart
  
      // Fetch product details for the remaining items in the cart
      const productIds = cart.items.map(item => item.product._id);
      const products = await Product.find({ _id: { $in: productIds } });
  
      // Map the product details back to the cart items
      const updatedItems = cart.items.map(item => {
        const product = products.find(p => p._id.toString() === item.product._id.toString());
  
        return {
          _id: item._id,
          quantity: item.quantity,
          product: {
            _id: product._id,
            name: product.name,
            ImageUrl: product.ImageUrl,
            price: product.price,
            // Add the calculated subtotal for each item
            subtotal: item.quantity * product.price,
          },
        };
      });
  
      // Prepare the updated cart response
      const updatedCart = {
        _id: cart._id,
        items: updatedItems,
        __v: cart.__v,
      };
  
      res.status(200).json(updatedCart);
    } catch (error) {
      console.error('Error removing product from cart:', error); // Log the error for debugging
      res.status(500).json({ message: error.message });
    }
  };
  
  

// Clear the cart
const clearCart = async (req, res) => {
    try {
      const userId = req.user.id; 
  
      if (!userId) {
        return res.status(401).json({ message: 'Unauthorized. User ID not found.' });
      }
  
      // Find and delete the cart associated with the user
      const cart = await Cart.findOneAndDelete({ user: userId });
  
      if (!cart) {
        return res.status(404).json({ message: 'Cart not found.' });
      }
  
      res.status(200).json({ message: 'Cart cleared successfully.' });
    } catch (error) {
      console.error('Error in clearCart:', error);
      res.status(500).json({ message: error.message });
    }
  };
  
  
  

module.exports = {
    addProductToCart,
    getCart,
    removeProductFromCart,
    clearCart,
}