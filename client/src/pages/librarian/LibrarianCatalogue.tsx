import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { BookOpen, Download, Plus, Search } from 'lucide-react';
import { PageHeader, Card, Badge, Input, Button, Modal, Select } from '../../components/ui';
import { libraryBooks } from '../../data/mock';
import { cn, exportCSV } from '../../utils';

export default function LibrarianCatalogue() {
  const [query, setQuery] = useState('');
  const [cat, setCat] = useState('All');
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ title: '', author: '', isbn: '', category: 'Computer Science', copies: '2' });

  const cats = ['All', 'Computer Science', 'Engineering', 'Management', 'Literature'];

  const filtered = libraryBooks.filter((b) => {
    const q = `${b.title} ${b.author} ${b.category}`.toLowerCase().includes(query.toLowerCase());
    return q && (cat === 'All' || b.category === cat);
  });

  return (
    <div>
      <PageHeader
        title="Catalogue"
        subtitle="48,520 titles · search, edit and add books"
        crumbs={[{ label: 'Library' }, { label: 'Catalogue' }]}
        actions={
          <>
            <button className="btn-outline" onClick={() => exportCSV('catalogue.csv', filtered.map((b) => ({ Title: b.title, Author: b.author, Category: b.category, Copies: b.copies })))}>
              <Download className="h-4 w-4" /> Export
            </button>
            <Button onClick={() => setOpen(true)}><Plus className="h-4 w-4" /> Add Book</Button>
          </>
        }
      />

      <Card className="mb-4 flex flex-col gap-3 p-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-dark-400" />
          <Input placeholder="Search title, author or ISBN…" value={query} onChange={(e) => setQuery(e.target.value)} className="pl-10" aria-label="Search" />
        </div>
        <select className="input sm:w-48" value={cat} onChange={(e) => setCat(e.target.value)} aria-label="Category filter">
          {cats.map((c) => <option key={c}>{c}</option>)}
        </select>
      </Card>

      <Card className="overflow-x-auto p-0">
        <table className="table-base min-w-[860px]">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Category</th>
              <th>ISBN</th>
              <th>Copies</th>
              <th>Available</th>
              <th className="text-center">Shelf</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((b) => (
              <tr key={b.id}>
                <td className="max-w-[240px] truncate text-sm font-medium">{b.title}</td>
                <td className="text-sm text-dark-500 dark:text-dark-300">{b.author}</td>
                <td><Badge tone="neutral">{b.category}</Badge></td>
                <td className="font-mono text-xs text-dark-400">{b.isbn ?? '978-81-8450-24x-x'}</td>
                <td className="text-sm">{b.copies}</td>
                <td className={cn('text-sm font-bold', b.available > 0 ? 'text-success' : 'text-danger')}>{b.available}</td>
                <td className="text-center text-xs text-dark-400">A-{b.id.replace(/\D/g, '')?.padStart(2, '0')}</td>
                <td className="text-right">
                  <div className="flex justify-end gap-1.5">
                    <button className="btn-outline px-2.5 py-1.5 text-xs" onClick={() => toast.success('Book details opened')}>View</button>
                    <button className="btn-primary px-2.5 py-1.5 text-xs" onClick={() => toast.success('Stock updated')}>Edit</button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && <tr><td colSpan={8} className="p-10 text-center text-sm text-dark-400">No books match.</td></tr>}
          </tbody>
        </table>
      </Card>

      <Modal open={open} onClose={() => setOpen(false)} title="Add Book to Catalogue" subtitle="Generates barcode label automatically">
        <div className="space-y-4">
          <Input label="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Author" value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} />
            <Input label="ISBN" value={form.isbn} onChange={(e) => setForm({ ...form, isbn: e.target.value })} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Select label="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
              {cats.filter((c) => c !== 'All').map((c) => <option key={c}>{c}</option>)}
            </Select>
            <Input label="Copies" type="number" value={form.copies} onChange={(e) => setForm({ ...form, copies: e.target.value })} />
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={() => { if (!form.title || !form.author) return toast.error('Title and author required'); toast.success(`"${form.title}" added — ${form.copies} copies`); setOpen(false); setForm({ title: '', author: '', isbn: '', category: 'Computer Science', copies: '2' }); }}>Add to Catalogue</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
