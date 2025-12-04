import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/points';

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return { Authorization: `Bearer ${token}` };
};

export const checkPoint = createAsyncThunk('points/checkPoint', async ({ x, y, r }, { dispatch, getState }) => {
  const response = await axios.post(`${API_URL}/check`, { x, y, r }, { headers: getAuthHeader() });
  const { pageSize } = getState().points;
  dispatch(fetchHistory({ page: 0, size: pageSize }));
  return response.data;
});

export const fetchHistory = createAsyncThunk('points/fetchHistory', async ({ page = 0, size = 10 } = {}) => {
  const response = await axios.get(`${API_URL}/history?page=${page}&size=${size}`, { headers: getAuthHeader() });
  return response.data;
});

export const clearHistory = createAsyncThunk('points/clearHistory', async (_, { dispatch, getState }) => {
  await axios.delete(`${API_URL}/history`, { headers: getAuthHeader() });
  const { pageSize } = getState().points;
  dispatch(fetchHistory({ page: 0, size: pageSize }));
});

const pointsSlice = createSlice({
  name: 'points',
  initialState: {
    points: [],
    loading: false,
    error: null,
    currentR: 5,
    currentPage: 0,
    pageSize: 10,
    totalElements: 0,
    totalPages: 0,
  },
  reducers: {
    setR: (state, action) => {
      state.currentR = action.payload;
    },
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setPageSize: (state, action) => {
      state.pageSize = action.payload;
      state.currentPage = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkPoint.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkPoint.fulfilled, (state, action) => {
        state.loading = false;
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
        state.points = action.payload.content;
        state.currentPage = action.payload.page;
        state.pageSize = action.payload.size;
        state.totalElements = action.payload.totalElements;
        state.totalPages = action.payload.totalPages;
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

export const { setR, setPage, setPageSize } = pointsSlice.actions;
export default pointsSlice.reducer;
