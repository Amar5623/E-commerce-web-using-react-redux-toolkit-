//src/pages/ProductDetail.jsx
import React, { useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../redux/productSlice';

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, loading } = useSelector((state) => state.products);

  const cardRef = useRef();

  const product = products.find((prod) => prod._id === id);

  // Fetch products only if the product isn't already available
  useEffect(() => {
    if (!product) {
      dispatch(fetchProducts());
    }
  }, [dispatch, product]);

  const handleClickOutside = (event) => {
    if (cardRef.current && !cardRef.current.contains(event.target)) {
      navigate('/products'); 
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (loading) {
    return <p className="text-center text-lg mt-10">Loading...</p>;
  }

  if (!product) {
    return <p className="text-center text-lg mt-10">Product not found.</p>;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div
        ref={cardRef}
        className="max-w-md w-full bg-white rounded-lg shadow-lg overflow-hidden"
      >
        <img
          src={product.ImageUrl}
          alt={product.name}
          className="w-full h-64 object-cover"
        />
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-xl text-gray-500 mb-2">${product.price}</p>
          <button
            onClick={() => navigate('/products')} 
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg mt-4 w-full"
          >
            Back to Products
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
