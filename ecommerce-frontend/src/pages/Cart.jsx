import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeProductFromCart, clearCart, fetchCart } from '../redux/cartSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items = [] } = useSelector((state) => state.cart.cart || {}); 

  useEffect(() => {
    const loadCart = async () => {
      await dispatch(fetchCart());
    };
    loadCart();
  }, [dispatch]);

  console.log('Cart Items:', items);

  const handleRemove = async (productId) => {
    console.log(`Removing product: ${productId}`);
    await dispatch(removeProductFromCart(productId));
    toast.info('Product removed from cart.', { autoClose: 3000 });
  };

  const handlePlaceOrder = async () => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/orders/place',
        { items },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      toast.success('Order placed successfully!', { autoClose: 3000 });
      dispatch(clearCart());
      navigate('/my-orders');
    } catch (error) {
      console.error('Failed to place order:', error);
      toast.error(
        error.response?.data?.message || 'Failed to place order. Please try again.',
        { autoClose: 3000 }
      );
    }
  };

  if (items.length === 0) {
    return <h2 className="text-center mt-10">Your cart is empty.</h2>;
  }

  return (
    <div className="container mx-auto mt-8 p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Cart</h1>
      {items.map((item) => {
        const { product } = item || {}; 
        if (!product) return null;

        return (
          <div
            key={item._id}
            className="flex justify-between items-center border-b py-4"
          >
            <div>
              <h2 className="text-xl">{product.name || 'Unnamed Product'}</h2>
              <p>Quantity: {item.quantity}</p>
              <p>Price: ${product.price || 0}</p>
              <p className="font-bold">
                Subtotal: ${item.quantity * (product.price || 0)}
              </p>
            </div>
            <button
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
              onClick={() => handleRemove(product._id)}
            >
              Remove
            </button>
          </div>
        );
      })}
      <div className="mt-6 text-right">
        <h2 className="text-xl font-bold">
          Total: $
          {items.reduce(
            (acc, item) => acc + item.quantity * (item.product?.price || 0),
            0
          )}
        </h2>
        <button
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 mt-4 rounded"
          onClick={handlePlaceOrder}
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Cart;
