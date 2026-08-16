import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface UiState {
  sidebarOpen: boolean;
  sidebarCollapsed: boolean;
  searchOpen: boolean;
  commandPaletteOpen: boolean;
}

const initialState: UiState = {
  sidebarOpen: false,
  sidebarCollapsed: false,
  searchOpen: false,
  commandPaletteOpen: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload;
    },
    toggleSidebarCollapsed: (state) => {
      state.sidebarCollapsed = !state.sidebarCollapsed;
    },
    setSearchOpen: (state, action: PayloadAction<boolean>) => {
      state.searchOpen = action.payload;
    },
    setCommandPaletteOpen: (state, action: PayloadAction<boolean>) => {
      state.commandPaletteOpen = action.payload;
    },
  },
});

export const { toggleSidebar, setSidebarOpen, toggleSidebarCollapsed, setSearchOpen, setCommandPaletteOpen } =
  uiSlice.actions;
export default uiSlice.reducer;
