import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import pointsReducer from '../features/points/pointsSlice';
import { authMiddleware } from '../features/auth/authMiddleware';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    points: pointsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authMiddleware),
});
