import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Helper function to get auth token headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    console.warn('No token found! User may not be logged in.');
    return {};
  }
  return {
    headers: { Authorization: `Bearer ${token}` },
  };
};

// Add product to cart
export const addProductToCart = createAsyncThunk(
  'cart/addProductToCart',
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/cart/add',
        { productId, quantity },
        getAuthHeaders()
      );
      return response.data;
    } catch (error) {
      console.error('Error adding product to cart:', error.response?.data || error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Fetch cart
export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:5000/api/cart', getAuthHeaders());
      return response.data;
    } catch (error) {
      console.error('Error fetching cart:', error.response?.data || error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Remove product from cart
export const removeProductFromCart = createAsyncThunk(
  'cart/removeProductFromCart',
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/cart/remove/${productId}`,
        getAuthHeaders()
      );
      return response.data;
    } catch (error) {
      console.error('Error removing product from cart:', error.response?.data || error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Clear cart
export const clearCart = createAsyncThunk(
  'cart/clearCart',
  async (_, { rejectWithValue }) => {
    try {
      const headers = getAuthHeaders();
      if (!headers.headers.Authorization) {
        throw new Error('Authorization token is missing.');
      }

      const response = await axios.delete(
        'http://localhost:5000/api/cart/clear',
        headers
      );
      return response.data;
    } catch (error) {
      // Enhanced error logging
      console.error(
        'Error clearing cart:',
        error.response?.data || error.message
      );

      // Check for 401 errors explicitly
      if (error.response?.status === 401) {
        console.warn('Unauthorized request: Please check the token.');
        return rejectWithValue('Unauthorized: Please log in again.');
      }

      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Cart Slice
const cartSlice = createSlice({
  name: 'cart',
  initialState: { cart: { items: [] }, status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.cart = action.payload;
      })
      .addCase(addProductToCart.fulfilled, (state, action) => {
        state.cart.items.push(action.payload);
      })
      .addCase(removeProductFromCart.fulfilled, (state, action) => {
        state.cart = action.payload;
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.cart = { items: [] };
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.error = action.payload; // Store the error message in state
      });
  },
});

export default cartSlice.reducer;
