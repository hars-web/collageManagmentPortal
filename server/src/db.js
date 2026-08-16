import { fileURLToPath } from 'node:url';
import path from 'node:path';
import bcrypt from 'bcryptjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const MOCK_TS = path.join(__dirname, '..', '..', 'client', 'src', 'data', 'mock.ts');

export const MOCK_PASSWORDS = {
  'student@cutm.ac.in': 'student123',
  'faculty@cutm.ac.in': 'faculty123',
  'admin@cutm.ac.in': 'admin123',
  'placement@cutm.ac.in': 'placement123',
  'librarian@cutm.ac.in': 'librarian123',
};

export const MOCK_OTP = '123456';

const collectionCache = { value: null, promise: null };

async function loadMock() {
  if (collectionCache.promise) return collectionCache.promise;
  collectionCache.promise = import(`file://${MOCK_TS.replace(/\\/g, '/')}`).then((m) => {
    const collections = {};
    for (const key of Object.keys(m)) {
      if (typeof m[key] === 'object' && m[key] !== null) collections[key] = m[key];
    }
    collectionCache.value = collections;
    return collections;
  });
  return collectionCache.promise;
}

export async function getCollections() {
  if (collectionCache.value) return collectionCache.value;
  return loadMock();
}

export async function getCollection(key) {
  const collections = await getCollections();
  if (!(key in collections)) return null;
  return collections[key];
}

let users = null;
const guestUsers = new Map();

function loadDemoUsers(collections) {
  const base = collections.demoUsers ?? [];
  const seeded = base.map((u) => ({ ...u, avatarSeed: u.name }));
  for (const g of guestUsers.values()) seeded.push(g);
  return seeded;
}

export async function getUsers() {
  if (!users) {
    const collections = await getCollections();
    users = loadDemoUsers(collections);
  }
  return users;
}

export async function addGuestUser({ email, password, name }) {
  const usersList = await getUsers();
  const existing = usersList.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (existing) return existing;
  const guest = {
    id: `guest-${email.replace(/[^a-z0-9]/gi, '').slice(0, 12)}`,
    name: name || email.split('@')[0].replace(/[._-]+/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
    email,
    role: 'student',
    department: 'Computer Science & Engineering',
    enrolledYear: 2022,
    program: 'B.Tech CSE',
    rollNumber: `CUTM2200${String(Math.floor(Math.random() * 900) + 100)}`,
  };
  guestUsers.set(email.toLowerCase(), { user: guest, passwordHash: await bcrypt.hash(password, 10) });
  usersList.push(guest);
  return guest;
}

export async function verifyGuestPassword(email, password) {
  const record = guestUsers.get(email.toLowerCase());
  if (!record) return null;
  const ok = await bcrypt.compare(password, record.passwordHash);
  return ok ? record.user : null;
}

export function isDemoPassword(email, password) {
  return MOCK_PASSWORDS[email.toLowerCase()] === password;
}
