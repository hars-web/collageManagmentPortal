import axios from 'axios';
import { store } from '../store';
import { logout } from '../store/slices/authSlice';

export const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:5000/api/v1';

export const api = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = store.getState().auth.token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;
    const refreshToken = store.getState().auth.refreshToken;
    if (error.response?.status === 401 && !original._retry && refreshToken) {
      original._retry = true;
      try {
        const { data } = await axios.post(`${API_BASE}/auth/refresh`, { refreshToken });
        localStorage.setItem('cutm_auth', JSON.stringify({ ...store.getState().auth, token: data.accessToken }));
        original.headers.Authorization = `Bearer ${data.accessToken}`;
        return api(original);
      } catch {
        store.dispatch(logout());
      }
    }
    return Promise.reject(error);
  },
);

export default api;
