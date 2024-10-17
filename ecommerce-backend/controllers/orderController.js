//controller/orderControllers.js
const mongoose = require('mongoose');
const Order = require('../models/Order');
const Product = require('../models/Product');
const Cart = require("../models/Cart");

// Place a new order
const placesingleOrder = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { productId, quantity } = req.body;
    const product = await Product.findById(productId).session(session);

    if (!product || product.quantity < quantity) {
      throw new Error('Insufficient product quantity');
    }

    const totalAmount = product.price * quantity;

    const order = new Order({
      user: req.user.id,
      product: productId,
      ImageUrl: product.ImageUrl,
      quantity,
      totalAmount,
    });

    await order.save({ session });

    product.quantity -= quantity;
    await product.save({ session });

    await session.commitTransaction();
    res.status(201).json({ message: 'Order placed successfully', order });
  } catch (error) {
    await session.abortTransaction();
    res.status(500).json({ message: 'Order failed', error: error.message });
  } finally {
    session.endSession();
  }
};


// Fetch all orders for the logged-in user (shopper)
const getUserOrders = async (req, res) => {
  try {
    // Fetch orders associated with the logged-in user
    const orders = await Order.find({ user: req.user.id })
      .populate({
        path: 'items.product', 
        select: 'name ImageUrl price',
      })
      .exec(); 

    // Iterate over the orders to handle 'Buy Now' orders separately
    const enrichedOrders = orders.map((order) => {
      if (!order.items.length && order.product) {
        // Handle 'place-single' orders where product info is outside 'items'
        order.items = [
          {
            product: {
              _id: order.product._id,
              name: order.product.name,
              ImageUrl: order.ImageUrl,
              price: order.totalAmount / order.quantity,
            },
            quantity: order.quantity || 1,
          },
        ];
      }
      return order;
    });

    
    if (enrichedOrders.length === 0) {
      return res.status(404).json({ message: 'No orders found for this user.' });
    }

    // Return the enriched orders with necessary details
    res.status(200).json({ orders: enrichedOrders });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error: error.message });
  }
};



// Fetch all orders()
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('user', 'username').populate('product', 'name');
    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching all orders', error: error.message });
  }
};

// Update order status (only admin)
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.orderId);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.status = status;
    const updatedOrder = await order.save();

    res.status(200).json({ message: 'Order status updated', order: updatedOrder });
  } catch (error) {
    res.status(500).json({ message: 'Error updating order', error: error.message });
  }
};

// Place an order from the cart
const placeOrder = async (req, res) => {
  try {
    const userId = req.user.id;

    const cart = await Cart.findOne({ user: userId }).populate("items.product");
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty." });
    }
    
    const totalAmount = cart.items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );

    const order = new Order({
      user: userId,
      items: cart.items,
      totalAmount,
      status: "pending",
    });

    await order.save();

    res.status(201).json({ message: "Order placed successfully.", order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  placeOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus,
  placesingleOrder,
};
