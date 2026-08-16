import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { NotificationItem } from '../../types';

interface NotificationState {
  items: NotificationItem[];
}

const initialState: NotificationState = { items: [] };

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setNotifications: (state, action: PayloadAction<NotificationItem[]>) => {
      state.items = action.payload;
    },
    markAllRead: (state) => {
      state.items = state.items.map((n) => ({ ...n, read: true }));
    },
    markRead: (state, action: PayloadAction<string>) => {
      const item = state.items.find((n) => n.id === action.payload);
      if (item) item.read = true;
    },
    pushNotification: (state, action: PayloadAction<NotificationItem>) => {
      state.items = [action.payload, ...state.items];
    },
  },
});

export const { setNotifications, markAllRead, markRead, pushNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
