// src/pages/UserManagement.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, deleteUser, updateUserRole, addUser } from '../redux/userSlice';
import { toast } from 'react-toastify';

const UserManagement = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.users);

  const [newUser, setNewUser] = useState({ username: '', email: '', password: '', role: '' });
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false); 

  // Fetch users on component mount
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const openDeleteModal = (userId) => {
    setDeleteUserId(userId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setDeleteUserId(null);
  };

  const handleDelete = async () => {
    await dispatch(deleteUser(deleteUserId));
    toast.success('User deleted successfully!');
    closeModal();
    dispatch(fetchUsers());
  };

  const handleUpdateRole = async (userId, role) => {
    if (role !== 'Change Role') {
      await dispatch(updateUserRole({ userId, role }));
      toast.success(`Role updated to ${role} successfully!`);
      dispatch(fetchUsers());
    }
  };

  const handleAddUser = async () => {
    await dispatch(addUser(newUser));
    toast.success('User added successfully!');
    setNewUser({ username: '', email: '', password: '', role: '' });
    setShowAddUserForm(false);
    dispatch(fetchUsers());
  };

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>Error loading users: {error}</p>;

  return (
    <div className="mt-4">
      <h2 className="text-2xl font-bold mb-4">User Management</h2>

      <div className="flex justify-between mb-4">
        <button
          onClick={() => setShowAddUserForm(!showAddUserForm)}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          {showAddUserForm ? 'Cancel' : 'Add New User'}
        </button>
      </div>

      {showAddUserForm && (
        <div className="mt-4 border border-gray-300 p-4 rounded shadow-sm mb-4">
          <h3 className="font-bold mb-2">Add New User</h3>
          <div className="flex flex-col space-y-2">
            <input
              type="text"
              placeholder="Username"
              value={newUser.username}
              onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
              className="border border-gray-300 rounded p-2"
            />
            <input
              type="email"
              placeholder="Email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              className="border border-gray-300 rounded p-2"
            />
            <input
              type="password"
              placeholder="Password"
              value={newUser.password}
              onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
              className="border border-gray-300 rounded p-2"
            />
            <select
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
              className="border border-gray-300 rounded p-2"
            >
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="shopper">Shopper</option>
              <option value="seller">Seller</option>
            </select>
            <button onClick={handleAddUser} className="bg-blue-500 text-white px-4 py-2 rounded">
              Add User
            </button>
          </div>
        </div>
      )}

      <ul className="space-y-4">
        {users.map((user) => (
          <li
            key={user._id}
            className="flex justify-between items-center p-4 border border-gray-300 rounded shadow-sm"
          >
            <div>
              <p>
                <strong>Username:</strong> {user.username}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Current Role:</strong> {user.role}
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <select
                defaultValue="Change Role"
                onChange={(e) => handleUpdateRole(user._id, e.target.value)}
                className="border border-gray-300 rounded p-1"
              >
                <option disabled>Change Role</option>
                <option value="admin">Admin</option>
                <option value="shopper">Shopper</option>
                <option value="seller">Seller</option>
              </select>
              <button
                onClick={() => openDeleteModal(user._id)}
                className="bg-red-600 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Delete Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded shadow-lg text-center">
            <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
            <p>Are you sure you want to delete this user?</p>
            <div className="mt-6 space-x-4">
              <button
                onClick={handleDelete}
                className="bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded"
              >
                Yes, Delete
              </button>
              <button
                onClick={closeModal}
                className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-6 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
