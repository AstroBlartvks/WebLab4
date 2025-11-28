import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/points';

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return { Authorization: `Bearer ${token}` };
};

export const checkPoint = createAsyncThunk('points/checkPoint', async ({ x, y, r }) => {
  const response = await axios.post(`${API_URL}/check`, { x, y, r }, { headers: getAuthHeader() });
  return response.data;
});

export const fetchHistory = createAsyncThunk('points/fetchHistory', async () => {
  const response = await axios.get(`${API_URL}/history`, { headers: getAuthHeader() });
  return response.data;
});

export const clearHistory = createAsyncThunk('points/clearHistory', async () => {
  await axios.delete(`${API_URL}/history`, { headers: getAuthHeader() });
});

const pointsSlice = createSlice({
  name: 'points',
  initialState: {
    points: [],
    loading: false,
    error: null,
    currentR: 5,
  },
  reducers: {
    setR: (state, action) => {
      state.currentR = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkPoint.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkPoint.fulfilled, (state, action) => {
        state.loading = false;
        state.points.unshift(action.payload);
      })
      .addCase(checkPoint.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchHistory.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.points = action.payload;
      })
      .addCase(fetchHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(clearHistory.fulfilled, (state) => {
        state.points = [];
      });
  },
});

export const { setR } = pointsSlice.actions;
export default pointsSlice.reducer;
