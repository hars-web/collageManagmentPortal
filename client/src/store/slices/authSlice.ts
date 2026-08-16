import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { AuthState, User } from '../../types';

const storedAuth = (() => {
  try {
    const raw = localStorage.getItem('cutm_auth');
    return raw ? (JSON.parse(raw) as AuthState) : null;
  } catch {
    return null;
  }
})();

const initialState: AuthState = storedAuth ?? {
  user: null,
  token: null,
  refreshToken: null,
  isAuthenticated: false,
  loading: false,
  twoFactorRequired: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action: PayloadAction<{ user: User; token: string; refreshToken: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
      state.isAuthenticated = true;
      state.loading = false;
      state.twoFactorRequired = false;
      localStorage.setItem('cutm_auth', JSON.stringify(state));
    },
    loginFail: (state) => {
      state.loading = false;
      state.twoFactorRequired = false;
    },
    twoFactorRequired: (state) => {
      state.twoFactorRequired = true;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.loading = false;
      localStorage.removeItem('cutm_auth');
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) state.user = { ...state.user, ...action.payload };
      localStorage.setItem('cutm_auth', JSON.stringify(state));
    },
  },
});

export const { loginStart, loginSuccess, loginFail, logout, twoFactorRequired, updateUser } = authSlice.actions;
export default authSlice.reducer;
