// src/pages/ProductList.jsx
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../redux/productSlice';
import { createOrder } from '../redux/orderSlice';
import { addProductToCart } from '../redux/cartSlice';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const ProductList = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.products);
  const user = useSelector((state) => state.auth.user);

  const [alertMessage, setAlertMessage] = useState('');

  // Fetch products on component mount
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Handle "Buy Now"
  const handleBuyNow = (productId, quantity) => {
    if (!validateUserAndQuantity(quantity)) return;

    dispatch(createOrder({ productId, quantity }))
      .then((response) => {
        if (createOrder.fulfilled.match(response)) {
          toast.success('Order placed successfully!', { autoClose: 3000 });
        } else {
          setAlertMessage(response.payload?.message || 'Order failed.');
        }
      })
      .catch((error) => {
        console.error('Order error:', error);
        toast.error('Order could not be placed. Please try again.');
      });
  };

  // Handle "Add to Cart"
  const handleAddToCart = (productId, quantity) => {
    if (!validateUserAndQuantity(quantity)) return;

    dispatch(addProductToCart({ productId, quantity }))
      .then((response) => {
        if (addProductToCart.fulfilled.match(response)) {
          toast.success('Product added to cart!', { autoClose: 3000 });
        } else {
          setAlertMessage(response.payload?.message || 'Failed to add to cart.');
        }
      })
      .catch((error) => {
        console.error('Cart error:', error);
        toast.error('Could not add to cart. Please try again.');
      });
  };

  // Validate user and quantity
  const validateUserAndQuantity = (quantity) => {
    if (!user) {
      toast.error('Please log in to continue.', { autoClose: 3000 });
      return false;
    }

    if (user.role !== 'shopper') {
      toast.error('Only shoppers can perform this action.', { autoClose: 3000 });
      return false;
    }

    if (quantity <= 0) {
      toast.warn('Please enter a quantity greater than 0.', { autoClose: 3000 });
      return false;
    }

    return true;
  };

  if (loading) return <div className="text-center text-xl py-10">Loading products...</div>;

  return (
    <div className="container mx-auto mt-8 px-4">
      <h1 className="text-4xl font-extrabold mb-10 text-center text-gray-900 tracking-wide">
        Explore Our Products
      </h1>

      {/* Alert Message Section */}
      {alertMessage && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded shadow-md">
          <p>{alertMessage}</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transform hover:scale-105 transition-all"
          >
            <Link to={`/products/${product._id}`}>
              <img
                src={product.ImageUrl}
                alt={product.name}
                className="w-full h-56 object-cover transition-opacity duration-300 hover:opacity-90"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2 text-gray-800">
                  {product.name}
                </h2>
                <p className="text-green-600 font-bold">${product.price}</p>
              </div>
            </Link>

            <div className="p-4 m-2 border-t border-gray-200">
              <input
                type="number"
                min="1"
                defaultValue="1"
                className="w-full px-3 py-2 mb-3 border rounded focus:outline-none focus:ring-2 focus:ring-green-300"
                id={`quantity-${product._id}`}
              />
              <div className="flex space-x-2">
                <button
                  onClick={() =>
                    handleAddToCart(
                      product._id,
                      +document.getElementById(`quantity-${product._id}`).value
                    )
                  }
                  className="flex-1 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-all"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() =>
                    handleBuyNow(
                      product._id,
                      +document.getElementById(`quantity-${product._id}`).value
                    )
                  }
                  className="flex-1 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-all"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
