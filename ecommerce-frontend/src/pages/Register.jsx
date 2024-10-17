// src/pages/Register.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Register = () => {
  const [username, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('shopper');
  
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting registration...");

    dispatch(register({ username, email, password, role }))
      .unwrap()
      .then(() => {
        toast.success('Registration Successful');
        navigate('/login');
      })
      .catch((err) => {
        console.error('Registration error:', err);
        toast.error('Registration Failed: ' + err);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-300 via-pink-300 to-blue-300">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-md transform transition-all duration-500 hover:scale-105">
        <h1 className="text-5xl font-bold mb-6 text-center text-purple-600">
          Join Us 🎉
        </h1>
        <p className="text-gray-600 mb-4 text-center">
          Create an account and start your shopping adventure!
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Username:</label>
            <input
              type="text"
              className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200"
              value={username}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email:</label>
            <input
              type="email"
              className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Password:</label>
            <input
              type="password"
              className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Role:</label>
            <select
              className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="shopper">Shopper</option>
              <option value="seller">Seller</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
          <button
            className="bg-purple-600 text-white p-2 rounded w-full hover:bg-purple-500 transition duration-200"
            disabled={loading}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
          <p className="mt-4 text-center">
            Already have an account?{' '}
            <button
              onClick={() => navigate('/login')}
              className="text-purple-600 hover:underline"
            >
              Login
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
