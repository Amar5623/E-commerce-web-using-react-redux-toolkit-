//src/pages/EditProduct.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [ImageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/api/products/${id}`);
        const product = response.data;
        setName(product.name);
        setPrice(product.price);
        setQuantity(product.quantity);
        setImageUrl(product.ImageUrl);
      } catch (error) {
        console.error('Error fetching product:', error.response.data.message);
      }
    };

    fetchProduct();
  }, [id]);

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `/api/products/${id}`,
        { name, price, quantity, ImageUrl },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      toast.success('Product updated successfully');
      navigate('/seller-dashboard');
    } catch (error) {
      console.error('Error updating product:', error.response.data.message);
    }
  };

  return (
    <div>
      <h2>Edit Product</h2>
      <form onSubmit={handleUpdateProduct}>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label>Price:</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <label>Quantity:</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
        />
        <label>Image URL:</label>
        <input
          type="text"
          value={ImageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          required
        />
        <button type="submit">Update Product</button>
      </form>
    </div>
  );
};

export default EditProduct;
