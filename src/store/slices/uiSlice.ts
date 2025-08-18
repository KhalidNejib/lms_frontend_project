import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  sidebarCollapsed: boolean;
  profileModalVisible: boolean;
  searchQuery: string;
  notifications: {
    id: number;
    message: string;
    time: string;
    read: boolean;
  }[];
}

const initialState: UIState = {
  sidebarCollapsed: false,
  profileModalVisible: false,
  searchQuery: '',
  notifications: [
    { id: 1, message: 'New course available: Advanced React', time: '2 hours ago', read: false },
    { id: 2, message: 'Assignment due tomorrow', time: '4 hours ago', read: false },
    { id: 3, message: 'Course completion certificate ready', time: '1 day ago', read: true }
  ],
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarCollapsed = !state.sidebarCollapsed;
    },
    setSidebarCollapsed: (state, action: PayloadAction<boolean>) => {
      state.sidebarCollapsed = action.payload;
    },
    setProfileModalVisible: (state, action: PayloadAction<boolean>) => {
      state.profileModalVisible = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    addNotification: (state, action: PayloadAction<{ message: string; time: string }>) => {
      const newNotification = {
        id: Date.now(),
        message: action.payload.message,
        time: action.payload.time,
        read: false,
      };
      state.notifications.unshift(newNotification);
    },
    markNotificationAsRead: (state, action: PayloadAction<number>) => {
      const notification = state.notifications.find(n => n.id === action.payload);
      if (notification) {
        notification.read = true;
      }
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },
  },
});

export const {
  toggleSidebar,
  setSidebarCollapsed,
  setProfileModalVisible,
  setSearchQuery,
  addNotification,
  markNotificationAsRead,
  clearNotifications,
} = uiSlice.actions;

export default uiSlice.reducer; 