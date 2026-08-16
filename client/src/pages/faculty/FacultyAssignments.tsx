import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Calendar, Clock, FileText } from 'lucide-react';
import { PageHeader, Card, Badge, Button, Modal, Input, Textarea, Select } from '../../components/ui';
import { cn } from '../../utils';

const initial = [
  { id: 'a1', title: 'ML Assignment 4 — Neural Networks', subject: 'Machine Learning', due: '12 Aug 2026', submissions: 61, total: 64, weight: '15%', status: 'Open' },
  { id: 'a2', title: 'NLP Assignment 3 — POS Tagging', subject: 'Natural Language Processing', due: '15 Aug 2026', submissions: 41, total: 58, weight: '12%', status: 'Open' },
  { id: 'a3', title: 'ML Lab Task 9 — CNN on CIFAR-10', subject: 'ML Lab', due: '18 Aug 2026', submissions: 64, total: 64, weight: '10%', status: 'Open' },
  { id: 'a4', title: 'ML Assignment 3 — SVM Kernels', subject: 'Machine Learning', due: '28 Jul 2026', submissions: 64, total: 64, weight: '15%', status: 'Closed' },
  { id: 'a5', title: 'NLP Assignment 2 — Language Models', subject: 'Natural Language Processing', due: '20 Jul 2026', submissions: 58, total: 58, weight: '12%', status: 'Closed' },
];

export default function FacultyAssignments() {
  const [items, setItems] = useState(initial);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ title: '', subject: 'Machine Learning', due: '2026-08-20', maxMarks: '100', instructions: '' });

  const create = () => {
    if (form.title.length < 5) return toast.error('Title must be at least 5 characters');
    setItems((a) => [{ id: `a${Date.now()}`, title: form.title, subject: form.subject, due: new Date(form.due).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }), submissions: 0, total: 64, weight: '10%', status: 'Open' }, ...a]);
    toast.success('Assignment published — students notified');
    setOpen(false);
    setForm({ title: '', subject: 'Machine Learning', due: '2026-08-20', maxMarks: '100', instructions: '' });
  };

  return (
    <div>
      <PageHeader
        title="Assignments"
        subtitle="Create, track submissions and grade"
        crumbs={[{ label: 'Faculty' }, { label: 'Assignments' }]}
        actions={<Button onClick={() => setOpen(true)}><FileText className="h-4 w-4" /> New Assignment</Button>}
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="p-4 text-sm"><p className="text-dark-400">Open Assignments</p><p className="mt-1 text-2xl font-bold">{items.filter((a) => a.status === 'Open').length}</p></Card>
        <Card className="p-4 text-sm"><p className="text-dark-400">Submissions Pending Review</p><p className="mt-1 text-2xl font-bold text-accent-500">{items.reduce((s, a) => s + (a.total - a.submissions), 0)}</p></Card>
        <Card className="p-4 text-sm"><p className="text-dark-400">Graded This Semester</p><p className="mt-1 text-2xl font-bold text-success">312</p></Card>
      </div>

      <div className="mt-6 space-y-4">
        {items.map((a) => {
          const pct = Math.round((a.submissions / a.total) * 100);
          return (
            <Card key={a.id} className="card-hover flex flex-col gap-4 p-5 sm:flex-row sm:items-center">
              <span className={cn('flex h-11 w-11 shrink-0 items-center justify-center rounded-xl', a.status === 'Open' ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400' : 'bg-dark-100 text-dark-400 dark:bg-dark-800')}>
                <FileText className="h-5 w-5" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-semibold">{a.title}</p>
                  <Badge tone={a.status === 'Open' ? 'success' : 'neutral'} dot>{a.status}</Badge>
                </div>
                <p className="mt-1 flex flex-wrap items-center gap-3 text-xs text-dark-400">
                  <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> Due {a.due}</span>
                  <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {a.weight} weightage</span>
                  <span>{a.subject}</span>
                </p>
                <div className="mt-2 h-1.5 w-full max-w-xs overflow-hidden rounded-full bg-dark-100 dark:bg-dark-800">
                  <div className="h-full rounded-full bg-gradient-to-r from-primary-500 to-secondary-500" style={{ width: `${pct}%` }} />
                </div>
              </div>
              <div className="shrink-0 text-sm">
                <p className="font-bold">{a.submissions}/{a.total}</p>
                <p className="text-xs text-dark-400">submitted</p>
              </div>
              <div className="flex shrink-0 gap-2">
                <Button variant="outline" size="sm" onClick={() => toast.success('Submissions opened')}>Review</Button>
                <Button size="sm" onClick={() => toast.success('Reminder sent to pending students')}>Remind</Button>
              </div>
            </Card>
          );
        })}
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title="Create Assignment" subtitle="Visible to all enrolled students">
        <div className="space-y-4">
          <Input label="Title" placeholder="e.g. ML Assignment 5 — CNNs" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <div className="grid grid-cols-2 gap-4">
            <Select label="Subject" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}>
              {['Machine Learning', 'Natural Language Processing', 'ML Lab'].map((s) => <option key={s}>{s}</option>)}
            </Select>
            <Input label="Max Marks" type="number" value={form.maxMarks} onChange={(e) => setForm({ ...form, maxMarks: e.target.value })} />
          </div>
          <Input label="Due Date" type="date" value={form.due} onChange={(e) => setForm({ ...form, due: e.target.value })} />
          <Textarea label="Instructions" placeholder="Submission format, rubric highlights…" value={form.instructions} onChange={(e) => setForm({ ...form, instructions: e.target.value })} />
          <div className="flex justify-end gap-3">
            <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={create}>Publish Assignment</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
