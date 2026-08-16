import { Router } from 'express';
import jwt from 'jsonwebtoken';
import {
  getUsers,
  getCollections,
  addGuestUser,
  verifyGuestPassword,
  isDemoPassword,
  MOCK_OTP,
} from './db.js';

const JWT_SECRET = process.env.JWT_SECRET || 'cutm-dev-secret-change-me';
const ACCESS_TTL = '15m';
const REFRESH_TTL = '7d';
const refreshStore = new Map();

export const requireAuth = (req, res, next) => {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return res.status(401).json({ message: 'Authentication required' });
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    return next();
  } catch {
    return res.status(401).json({ message: 'Session expired, please sign in again' });
  }
};

function signTokens(user) {
  const accessToken = jwt.sign({ sub: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: ACCESS_TTL });
  const refreshToken = jwt.sign({ sub: user.id }, JWT_SECRET, { expiresIn: REFRESH_TTL });
  refreshStore.set(refreshToken, user.id);
  return { accessToken, refreshToken };
}

function publicUser(user) {
  const { avatarSeed, passwordHash, ...safe } = user;
  return safe;
}

export const authRouter = Router();

authRouter.post('/login', async (req, res) => {
  const { email, password } = req.body ?? {};
  if (typeof email !== 'string' || typeof password !== 'string') {
    return res.status(400).json({ message: 'Email and password are required' });
  }
  const users = await getUsers();
  const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (user && isDemoPassword(email, password)) {
    const { accessToken, refreshToken } = signTokens(user);
    return res.json({ token: accessToken, refreshToken, user: publicUser(user) });
  }
  if (user && !isDemoPassword(email, password)) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }
  if (!email.includes('@')) {
    return res.status(400).json({ message: 'Enter a valid email' });
  }
  if (password.length < 8) {
    return res.status(400).json({ message: 'Password must be at least 8 characters' });
  }
  const guest = await addGuestUser({ email, password });
  const guestLogin = await verifyGuestPassword(email, password);
  if (!guestLogin) return res.status(401).json({ message: 'Invalid email or password' });
  const { accessToken, refreshToken } = signTokens(guest);
  return res.json({ token: accessToken, refreshToken, user: publicUser(guest) });
});

authRouter.post('/refresh', (req, res) => {
  const { refreshToken } = req.body ?? {};
  if (typeof refreshToken !== 'string' || !refreshStore.has(refreshToken)) {
    return res.status(401).json({ message: 'Invalid refresh token' });
  }
  try {
    const payload = jwt.verify(refreshToken, JWT_SECRET);
    refreshStore.delete(refreshToken);
    const accessToken = jwt.sign({ sub: payload.sub }, JWT_SECRET, { expiresIn: ACCESS_TTL });
    const newRefresh = jwt.sign({ sub: payload.sub }, JWT_SECRET, { expiresIn: REFRESH_TTL });
    refreshStore.set(newRefresh, payload.sub);
    return res.json({ accessToken, refreshToken: newRefresh });
  } catch {
    return res.status(401).json({ message: 'Invalid refresh token' });
  }
});

authRouter.post('/register', async (req, res) => {
  const { name, email, phone, program } = req.body ?? {};
  if (!email || !name) return res.status(400).json({ message: 'Name and email are required' });
  const requestId = `REQ-${Date.now().toString(36).toUpperCase()}`;
  return res.json({ requestId, message: 'Registration request submitted' });
});

authRouter.post('/send-otp', async (req, res) => {
  const { email } = req.body ?? {};
  const users = await getUsers();
  if (!users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
    return res.status(404).json({ message: 'No account found with this email' });
  }
  return res.json({ ok: true, otp: MOCK_OTP, message: `Demo OTP for ${email}: ${MOCK_OTP}` });
});

authRouter.post('/verify-otp', (req, res) => {
  const { otp } = req.body ?? {};
  return res.json({ valid: otp === MOCK_OTP });
});

authRouter.post('/reset-password', (req, res) => {
  const { otp, newPassword } = req.body ?? {};
  if (otp !== MOCK_OTP) return res.status(400).json({ message: 'Invalid OTP' });
  if (typeof newPassword !== 'string' || newPassword.length < 8) {
    return res.status(400).json({ message: 'Password must be at least 8 characters' });
  }
  return res.json({ ok: true });
});

authRouter.get('/me', requireAuth, async (req, res) => {
  const users = await getUsers();
  const user = users.find((u) => u.id === req.user.sub);
  if (!user) return res.status(404).json({ message: 'User not found' });
  return res.json({ user: publicUser(user) });
});

authRouter.get('/collections', async (req, res) => {
  const collections = await getCollections();
  return res.json({ keys: Object.keys(collections).sort() });
});
