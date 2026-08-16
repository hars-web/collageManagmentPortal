import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { BookOpen, Search } from 'lucide-react';
import { PageHeader, Card, Badge, Button, Modal, Input, Select } from '../../components/ui';
import { libraryBooks, issueRecords } from '../../data/mock';

export default function AdminLibrary() {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ title: '', author: '', category: 'Computer Science', copies: '3' });

  const issued = issueRecords.filter((i) => i.status === 'Issued').length;

  const filtered = libraryBooks.filter((b) => `${b.title} ${b.author} ${b.category}`.toLowerCase().includes(query.toLowerCase()));

  return (
    <div>
      <PageHeader
        title="Library Management"
        subtitle="48,520 titles · 96,300 copies in circulation"
        crumbs={[{ label: 'Admin' }, { label: 'Library' }]}
        actions={<Button onClick={() => setOpen(true)}><BookOpen className="h-4 w-4" /> Add Book</Button>}
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Card className="p-4"><p className="text-xs text-dark-400">Total Titles</p><p className="mt-1 text-2xl font-bold">48,520</p></Card>
        <Card className="p-4"><p className="text-xs text-dark-400">Books Issued</p><p className="mt-1 text-2xl font-bold text-primary-600 dark:text-primary-400">{issued}</p></Card>
        <Card className="p-4"><p className="text-xs text-dark-400">Overdue</p><p className="mt-1 text-2xl font-bold text-danger">27</p></Card>
        <Card className="p-4"><p className="text-xs text-dark-400">E-Resources</p><p className="mt-1 text-2xl font-bold text-secondary-600 dark:text-secondary-400">12,400</p></Card>
      </div>

      <Card className="my-4 flex flex-col gap-3 p-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-dark-400" />
          <Input placeholder="Search title, author, category…" value={query} onChange={(e) => setQuery(e.target.value)} className="pl-10" aria-label="Search" />
        </div>
        <select className="input sm:w-48" aria-label="Category filter">
          {['All Categories', 'Computer Science', 'Engineering', 'Management', 'Literature'].map((c) => <option key={c}>{c}</option>)}
        </select>
      </Card>

      <Card className="overflow-x-auto p-0">
        <table className="table-base min-w-[820px]">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Category</th>
              <th>Copies</th>
              <th>Available</th>
              <th className="text-center">Status</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((b) => (
              <tr key={b.id}>
                <td className="max-w-[240px] truncate text-sm font-medium">{b.title}</td>
                <td className="text-sm text-dark-500 dark:text-dark-300">{b.author}</td>
                <td><Badge tone="neutral">{b.category}</Badge></td>
                <td className="text-sm">{b.copies}</td>
                <td className="text-sm font-bold">{b.available}</td>
                <td className="text-center"><Badge tone={b.available > 0 ? 'success' : 'danger'} dot>{b.available > 0 ? 'In Stock' : 'Out'}</Badge></td>
                <td className="text-right">
                  <div className="flex justify-end gap-1.5">
                    <button className="btn-outline px-2.5 py-1.5 text-xs" onClick={() => toast.success('Book details opened')}>View</button>
                    <button className="btn-primary px-2.5 py-1.5 text-xs" onClick={() => toast.success('Stock updated')}>Edit</button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && <tr><td colSpan={7} className="p-10 text-center text-sm text-dark-400">No books match.</td></tr>}
          </tbody>
        </table>
      </Card>

      <Modal open={open} onClose={() => setOpen(false)} title="Add Book" subtitle="Adds to the central catalogue">
        <div className="space-y-4">
          <Input label="Title" placeholder="e.g. Hands-On Machine Learning" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <Input label="Author" placeholder="Aurélien Géron" value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} />
          <div className="grid grid-cols-2 gap-4">
            <Select label="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
              {['Computer Science', 'Engineering', 'Management', 'Literature'].map((c) => <option key={c}>{c}</option>)}
            </Select>
            <Input label="Copies" type="number" value={form.copies} onChange={(e) => setForm({ ...form, copies: e.target.value })} />
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={() => { if (!form.title || !form.author) return toast.error('Title and author required'); toast.success(`${form.title} added with ${form.copies} copies`); setOpen(false); setForm({ title: '', author: '', category: 'Computer Science', copies: '3' }); }}>Add to Catalogue</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
