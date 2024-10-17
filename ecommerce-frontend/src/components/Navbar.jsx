// src/components/Navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <nav className="bg-gray-900 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo/Brand */}
        <Link
          to="/"
          className="text-white text-2xl font-bold tracking-wide hover:text-yellow-400 transition duration-300"
        >
          E-Commerce
        </Link>

        <div className="hidden md:flex items-center space-x-6">
          {/* Home Link */}
          <Link
            to="/"
            className="text-gray-300 hover:text-white hover:scale-105 transition transform duration-300"
          >
            Home
          </Link>

          {/* Products Link */}
          <Link
            to="/products"
            className="text-gray-300 hover:text-white hover:scale-105 transition transform duration-300"
          >
            Products
          </Link>

          {/* Shopper Links */}
          {user?.role === 'shopper' && (
            <>
              <Link
                to="/my-orders"
                className="text-gray-300 hover:text-white hover:scale-105 transition transform duration-300"
              >
                My Orders
              </Link>
              <Link
                to="/cart"
                className="text-gray-300 hover:text-white hover:scale-105 transition transform duration-300"
              >
                Cart
              </Link>
            </>
          )}

          {/* Seller Dashboard */}
          {user?.role === 'seller' && (
            <Link
              to="/seller-dashboard"
              className="text-gray-300 hover:text-white hover:scale-105 transition transform duration-300"
            >
              Seller Dashboard
            </Link>
          )}

          {/* Admin Dashboard */}
          {user?.role === 'admin' && (
            <Link
              to="/admin"
              className="text-gray-300 hover:text-white hover:scale-105 transition transform duration-300"
            >
              Admin Dashboard
            </Link>
          )}

          {/* Authentication Links and Logout */}
          {user ? (
            <button
              onClick={handleLogout}
              className="text-red-500 hover:text-red-400 hover:underline font-semibold transition duration-300"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="text-gray-300 hover:text-white hover:scale-105 transition transform duration-300"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-gray-300 hover:text-white hover:scale-105 transition transform duration-300"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button className="text-white focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
