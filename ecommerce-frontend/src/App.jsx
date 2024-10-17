//redux/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import AddProduct from './pages/AddProduct';
import EditProduct from './pages/EditProduct';
import SellerDashboard from './pages/sellerDashboard';
import UpdateProduct from './pages/UpdateProduct';
import AdminDashboard from './pages/AdminDashboard';
import OrderList from './pages/OrderList';
import Cart from './pages/Cart';

function App() {
  return (
    <div>
    {/* Your other components */}
    <ToastContainer
      position="top-right" 
      autoClose={2000} 
      hideProgressBar={false}
      newestOnTop={true}
      closeOnClick
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
      style={{ marginTop: '50px' }}
    />
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/seller-dashboard" element={<SellerDashboard />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/edit-product/:id" element={<EditProduct />} />
        <Route path="/update-product/:id" element={<UpdateProduct />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/my-orders" element={<OrderList />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
