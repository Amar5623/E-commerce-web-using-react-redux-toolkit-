//src/redux/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';



// Thunks
export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', { email, password });
      console.log('Backend Response:', response.data); 
      return response.data; 
    } catch (error) {
      console.error('Login Error:', error.response?.data);
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async ({ username, email, password, role }, { rejectWithValue }) => {
    try {
      console.log("Sending registration request...");
      const response = await axios.post('http://localhost:5000/api/users/register', {
        username,
        email,
        password,
        role
      });
      console.log("Registration response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Registration request failed:", error.response?.data);
      return rejectWithValue(error.response?.data.message || "Registration failed");
    }
  }
);

// Slice
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    error: null,
    loading: false,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
      builder
      .addCase(login.pending, (state) => {
        state.loading = false;
        state.error = null;  
        console.log('Login Pending...');
      })
      .addCase(login.fulfilled, (state, action) => {
        console.log('Login Fulfilled:', action.payload);
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.loading = false;
        localStorage.setItem('token', action.payload.token);  
      })
      .addCase(login.rejected, (state, action) => {
        console.error('Login Rejected:', action.payload);
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(register.pending, (state) => {
        console.log('Registration pending...');
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        localStorage.setItem('token', action.payload.token);
      })      
      .addCase(register.rejected, (state, action) => {
        console.error('Registration failed:', action.payload);
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
