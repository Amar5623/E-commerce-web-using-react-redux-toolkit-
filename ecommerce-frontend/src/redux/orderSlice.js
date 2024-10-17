// src/redux/orderSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

// Thunk to create a new order
export const createOrder = createAsyncThunk(
  'orders/createOrder',
  async (orderData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:5000/api/orders/place-single',
        orderData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error placing order:', error.response?.data || error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Fetch all orders
export const fetchOrders = createAsyncThunk('orders/fetchAll', async (_, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token'); 
    const response = await axios.get('http://localhost:5000/api/orders/all', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching orders:', error.response?.data || error.message);
    return rejectWithValue(error.response?.data || error.message);
  }
});

// Update order status
export const updateOrderStatus = createAsyncThunk(
  'orders/updateStatus',
  async ({ orderId, status }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `http://localhost:5000/api/orders/status/${orderId}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success('Order status updated successfully.');
      return response.data;
    } catch (error) {
      console.error('Error updating order status:', error.response?.data || error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Place order from cart
export const placeOrderFromCart = createAsyncThunk(
  'order/placeOrderFromCart',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/orders/place');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const orderSlice = createSlice({
    name: 'orders',
    initialState: {
        orders: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createOrder.pending, (state) => {
                state.loading = true;
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.orders.push(action.payload); 
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchOrders.pending, (state) => {
              state.loading = true;
              state.error = null;
            })
            .addCase(fetchOrders.fulfilled, (state, action) => {
              state.loading = false;
              state.orders = action.payload;
            })
            .addCase(fetchOrders.rejected, (state, action) => {
              state.loading = false;
              state.error = action.payload;
            })
            .addCase(updateOrderStatus.fulfilled, (state, action) => {
              const updatedOrder = action.payload;
              state.orders = state.orders.map((order) =>
                order._id === updatedOrder._id ? updatedOrder : order
              );
            })      
            .addCase(updateOrderStatus.rejected, (state, action) => {
              state.error = action.payload;
            })
            .addCase(placeOrderFromCart.fulfilled, (state, action) => {
              state.orders.push(action.payload.order);
            });
    },
});

export default orderSlice.reducer;
