import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Megaphone, Pin } from 'lucide-react';
import { PageHeader, Card, Badge, Button, Modal, Input, Textarea, Select } from '../../components/ui';
import { notifications } from '../../data/mock';
import { cn, timeAgo } from '../../utils';

export default function AdminNotices() {
  const [notices, setNotices] = useState(notifications);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ title: '', message: '', type: 'General' });
  const [pinned, setPinned] = useState('n1');

  const publish = () => {
    if (form.title.length < 5 || form.message.length < 10) return toast.error('Title (5+) and message (10+) required');
    const type = form.type === 'Urgent' ? 'danger' : form.type === 'Exam' ? 'warning' : 'info';
    setNotices((ns) => [{ id: `n${Date.now()}`, title: form.title, message: form.message, type, createdAt: new Date().toISOString(), read: false }, ...ns]);
    toast.success('Notice published to all students, faculty & staff');
    setOpen(false);
    setForm({ title: '', message: '', type: 'General' });
  };

  return (
    <div>
      <PageHeader
        title="Notice Board"
        subtitle="Campus-wide announcements · instant push to all portals"
        crumbs={[{ label: 'Admin' }, { label: 'Notice Board' }]}
        actions={<Button onClick={() => setOpen(true)}><Megaphone className="h-4 w-4" /> New Notice</Button>}
      />

      <Card className="divide-y divide-dark-100 dark:divide-dark-800">
        {notices.map((n) => (
          <div key={n.id} className="flex items-start gap-4 p-5">
            <span className={cn('mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white', n.type === 'danger' ? 'bg-danger' : n.type === 'warning' ? 'bg-accent-500' : 'bg-primary-600')}>
              {pinned === n.id ? <Pin className="h-4 w-4" /> : <Megaphone className="h-4 w-4" />}
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                {pinned === n.id && <Badge tone="danger">Pinned</Badge>}
                <Badge tone={n.type === 'danger' ? 'danger' : n.type === 'warning' ? 'accent' : 'primary'}>{n.type}</Badge>
                <span className="text-[11px] text-dark-400">{timeAgo(n.createdAt)}</span>
              </div>
              <h3 className="mt-1.5 font-semibold">{n.title}</h3>
              <p className="mt-1 text-sm text-dark-500 dark:text-dark-300">{n.message}</p>
              <div className="mt-3 flex gap-2">
                <button className="btn-outline px-3 py-1.5 text-xs" onClick={() => { setPinned(pinned === n.id ? '' : n.id); toast.success(pinned === n.id ? 'Unpinned' : 'Notice pinned to top'); }}>{pinned === n.id ? 'Unpin' : 'Pin'}</button>
                <button className="btn-outline px-3 py-1.5 text-xs" onClick={() => toast.success('Notice sent as SMS + email')}>Broadcast</button>
                <button className="btn-outline px-3 py-1.5 text-xs text-danger hover:bg-danger-50 dark:hover:bg-danger-900/20" onClick={() => { setNotices((ns) => ns.filter((x) => x.id !== n.id)); toast.success('Notice deleted'); }}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </Card>

      <Modal open={open} onClose={() => setOpen(false)} title="Publish Notice" subtitle="Push notifications + notice board + SMS">
        <div className="space-y-4">
          <Input label="Title" placeholder="e.g. Mid-Term Exam Schedule Released" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <Textarea label="Message" placeholder="Write the full notice content…" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
          <Select label="Priority" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
            {['General', 'Exam', 'Urgent', 'Events'].map((t) => <option key={t}>{t}</option>)}
          </Select>
          <div className="flex justify-end gap-3">
            <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={publish}>Publish Notice</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
