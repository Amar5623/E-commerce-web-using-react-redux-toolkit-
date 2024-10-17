//src/pages/AdminDashboard.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, addUser } from '../redux/userSlice';
import { fetchOrders, updateOrderStatus } from '../redux/orderSlice';
import UserManagement from './UserManagement';
import OrderManagement from './OrderManagement';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (activeTab === 'users') {
      dispatch(fetchUsers());
    } else if (activeTab === 'orders') {
      dispatch(fetchOrders());
    }
  }, [activeTab, dispatch]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="flex space-x-4 mb-4">
        <button
          onClick={() => setActiveTab('users')}
          className={`py-2 px-4 ${activeTab === 'users' ? 'bg-blue-500 text-white' : 'bg-gray-200'} rounded`}
        >
          Manage Users
        </button>
        <button
          onClick={() => setActiveTab('orders')}
          className={`py-2 px-4 ${activeTab === 'orders' ? 'bg-blue-500 text-white' : 'bg-gray-200'} rounded`}
        >
          Manage Orders
        </button>
      </div>
      {activeTab === 'users' ? <UserManagement /> : null}
      {activeTab === 'orders' ? <OrderManagement /> : null}
    </div>
  );
};

export default AdminDashboard;
