// controllers/productController.js
const Product = require('../models/Product');

// Create a new product
const createProduct = async (req, res) => {
  try {
    const { name, ImageUrl, price, quantity } = req.body;
    
    if (!name || !ImageUrl || !price || !quantity) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Create new product
    const product = await Product.create({
      name,
      ImageUrl,
      price,
      quantity,
      seller: req.user.id, 
    });

    res.status(201).json(product);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update an existing product (Only seller can update their own products)
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (product.seller.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { name, ImageUrl, price, quantity } = req.body;
    product.name = name || product.name;
    product.ImageUrl = ImageUrl || product.ImageUrl;
    product.price = price || product.price;
    product.quantity = quantity || product.quantity;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete an existing product (Only seller can delete their own products)
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    if (product.seller.toString() !== req.user.id) return res.status(401).json({ message: 'Unauthorized' });

    await product.deleteOne();
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get products specific to the logged-in seller
const getSellerProducts = async (req, res) => {
  try {
    const products = await Product.find({ seller: req.user.id });
    res.json(products);
  } catch (error) {
    console.error('Error fetching seller products:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get products by product id
const getProductbyid = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('seller', 'username');
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Error fetching product details', error: error.message });
  }
};


// Get all products
const getProducts = async (req, res) => {
  const products = await Product.find().populate('seller', 'username');
  res.json(products);
};

module.exports = {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  getSellerProducts,
  getProductbyid,
};
