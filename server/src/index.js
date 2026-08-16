import express from 'express';
import cors from 'cors';
import { authRouter } from './auth.js';
import { dataRouter } from './data.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173', credentials: true }));
app.use(express.json({ limit: '1mb' }));

app.get('/api/v1/health', (_req, res) => {
  res.json({ status: 'ok', service: 'cutm-api', time: new Date().toISOString() });
});

app.use('/api/v1/auth', authRouter);
app.use('/api/v1', dataRouter);

app.use((_req, res) => res.status(404).json({ message: 'Route not found' }));

app.use((err, _req, res, _next) => {
  console.error('[server error]', err);
  res.status(500).json({ message: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`CUTM API running on http://localhost:${PORT}/api/v1`);
});
