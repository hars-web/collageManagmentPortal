import { createSlice } from '@reduxjs/toolkit';

type Theme = 'light' | 'dark';

const storedTheme = (localStorage.getItem('cutm_theme') as Theme) || 'light';

const themeSlice = createSlice({
  name: 'theme',
  initialState: { theme: storedTheme as Theme },
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
      localStorage.setItem('cutm_theme', state.theme);
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
      localStorage.setItem('cutm_theme', state.theme);
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
