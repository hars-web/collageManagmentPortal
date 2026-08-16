import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Download, FileText, UploadCloud } from 'lucide-react';
import { PageHeader, Card, Badge, Button, Modal, Input, Textarea, Select, EmptyState } from '../../components/ui';
import { cn, downloadFile } from '../../utils';

const initialNotes = [
  { id: 'n1', title: 'Lecture 12 — Neural Network Architectures', subject: 'Machine Learning', date: '05 Aug 2026', size: '1.2 MB', type: 'PDF', downloads: 87 },
  { id: 'n2', title: 'Lecture 11 — Backpropagation Derivations', subject: 'Machine Learning', date: '31 Jul 2026', size: '860 KB', type: 'PDF', downloads: 76 },
  { id: 'n3', title: 'NLP Unit 3 — Transformers & Attention', subject: 'Natural Language Processing', date: '28 Jul 2026', size: '2.1 MB', type: 'PDF', downloads: 64 },
  { id: 'n4', title: 'Lab 9 — TensorFlow CNN Workshop', subject: 'ML Lab', date: '24 Jul 2026', size: '4.3 MB', type: 'ZIP', downloads: 92 },
  { id: 'n5', title: 'Unit 2 — Probability Refresher', subject: 'Machine Learning', date: '18 Jul 2026', size: '640 KB', type: 'PDF', downloads: 58 },
  { id: 'n6', title: 'NLP Unit 2 — Word Embeddings Lab', subject: 'Natural Language Processing', date: '14 Jul 2026', size: '1.8 MB', type: 'PDF', downloads: 61 },
];

export default function FacultyNotes() {
  const [notes, setNotes] = useState(initialNotes);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ title: '', subject: 'Machine Learning', description: '' });
  const [fileName, setFileName] = useState('');

  const publish = () => {
    if (form.title.length < 5) return toast.error('Give the notes a meaningful title');
    setNotes((n) => [{ id: `n${Date.now()}`, title: form.title, subject: form.subject, date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }), size: '1.4 MB', type: 'PDF', downloads: 0 }, ...n]);
    toast.success('Notes published to all enrolled students!');
    setOpen(false);
    setForm({ title: '', subject: 'Machine Learning', description: '' });
    setFileName('');
  };

  return (
    <div>
      <PageHeader
        title="Upload Notes"
        subtitle="Share lecture notes, slides and lab material with your students"
        crumbs={[{ label: 'Faculty' }, { label: 'Notes' }]}
        actions={<Button onClick={() => setOpen(true)}><UploadCloud className="h-4 w-4" /> Upload New</Button>}
      />

      <Card className="divide-y divide-dark-100 p-0 dark:divide-dark-800">
        {notes.map((n) => (
          <div key={n.id} className="flex items-center gap-4 p-4">
            <span className={cn('flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-xs font-black', n.type === 'ZIP' ? 'bg-accent-50 text-accent-600 dark:bg-accent-900/30 dark:text-accent-400' : 'bg-danger-50 text-danger-600 dark:bg-danger-900/30 dark:text-danger-400')}>{n.type}</span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">{n.title}</p>
              <p className="text-xs text-dark-400">{n.subject} · {n.date} · {n.size} · {n.downloads} downloads</p>
            </div>
            <Badge tone="neutral">{n.subject === 'Machine Learning' ? 'CSE601' : n.subject === 'Natural Language Processing' ? 'CSE605' : 'CSE610'}</Badge>
            <button className="btn-outline px-3 py-1.5 text-xs" onClick={() => { downloadFile(`${n.title}.${n.type.toLowerCase()}`, `Sample ${n.type} content: ${n.title}`); toast.success('Download started'); }}>
              <Download className="h-3.5 w-3.5" /> Download
            </button>
          </div>
        ))}
        {notes.length === 0 && <EmptyState icon={<FileText className="h-6 w-6" />} title="No notes uploaded yet" message="Upload your first lecture notes" />}
      </Card>

      <Modal open={open} onClose={() => setOpen(false)} title="Upload Lecture Notes" subtitle="Students get notified instantly">
        <div className="space-y-4">
          <Input label="Title" placeholder="e.g. Lecture 13 — Optimizers Deep Dive" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <Select label="Subject" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}>
            {['Machine Learning', 'Natural Language Processing', 'ML Lab'].map((s) => <option key={s}>{s}</option>)}
          </Select>
          <Textarea label="Description (optional)" placeholder="What's inside this file?" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          <label className="flex cursor-pointer flex-col items-center gap-2 rounded-2xl border-2 border-dashed border-dark-200 p-6 text-center transition-colors hover:border-primary-400 dark:border-dark-700">
            <UploadCloud className="h-6 w-6 text-primary-500" />
            <span className="text-sm font-semibold">{fileName || 'Click to choose a file'}</span>
            <span className="text-xs text-dark-400">PDF, PPT, DOCX or ZIP · max 25 MB</span>
            <input type="file" className="hidden" onChange={(e) => setFileName(e.target.files?.[0]?.name ?? '')} />
          </label>
          <div className="flex justify-end gap-3">
            <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={publish}>Publish to Students</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
