import {
  chatChannels,
  chatMessages,
  demoUsers,
  forumThreads,
  leaveRequests,
  myIssues,
  notifications,
  students,
  timetable,
  assignments,
  exams,
  results,
  feeRecords,
  complaints,
} from '../data/mock';

const delay = (ms = 400) => new Promise((r) => setTimeout(r, ms));

const MOCK_PASSWORDS: Record<string, string> = {
  'student@cutm.ac.in': 'student123',
  'faculty@cutm.ac.in': 'faculty123',
  'admin@cutm.ac.in': 'admin123',
  'placement@cutm.ac.in': 'placement123',
  'librarian@cutm.ac.in': 'librarian123',
};

export interface LoginResult {
  token: string;
  refreshToken: string;
  user: (typeof demoUsers)[number];
}

export const mockAuth = {
  async login(email: string, password: string): Promise<LoginResult> {
    await delay(700);
    const user = demoUsers.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (user) {
      if (MOCK_PASSWORDS[user.email] !== password) {
        throw new Error('Invalid email or password');
      }
      return {
        token: `mock.jwt.${user.id}`,
        refreshToken: `mock.refresh.${user.id}`,
        user,
      };
    }
    if (!email.includes('@')) {
      throw new Error('Enter a valid email');
    }
    if (password.length < 8) {
      throw new Error('Password must be at least 8 characters');
    }
    const guest: (typeof demoUsers)[number] = {
      id: `guest-${email.replace(/[^a-z0-9]/gi, '').slice(0, 12)}`,
      name: email
        .split('@')[0]
        .replace(/[._-]+/g, ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase()),
      email,
      role: 'student',
      department: 'Computer Science & Engineering',
      enrolledYear: 2022,
      program: 'B.Tech CSE',
      rollNumber: `CUTM2200${String(Math.floor(Math.random() * 900) + 100)}`,
    };
    return {
      token: `mock.jwt.${guest.id}`,
      refreshToken: `mock.refresh.${guest.id}`,
      user: guest,
    };
  },
  async sendOtp(email: string): Promise<void> {
    await delay(500);
    if (!demoUsers.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
      throw new Error('No account found with this email');
    }
  },
  async verifyOtp(_email: string, otp: string): Promise<boolean> {
    await delay(500);
    return otp === '123456';
  },
  async register(): Promise<{ requestId: string }> {
    await delay(600);
    return { requestId: `REQ-${Date.now().toString(36).toUpperCase()}` };
  },
  async resetPassword(_email: string, otp: string, newPassword: string): Promise<void> {
    await delay(600);
    if (otp !== '123456') throw new Error('Invalid OTP');
    if (newPassword.length < 8) throw new Error('Password must be at least 8 characters');
  },
};

export const mockData = {
  notifications,
  students,
  timetable,
  assignments,
  exams,
  results,
  feeRecords,
  myIssues,
  complaints,
  leaveRequests,
  forumThreads,
  chatChannels,
  chatMessages,
};

export type MockData = typeof mockData;
