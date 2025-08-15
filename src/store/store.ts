// store.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice'; // adjust the path if needed

export const store = configureStore({
  reducer: {
    auth: authReducer,
    // add other reducers here if you have more slices
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
