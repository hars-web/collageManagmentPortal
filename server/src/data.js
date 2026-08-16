import { Router } from 'express';
import { getCollection } from './db.js';
import { requireAuth } from './auth.js';

export const dataRouter = Router();

dataRouter.get('/data/:key', async (req, res) => {
  const collection = await getCollection(req.params.key);
  if (collection === null) return res.status(404).json({ message: `Collection "${req.params.key}" not found` });
  return res.json(collection);
});

dataRouter.post('/data/:key', requireAuth, async (req, res) => {
  const collection = await getCollection(req.params.key);
  if (collection === null) return res.status(404).json({ message: `Collection "${req.params.key}" not found` });
  if (!Array.isArray(collection)) return res.status(400).json({ message: 'Append only supported on arrays' });
  const record = { id: `${req.params.key.slice(0, 2)}-${Date.now().toString(36)}`, ...req.body };
  collection.push(record);
  return res.status(201).json(record);
});

dataRouter.post('/complaints', requireAuth, async (req, res) => {
  const collection = await getCollection('complaints');
  const record = {
    id: `cm-${Date.now().toString(36)}`,
    studentId: req.user.sub,
    status: 'open',
    priority: 'medium',
    createdAt: new Date().toISOString().slice(0, 10),
    ...req.body,
  };
  collection.push(record);
  return res.status(201).json(record);
});

dataRouter.post('/leaves', requireAuth, async (req, res) => {
  const collection = await getCollection('leaveRequests');
  const record = {
    id: `lv-${Date.now().toString(36)}`,
    studentId: req.user.sub,
    status: 'pending',
    appliedOn: new Date().toISOString().slice(0, 10),
    ...req.body,
  };
  collection.push(record);
  return res.status(201).json(record);
});

dataRouter.post('/forum', requireAuth, async (req, res) => {
  const collection = await getCollection('forumThreads');
  const record = {
    id: `th-${Date.now().toString(36)}`,
    author: req.user.sub,
    replies: 0,
    views: 0,
    createdAt: new Date().toISOString(),
    ...req.body,
  };
  collection.push(record);
  return res.status(201).json(record);
});

dataRouter.patch('/data/:key/:id', requireAuth, async (req, res) => {
  const collection = await getCollection(req.params.key);
  if (collection === null) return res.status(404).json({ message: `Collection "${req.params.key}" not found` });
  if (!Array.isArray(collection)) return res.status(400).json({ message: 'Patch only supported on arrays' });
  const record = collection.find((r) => r.id === req.params.id);
  if (!record) return res.status(404).json({ message: `Record "${req.params.id}" not found` });
  Object.assign(record, req.body);
  return res.json(record);
});

dataRouter.delete('/data/:key/:id', requireAuth, async (req, res) => {
  const collection = await getCollection(req.params.key);
  if (collection === null) return res.status(404).json({ message: `Collection "${req.params.key}" not found` });
  if (!Array.isArray(collection)) return res.status(400).json({ message: 'Delete only supported on arrays' });
  const index = collection.findIndex((r) => r.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: `Record "${req.params.id}" not found` });
  const [removed] = collection.splice(index, 1);
  return res.json(removed);
});
