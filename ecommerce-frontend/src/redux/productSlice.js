// src/redux/productSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunks for fetching all products
export const fetchProducts = createAsyncThunk('products/fetchAll', async (_, thunkAPI) => {
  try {
    const response = await axios.get('http://localhost:5000/api/products/');
    console.log('API Response:', response);
    
    const data = response.data;

    if (!Array.isArray(data)) {
      throw new Error('Response data is not an array');
    }

    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return thunkAPI.rejectWithValue(error.response ? error.response.data : 'Network error');
  }
});

// Thunk for fetching seller-specific products
export const fetchSellerProducts = createAsyncThunk('products/fetchSeller', async (_, thunkAPI) => {
  try {
    const response = await axios.get('http://localhost:5000/api/products/seller', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response ? error.response.data : 'Network error');
  }
});

// Thunk for deleting a product
export const handleDeleteProduct = createAsyncThunk('products/delete', async (productId, thunkAPI) => {
  try {
    await axios.delete(`http://localhost:5000/api/products/${productId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    
    return productId;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response ? error.response.data : 'Network error');
  }
});

// Update Product Thunk
export const updateProduct = createAsyncThunk(
  'products/update',
  async ({ productId, productData }, thunkAPI) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/products/${productId}`,
        productData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response ? error.response.data : 'Network error'
      );
    }
  }
);

// Fetch single product details by ID
export const fetchProductDetails = createAsyncThunk(
  'products/fetchById',
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/products/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response ? error.response.data : 'Network error'
      );
    }
  }
);

// Slice for product management
const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handling fetching all products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
        state.products = []; // Reset products on error
      })

      // Handling fetching seller-specific products
      .addCase(fetchSellerProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSellerProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = false;
      })
      .addCase(fetchSellerProducts.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
        state.products = []; // Reset products on error
      })

      // Handling product deletion
      .addCase(handleDeleteProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(handleDeleteProduct.fulfilled, (state, action) => {
        const productId = action.payload;
        state.products = state.products.filter((product) => product._id !== productId); // Remove the deleted product from the state
        state.loading = false;
      })
      .addCase(handleDeleteProduct.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.selectedProduct = action.payload; // Store the fetched product in state
    });
  },
});

export default productSlice.reducer;
