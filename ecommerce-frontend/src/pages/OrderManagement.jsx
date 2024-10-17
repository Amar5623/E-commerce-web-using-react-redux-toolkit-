// src/pages/OrderManagement.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders, updateOrderStatus } from '../redux/orderSlice';

const OrderManagement = () => {
  const dispatch = useDispatch();

  // Access Redux state for orders, loading, and error.
  const { orders, loading, error } = useSelector(
    (state) => state.orders || {}
  );

  const [updatingOrder, setUpdatingOrder] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState({}); // Store selected status per order

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  // Ensure ordersArray is always treated as an array
  const ordersArray = Array.isArray(orders) ? orders : Array.isArray(orders?.orders) ? orders.orders : [];

  // Store the selected status for each order in the state
  const handleSelectChange = (orderId, newStatus) => {
    setSelectedStatus((prev) => ({ ...prev, [orderId]: newStatus }));
  };

  // Update the order status when the Update button is clicked
  const handleStatusUpdate = async (orderId) => {
    const newStatus = selectedStatus[orderId];
    if (!newStatus) return;

    try {
      setUpdatingOrder(orderId);
      await dispatch(updateOrderStatus({ orderId, status: newStatus })).unwrap();
    } catch (error) {
    } finally {
      setUpdatingOrder(null);
      dispatch(fetchOrders());
    }
  };

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p>Error loading orders: {error}</p>;

  return (
    <div className="mt-4">
      <h2 className="text-2xl font-bold mb-4">Order Management</h2>

      {ordersArray.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul className="space-y-4">
          {ordersArray.map((order) => (
            <li
              key={order._id}
              className="flex justify-between items-center p-4 border border-gray-300 rounded shadow-sm"
            >
              <div>
                <p>
                  <strong>Order ID:</strong> {order._id}
                </p>
                <p>
                  <strong>User:</strong> {order.user ? order.user.username : 'Unknown User'}
                </p>
                <p>
                  <strong>Product:</strong> {order.product?.name || 'N/A'} |{' '}
                  <strong>Quantity:</strong> {order.quantity}
                </p>
                <p>
                  <strong>Total Amount:</strong> ₹{order.totalAmount}
                </p>
                <p>
                  <strong>Order Status:</strong> {order.status}
                </p>
                <p>
                  <strong>Order Date:</strong>{' '}
                  {new Date(order.orderDate).toLocaleString()}
                </p>
              </div>

              <div className="flex items-center space-x-3">
                <select
                  defaultValue={order.status}
                  onChange={(e) => handleSelectChange(order._id, e.target.value)}
                  className="border border-gray-300 rounded px-2 py-1"
                  disabled={updatingOrder === order._id}
                >
                  <option disabled>Status</option>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>

                <button
                  onClick={() => handleStatusUpdate(order._id)}
                  className={`px-4 py-2 rounded text-white ${
                    updatingOrder === order._id
                      ? 'bg-gray-500 cursor-not-allowed'
                      : 'bg-blue-500 hover:bg-blue-600'
                  }`}
                  disabled={updatingOrder === order._id}
                >
                  {updatingOrder === order._id ? 'Updating...' : 'Update'}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrderManagement;
