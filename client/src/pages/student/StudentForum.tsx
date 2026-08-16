import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { ArrowUp, MessageSquare, Plus, Search } from 'lucide-react';
import { PageHeader, Card, Badge, Button, Modal, Input, Textarea, Select, Avatar } from '../../components/ui';
import { forumThreads } from '../../data/mock';
import { timeAgo, cn } from '../../utils';
import { currentUser } from '../../data/mock';

interface Thread {
  id: string;
  title: string;
  body: string;
  authorName: string;
  authorRole: string;
  category: string;
  createdAt: string;
  repliesCount: number;
  upvotes: number;
  tags: string[];
  hasReplies?: boolean;
}

export default function StudentForum() {
  const [threads, setThreads] = useState<Thread[]>(forumThreads.map((t) => ({ ...t, repliesCount: t.replies.length })));
  const [query, setQuery] = useState('');
  const [cat, setCat] = useState('All');
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [reply, setReply] = useState('');
  const [form, setForm] = useState({ title: '', body: '', category: 'Academics' });

  const cats = ['All', 'Academics', 'Placements', 'Campus Life', 'Events', 'Announcements'];

  const filtered = threads.filter((t) => {
    const okCat = cat === 'All' || t.category === cat;
    const okQuery = `${t.title} ${t.body} ${t.tags.join(' ')}`.toLowerCase().includes(query.toLowerCase());
    return okCat && okQuery;
  });

  const createThread = () => {
    if (form.title.length < 5 || form.body.length < 20) return toast.error('Title (5+) and body (20+ chars) required');
    setThreads((t) => [{ id: `ft${Date.now()}`, title: form.title, body: form.body, authorName: currentUser.name, authorRole: 'student', category: form.category, createdAt: new Date().toISOString(), repliesCount: 0, upvotes: 0, tags: ['New'], hasReplies: false }, ...t]);
    toast.success('Thread published!');
    setOpen(false);
    setForm({ title: '', body: '', category: 'Academics' });
  };

  const upvote = (id: string) => {
    setThreads((t) => t.map((x) => (x.id === id ? { ...x, upvotes: x.upvotes + 1 } : x)));
  };

  return (
    <div>
      <PageHeader
        title="Discussion Forum"
        subtitle="Ask, answer and collaborate with peers and faculty"
        crumbs={[{ label: 'Student' }, { label: 'Forum' }]}
        actions={<Button onClick={() => setOpen(true)}><Plus className="h-4 w-4" /> New Thread</Button>}
      />

      <div className="mb-6 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-dark-400" />
          <Input placeholder="Search discussions…" value={query} onChange={(e) => setQuery(e.target.value)} className="pl-10" aria-label="Search forum" />
        </div>
        <select value={cat} onChange={(e) => setCat(e.target.value)} className="input sm:w-48" aria-label="Filter by category">
          {cats.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </div>

      <div className="space-y-4">
        {filtered.map((t) => (
          <Card key={t.id} className="card-hover overflow-hidden">
            <div className="flex gap-4 p-5">
              <div className="flex flex-col items-center gap-1 rounded-xl bg-dark-50 px-3 py-2 dark:bg-dark-800">
                <button onClick={() => upvote(t.id)} aria-label="Upvote" className="text-dark-400 transition-colors hover:text-primary-600">
                  <ArrowUp className="h-4 w-4" />
                </button>
                <span className="text-sm font-bold">{t.upvotes}</span>
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge tone="neutral">{t.category}</Badge>
                  {t.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} tone="secondary">{tag}</Badge>
                  ))}
                </div>
                <h3 className="mt-2 cursor-pointer font-semibold hover:text-primary-600 dark:hover:text-primary-400" onClick={() => setExpanded(expanded === t.id ? null : t.id)}>{t.title}</h3>
                <p className="mt-1 line-clamp-2 text-sm text-dark-500 dark:text-dark-400">{t.body}</p>
                <div className="mt-3 flex items-center gap-3 text-xs text-dark-400">
                  <span className="flex items-center gap-1.5 font-medium text-dark-600 dark:text-dark-300">
                    <Avatar name={t.authorName} size="xs" /> {t.authorName} <Badge tone={t.authorRole === 'faculty' ? 'primary' : 'neutral'}>{t.authorRole}</Badge>
                  </span>
                  <span>{timeAgo(t.createdAt)}</span>
                  <button className="flex items-center gap-1 font-semibold text-primary-600 hover:underline dark:text-primary-400" onClick={() => setExpanded(expanded === t.id ? null : t.id)}>
                    <MessageSquare className="h-3.5 w-3.5" /> {t.repliesCount} replies
                  </button>
                </div>
              </div>
            </div>
            {expanded === t.id && (
              <div className="border-t border-dark-100 bg-dark-50/50 p-5 dark:border-dark-800 dark:bg-dark-950/30">
                {t.hasReplies === undefined && (
                  <div className="mb-4 rounded-xl bg-white p-4 text-sm text-dark-400 shadow-soft dark:bg-dark-900">
                    <p className="font-semibold text-dark-600 dark:text-dark-200">Dr. Anjali Mohapatra</p>
                    <p className="mt-1">For imbalanced data, use SMOTE and evaluate with precision-recall AUC. Focus on minority-class recall.</p>
                  </div>
                )}
                <div className="flex gap-3">
                  <Input placeholder="Write a reply…" value={reply} onChange={(e) => setReply(e.target.value)} />
                  <Button
                    className="shrink-0"
                    onClick={() => {
                      if (!reply.trim()) return;
                      setThreads((ts) => ts.map((x) => (x.id === t.id ? { ...x, repliesCount: x.repliesCount + 1, hasReplies: true } : x)));
                      setReply('');
                      toast.success('Reply posted');
                    }}
                  >
                    Post
                  </Button>
                </div>
              </div>
            )}
          </Card>
        ))}
        {filtered.length === 0 && (
          <Card className="p-12 text-center text-sm text-dark-400">No discussions match your filters. Start one!</Card>
        )}
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title="Start a Discussion" subtitle="Be specific — get better answers">
        <div className="space-y-4">
          <Input label="Title" placeholder="e.g. How to approach the ML assignment?" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <Select label="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
            {cats.filter((c) => c !== 'All').map((c) => (
              <option key={c}>{c}</option>
            ))}
          </Select>
          <Textarea label="Details" placeholder="Explain your question with context…" value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} />
          <div className="flex justify-end gap-3">
            <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={createThread}>Publish Thread</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
