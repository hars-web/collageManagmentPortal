import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { CalendarDays, Megaphone } from 'lucide-react';
import { PageHeader, Card, Badge, Button, Modal, Input, Textarea, Select } from '../../components/ui';
import { events, notifications } from '../../data/mock';
import { cn, timeAgo } from '../../utils';

export default function AdminEvents() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ title: '', date: '', venue: 'Main Auditorium', category: 'Academic' });

  return (
    <div>
      <PageHeader
        title="Events & Announcements"
        subtitle="Campus events, workshops, fests and guest lectures"
        crumbs={[{ label: 'Admin' }, { label: 'Events' }]}
        actions={<Button onClick={() => setOpen(true)}><CalendarDays className="h-4 w-4" /> New Event</Button>}
      />

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {events.map((e) => (
          <Card key={e.id} className="card-hover overflow-hidden">
            <div className="relative h-32 bg-gradient-to-br from-primary-600 via-secondary-500 to-primary-700 p-5 text-white">
              <div className="flex items-start justify-between">
                <div className="rounded-xl bg-white/15 px-3 py-2 text-center backdrop-blur">
                  <p className="text-xl font-black leading-none">{new Date(e.date).getDate()}</p>
                  <p className="text-[10px] uppercase tracking-wider">{new Date(e.date).toLocaleString('en-IN', { month: 'short' })}</p>
                </div>
                <Badge tone="neutral">{e.category}</Badge>
              </div>
              <p className="absolute bottom-4 left-5 font-semibold">{e.title}</p>
            </div>
            <div className="p-4 text-xs text-dark-400">
              <p className="flex items-center gap-1.5">🕐 {e.time} · {e.venue}</p>
              <div className="mt-3 flex gap-2">
                <button className="btn-outline flex-1 py-1.5 text-xs" onClick={() => toast.success('Event page opened')}>Details</button>
                <button className="btn-primary flex-1 py-1.5 text-xs" onClick={() => toast.success(`Event "${e.title}" published`)}>Publish</button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="mt-6">
        <div className="flex items-center justify-between p-5 pb-3">
          <h3 className="flex items-center gap-2 text-base font-semibold"><Megaphone className="h-4 w-4 text-primary-500" /> Recent Notice Board Posts</h3>
          <Badge tone="primary">{notifications.length} live</Badge>
        </div>
        <div className="divide-y divide-dark-100 dark:divide-dark-800">
          {notifications.slice(0, 5).map((n) => (
            <div key={n.id} className="flex items-center gap-3 px-5 py-3.5">
              <span className={cn('h-2 w-2 shrink-0 rounded-full', n.type === 'danger' ? 'bg-danger' : n.type === 'warning' ? 'bg-accent-500' : 'bg-success')} />
              <p className="min-w-0 flex-1 truncate text-sm">{n.title} — <span className="text-dark-400">{n.message}</span></p>
              <span className="shrink-0 text-[11px] text-dark-400">{timeAgo(n.createdAt)}</span>
              <button className="btn-outline shrink-0 px-2.5 py-1 text-xs" onClick={() => toast.success('Post edited')}>Edit</button>
            </div>
          ))}
        </div>
      </Card>

      <Modal open={open} onClose={() => setOpen(false)} title="Create Event" subtitle="Announced on website, portal & notice boards">
        <div className="space-y-4">
          <Input label="Event Title" placeholder="e.g. TechNova 2026 — Hackathon" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Date" type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
            <Input label="Venue" value={form.venue} onChange={(e) => setForm({ ...form, venue: e.target.value })} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Select label="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
              {['Academic', 'Cultural', 'Sports', 'Technical', 'Guest Lecture'].map((c) => <option key={c}>{c}</option>)}
            </Select>
            <Input label="Time" type="time" defaultValue="10:00" />
          </div>
          <Textarea label="Description" placeholder="What's the event about?" />
          <div className="flex justify-end gap-3">
            <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={() => { if (!form.title) return toast.error('Title required'); toast.success('Event created & announced'); setOpen(false); setForm({ title: '', date: '', venue: 'Main Auditorium', category: 'Academic' }); }}>Create Event</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
