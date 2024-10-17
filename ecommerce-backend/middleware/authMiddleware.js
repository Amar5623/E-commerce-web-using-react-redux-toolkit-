//middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

// Authentication middleware
const authMiddleware = (req, res, next) => {
  try {
    const token = req.header('Authorization')?.split(' ')[1]; // Extract Bearer token
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized. No token provided.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
    req.user = decoded; 

    if (!req.user.id) {
      return res.status(401).json({ message: 'Invalid token. User ID missing.' });
    }

    next();
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(401).json({ message: 'Unauthorized. Invalid token.' });
  }
};


// Middleware to check if user is an admin
const adminMiddleware = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).send({ error: 'Forbidden: Admins only' });
  }
  next();
};

// Middleware to check if user is a seller
const sellerMiddleware = (req, res, next) => {
  if (req.user.role !== 'seller') {
    return res.status(403).send({ error: 'Forbidden: Sellers only' });
  }
  next();
};

// Middleware to check if user is a shopper
const shopperMiddleware = (req, res, next) => {
  if (req.user.role !== 'shopper') {
    return res.status(403).send({ error: 'Forbidden: Shoppers only' });
  }
  next();
};

module.exports = { authMiddleware, adminMiddleware, sellerMiddleware, shopperMiddleware };