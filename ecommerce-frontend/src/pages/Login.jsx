// src/pages/Login.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { user, token, loading, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (token && user) {
      const role = user.role;
      console.log('Navigating based on role:', role);
      if (role === 'admin') {
        navigate('/admin');
      } else if (role === 'shopper') {
        navigate('/products');
      } else if (role === "seller") {
        navigate("/seller-dashboard");
      } else {
        navigate('/');
      }
    }
  }, [token, user, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password })).unwrap().then((response) => {
      console.log('Login successful:', response);
    }).catch((err) => {
      console.error('Login failed:', err);
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-200 to-blue-400">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-md transform transition-all duration-500 hover:scale-105">
        <h1 className="text-5xl font-bold mb-6 text-center text-blue-600">
          Welcome Back! 🛒
        </h1>
        <p className="text-gray-600 mb-4 text-center">
          Let's get you logged in to explore amazing products!
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email:</label>
            <input
              type="email"
              className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Password:</label>
            <input
              type="password"
              className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
          <button className="bg-blue-600 text-white p-2 rounded w-full hover:bg-blue-500 transition duration-200" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
          <p className="mt-4 text-center">
            Don't have an account?{' '}
            <button
              onClick={() => navigate('/register')}
              className="text-blue-600 hover:underline"
            >
              Register
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
