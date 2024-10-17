// src/pages/OrderList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const user = useSelector((state) => state.auth.user); // Get user from Redux store

  // Fetch orders, including both "Buy Now" and cart orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/orders/my-orders', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setOrders(response.data.orders);
      } catch (err) {
        setError(err.response?.data?.message || 'Error fetching orders');
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchOrders();
  }, [user]);

  if (loading) return <div className="text-center text-xl mt-12">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="container mx-auto mt-10 px-4">
      <h1 className="text-4xl font-extrabold text-center mb-8 text-gray-800 tracking-wider">
        My Orders
      </h1>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500">You have no orders yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white shadow-md p-6 rounded-lg hover:shadow-lg transition-shadow"
            >
              <h2 className="text-xl font-semibold mb-4 text-blue-600">
                Order ID: {order._id}
              </h2>
              {order.items.map((item) => (
                <div key={item._id} className="mb-6">
                  <h3 className="text-lg font-medium text-gray-700">
                    Product: {item.product.name}
                  </h3>
                  <img
                    src={item.product.ImageUrl}
                    alt={item.product.name}
                    className="w-full h-48 object-cover rounded-lg mt-2 mb-4"
                  />
                  <p className="text-gray-600">
                    <span className="font-medium">Price:</span> ${item.product.price}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Quantity:</span> {item.quantity}
                  </p>
                  <p className="text-gray-600 font-bold">
                    Subtotal: ${(item.product.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
              <div className="border-t border-gray-200 pt-4">
                <p className="text-gray-500">
                  <span className="font-medium">Status:</span> {order.status}
                </p>
                <p className="text-gray-500">
                  <span className="font-medium">Order Date:</span> {new Date(order.orderDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderList;
