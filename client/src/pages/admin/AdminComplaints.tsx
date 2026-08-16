import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { AlertTriangle, CheckCircle2, Clock, MessageSquare } from 'lucide-react';
import { PageHeader, Card, Badge, statusTone, Button, Modal, Textarea, Avatar } from '../../components/ui';
import { complaints, students } from '../../data/mock';
import { cn, timeAgo } from '../../utils';

export default function AdminComplaints() {
  const [items, setItems] = useState(complaints);
  const [open, setOpen] = useState(false);
  const [reply, setReply] = useState('');
  const [active, setActive] = useState<string | null>(null);
  const studentOf = (id: string) => students.find((s) => s.id === id);

  const counts = {
    open: items.filter((c) => c.status === 'open').length,
    inProgress: items.filter((c) => c.status === 'in-progress').length,
    resolved: items.filter((c) => c.status === 'resolved').length,
  };

  const resolve = (id: string) => {
    setItems((cs) => cs.map((c) => (c.id === id ? { ...c, status: 'resolved' } : c)));
    toast.success('Complaint marked as resolved');
  };

  return (
    <div>
      <PageHeader
        title="Complaint Management"
        subtitle="Student grievances · SLA 48 hours"
        crumbs={[{ label: 'Admin' }, { label: 'Complaints' }]}
      />

      <div className="grid grid-cols-3 gap-4">
        <Card className="p-4"><p className="text-xs text-dark-400">Open</p><p className="mt-1 text-2xl font-bold text-danger">{counts.open}</p></Card>
        <Card className="p-4"><p className="text-xs text-dark-400">In Progress</p><p className="mt-1 text-2xl font-bold text-accent-500">{counts.inProgress}</p></Card>
        <Card className="p-4"><p className="text-xs text-dark-400">Resolved (30 days)</p><p className="mt-1 text-2xl font-bold text-success">{counts.resolved}</p></Card>
      </div>

      <div className="mt-6 space-y-4">
        {items.map((c) => (
          <Card key={c.id} className="card-hover p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className={cn('flex h-10 w-10 items-center justify-center rounded-xl', c.category === 'Hostel' ? 'bg-accent-50 text-accent-600 dark:bg-accent-900/30 dark:text-accent-400' : c.category === 'Academics' ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400' : 'bg-secondary-50 text-secondary-600 dark:bg-secondary-900/30 dark:text-secondary-400')}>
                  {c.category === 'Hostel' ? '🏠' : c.category === 'Academics' ? '📚' : '🍽️'}
                </span>
                <div>
                  <p className="font-semibold">{c.subject}</p>
                  <p className="flex items-center gap-2 text-xs text-dark-400">
                    <Avatar name={studentOf(c.studentId)?.name ?? 'Student'} size="xs" /> {studentOf(c.studentId)?.name ?? 'Student'} · {studentOf(c.studentId)?.rollNumber ?? '—'} · {timeAgo(c.createdAt)} · <Badge tone="neutral">{c.category}</Badge>
                  </p>
                </div>
              </div>
              <Badge tone={statusTone(c.status)} dot>{c.status}</Badge>
            </div>
            <p className="mt-3 text-sm text-dark-500 dark:text-dark-300">{c.description}</p>
            {c.resolution && (
              <div className="mt-3 rounded-xl bg-dark-50 p-3 text-xs dark:bg-dark-800">
                <p className="font-semibold text-dark-600 dark:text-dark-200">Staff reply:</p>
                <p className="mt-1 text-dark-500 dark:text-dark-300">{c.resolution}</p>
              </div>
            )}
            <div className="mt-4 flex flex-wrap gap-2">
              {c.status !== 'in-progress' && c.status !== 'resolved' && (
                <Button size="sm" variant="outline" onClick={() => { setItems((cs) => cs.map((x) => (x.id === c.id ? { ...x, status: 'in-progress' } : x))); toast.success('Marked in progress'); }}>
                  <Clock className="h-3.5 w-3.5" /> Start Work
                </Button>
              )}
              {c.status !== 'resolved' && (
                <Button size="sm" onClick={() => resolve(c.id)}><CheckCircle2 className="h-3.5 w-3.5" /> Resolve</Button>
              )}
              <Button size="sm" variant="outline" onClick={() => { setActive(c.id); setOpen(true); }}><MessageSquare className="h-3.5 w-3.5" /> Reply</Button>
              {c.status === 'resolved' && <span className="flex items-center gap-1 text-xs text-success"><AlertTriangle className="h-3.5 w-3.5" /> Escalated to HOD if unresolved</span>}
            </div>
          </Card>
        ))}
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title="Reply to Complaint" subtitle="Reply is visible to the student">
        <div className="space-y-4">
          <Textarea label="Your Response" placeholder="Investigation note or resolution update…" value={reply} onChange={(e) => setReply(e.target.value)} />
          <div className="flex justify-end gap-3">
            <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={() => { if (reply.trim().length < 10) return toast.error('Reply must be at least 10 characters'); setItems((cs) => cs.map((c) => (c.id === active ? { ...c, resolution: reply, status: 'in-progress' } : c))); setReply(''); setOpen(false); toast.success('Reply sent to student'); }}>Send Reply</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
