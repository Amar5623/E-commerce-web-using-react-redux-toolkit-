//src/pages/AddProduct.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import { toast } from 'react-toastify';

const AddProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [ImageUrl, setImageUrl] = useState('');
  const navigate = useNavigate();

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        'http://localhost:5000/api/products',
        { name, price, quantity, ImageUrl },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      toast.success('Product added successfully');
      navigate('/seller-dashboard');
    } catch (error) {
      console.error(
        'Error adding product:',
        error.response?.data?.message || error.message
      );
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 relative">
      {/* Back Button */}
      <button
        onClick={() => navigate('/seller-dashboard')}
        className="absolute top-4 left-4 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded"
      >
        Back
      </button>

      {/* Form for Adding Product */}
      <form
        onSubmit={handleAddProduct}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Add Product</h2>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Price:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Quantity:</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-bold mb-2">Image URL:</label>
          <input
            type="text"
            value={ImageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
