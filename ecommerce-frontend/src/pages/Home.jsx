// src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [error, setError] = useState('');

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        const products = response.data;

        // Pick the first 3 products to feature
        setFeaturedProducts(products.slice(0, 3));
      } catch (err) {
        setError('Failed to load products.');
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto mt-8 px-6">
      {/* Hero Section */}
      <div className="relative bg-gray-800 rounded-lg shadow-lg overflow-hidden group">
        <div className="overflow-hidden">
          <img
            src="https://images.pexels.com/photos/6214370/pexels-photo-6214370.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Shop Now"
            className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>

        {/* Hero Text Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center space-y-4 text-white bg-black bg-opacity-30 transition-opacity duration-500 group-hover:bg-opacity-50">
          {/* Always Visible Heading */}
          <h1 className="text-5xl font-bold drop-shadow-lg">
            Discover Amazing Products
          </h1>

          {/* Fade-in Subheading on Hover */}
          <p className="text-lg font-light opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-150">
            Shop the latest trends and enjoy unbeatable deals every day!
          </p>

          <Link
            to="/products"
            className="px-6 py-3 bg-yellow-400 text-gray-900 rounded-full shadow-md font-semibold hover:bg-yellow-300 transition duration-300"
          >
            Browse Products
          </Link>
        </div>
      </div>

      {/* Featured Products Section */}
      <div className="mt-16">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Featured Products</h2>
        {error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <div
                key={product._id}
                className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
              >
                <img
                  src={product.ImageUrl}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-2xl font-semibold mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-4">Price: ${product.price}</p>
                  <Link
                    to={`/products/${product._id}`}
                    className="text-blue-500 hover:text-blue-400 font-medium"
                  >
                    View Details &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="mt-16 text-center text-gray-500">
        <p>&copy; {new Date().getFullYear()} E-Commerce Store. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
