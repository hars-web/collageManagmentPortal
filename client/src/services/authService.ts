import api from './api';
import type { User } from '../types';

export interface LoginResponse {
  token: string;
  refreshToken: string;
  user: User;
}

export const authApi = {
  login: async (email: string, password: string): Promise<LoginResponse> => {
    const { data } = await api.post<LoginResponse>('/auth/login', { email, password });
    return data;
  },
  register: async (payload: { name?: string; email?: string; phone?: string; program?: string }): Promise<{ requestId: string }> => {
    const { data } = await api.post<{ requestId: string }>('/auth/register', payload);
    return data;
  },
  sendOtp: async (email: string): Promise<void> => {
    await api.post('/auth/send-otp', { email });
  },
  verifyOtp: async (email: string, otp: string): Promise<boolean> => {
    const { data } = await api.post<{ valid: boolean }>('/auth/verify-otp', { email, otp });
    return data.valid;
  },
  resetPassword: async (email: string, otp: string, newPassword: string): Promise<void> => {
    await api.post('/auth/reset-password', { email, otp, newPassword });
  },
};
