// src/redux/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

export const fetchUsers = createAsyncThunk('users/fetchAll', async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get('http://localhost:5000/api/users/all', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('user fetched successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error.response?.data || error.message);
    throw error;
  }
});

// DELETE USER
export const deleteUser = createAsyncThunk(
  'users/delete',
  async (userId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token'); 
      await axios.delete(`http://localhost:5000/api/users/delete/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('User deleted successfully:', userId);
      return userId;
    } catch (error) {
      console.error('Error deleting user:', error.response?.data || error.message);
      return rejectWithValue(error.response?.data || 'Failed to delete user');
    }
  }
);

// UPDATE USER ROLE
export const updateUserRole = createAsyncThunk(
  'users/updateRole',
  async ({ userId, role }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `http://localhost:5000/api/users/role/${userId}`,
        { role },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('User role updated successfully:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error updating user role:', error.response?.data || error.message);
      return rejectWithValue(error.response?.data || 'Failed to update user role');
    }
  }
);

// ADD USER
export const addUser = createAsyncThunk(
  'users/add',
  async (userData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:5000/api/users/add',
        userData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('User added successfully:', response.data);
      toast.success("New User Added Succesfully!")
      return response.data;
    } catch (error) {
      console.error('Error adding user:', error.response?.data || error.message);
      return rejectWithValue(error.response?.data || 'Failed to add user');
    }
  }
);


const userSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loading = false;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user._id !== action.payload);
      })
      .addCase(updateUserRole.fulfilled, (state, action) => {
        const index = state.users.findIndex((user) => user._id === action.payload._id);
        state.users[index] = action.payload;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
      });
  },
});

export default userSlice.reducer;
