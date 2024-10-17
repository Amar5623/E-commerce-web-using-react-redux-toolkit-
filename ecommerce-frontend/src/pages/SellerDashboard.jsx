// SellerDashboard.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSellerProducts, handleDeleteProduct } from '../redux/productSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const SellerDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, loading, error } = useSelector((state) => state.products);
  const [deleteProductId, setDeleteProductId] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false); 

  useEffect(() => {
    dispatch(fetchSellerProducts());
  }, [dispatch]);

  const handleAddProduct = () => {
    navigate('/add-product');
  };

  const handleUpdateProduct = (productId) => {
    navigate(`/update-product/${productId}`);
  };

  const openDeleteModal = (productId) => {
    setDeleteProductId(productId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setDeleteProductId(null);
  };

  const handleDelete = () => {
    dispatch(handleDeleteProduct(deleteProductId))
      .then(() => {
        closeModal();
        toast.success('Product deleted successfully');
      })
      .catch((error) => toast.error('Failed to delete product:', error));
  };

  if (loading) return <p className="text-center">Loading products...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Seller Dashboard</h1>
      <button
        onClick={handleAddProduct}
        className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded mb-4"
      >
        Add Product
      </button>

      <div className="grid grid-cols-4 gap-2 mt-4">
        {products.map((product) => (
          <div key={product._id} className="bg-white shadow-md p-4 rounded w-72 h-auto text-center">
            <img src={product.ImageUrl} alt={product.name} className="w-full h-32 object-cover mb-2" />
            <h2 className="text-lg font-bold">{product.name}</h2>
            <p>Price: ${product.price}</p>
            <p>Quantity: {product.quantity}</p>
            <div className="mt-4">
              <button
                onClick={() => handleUpdateProduct(product._id)}
                className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded mr-2"
              >
                Update
              </button>
              <button
                onClick={() => openDeleteModal(product._id)}
                className="bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Delete Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded shadow-lg text-center">
            <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
            <p>Are you sure you want to delete this product?</p>
            <div className="mt-6 space-x-4">
            
              <button
                onClick={closeModal}
                className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-6 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerDashboard;
