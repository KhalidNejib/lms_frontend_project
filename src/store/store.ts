// store.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import studentReducer from './slices/studentSlice'; // ✅ Adjust path as needed
import instructorReducer from './slices/instructorSlice'; // ✅ Add instructor slice
import uiReducer from './slices/uiSlice';           // ✅ Add this if using uiSlice too
import dashboardReducer from './dashboardSlices';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    student: studentReducer, // ✅ Register your student slice here
    instructor: instructorReducer, // ✅ Register instructor slice
    ui: uiReducer,          // ✅ Add UI slice if you're using `useAppSelector(state => state.ui)`
    dashboard: dashboardReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
