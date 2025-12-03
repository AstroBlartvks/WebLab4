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

export const fetchHistory = createAsyncThunk('points/fetchHistory', async ({ offset = 0, limit = 100 } = {}) => {
  const response = await axios.get(`${API_URL}/history?offset=${offset}&limit=${limit}`, { headers: getAuthHeader() });
  return response.data;
});

export const clearHistory = createAsyncThunk('points/clearHistory', async (_, { dispatch }) => {
  await axios.delete(`${API_URL}/history`, { headers: getAuthHeader() });
  dispatch(fetchHistory());
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
      .addCase(clearHistory.pending, (state) => {
        state.loading = true;
      })
      .addCase(clearHistory.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(clearHistory.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setR } = pointsSlice.actions;
export default pointsSlice.reducer;
