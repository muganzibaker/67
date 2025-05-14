// src/slices/notificationsSlice.js
import { createSlice } from "@reduxjs/toolkit";

const notificationsSlice = createSlice({
  name: "notifications",
  initialState: { list: [], unreadCount: 0 },
  reducers: {
    setNotifications(state, action) {
      state.list = action.payload;
      state.unreadCount = action.payload.filter((n) => !n.read).length;
    },
    addNotification(state, action) {
      state.list.unshift(action.payload);
      if (!action.payload.read) state.unreadCount += 1;
    },
    markAsRead(state, action) {
      const id = action.payload;
      const notification = state.list.find((n) => n.id === id);
      if (notification && !notification.read) {
        notification.read = true;
        state.unreadCount -= 1;
      }
    },
    markAllAsRead(state) {
      state.list.forEach((n) => (n.read = true));
      state.unreadCount = 0;
    },
  },
});

export const { setNotifications, addNotification, markAsRead, markAllAsRead } = notificationsSlice.actions;
export default notificationsSlice.reducer;