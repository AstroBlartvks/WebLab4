import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth';

export const login = createAsyncThunk('auth/login', async ({ username, password }) => {
  const response = await axios.post(`${API_URL}/login`, { username, password });
  localStorage.setItem('token', response.data.token);
  localStorage.setItem('userId', response.data.userId);
  localStorage.setItem('username', response.data.username);
  return response.data;
});

export const register = createAsyncThunk('auth/register', async ({ username, password }) => {
  const response = await axios.post(`${API_URL}/register`, { username, password });
  localStorage.setItem('token', response.data.token);
  localStorage.setItem('userId', response.data.userId);
  localStorage.setItem('username', response.data.username);
  return response.data;
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: localStorage.getItem('username') ? {
      userId: localStorage.getItem('userId'),
      username: localStorage.getItem('username')
    } : null,
    token: localStorage.getItem('token'),
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      localStorage.removeItem('username');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = { userId: action.payload.userId, username: action.payload.username };
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = { userId: action.payload.userId, username: action.payload.username };
        state.token = action.payload.token;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
