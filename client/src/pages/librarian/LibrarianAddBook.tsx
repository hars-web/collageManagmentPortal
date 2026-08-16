import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { BookOpen, CheckCircle2 } from 'lucide-react';
import { PageHeader, Card, Button, Input, Select, Textarea } from '../../components/ui';

export default function LibrarianAddBook() {
  const [form, setForm] = useState({ title: '', author: '', isbn: '', category: 'Computer Science', copies: '2', publisher: '', year: '2026', description: '' });
  const [added, setAdded] = useState(false);

  const submit = () => {
    if (!form.title || !form.author || !form.isbn) return toast.error('Title, author and ISBN are required');
    setAdded(true);
    toast.success('Book added to catalogue — barcode generated');
  };

  return (
    <div>
      <PageHeader
        title="Add New Book"
        subtitle="Catalogue entry with auto-barcode"
        crumbs={[{ label: 'Library' }, { label: 'Add Book' }]}
      />

      {added ? (
        <Card className="mx-auto max-w-xl p-10 text-center">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success/10 text-success"><CheckCircle2 className="h-8 w-8" /></span>
          <h3 className="mt-4 text-lg font-bold">Book added successfully</h3>
          <p className="mt-1 text-sm text-dark-400">"{form.title}" · {form.copies} copies · shelf A-{form.isbn.slice(-4)}</p>
          <div className="mt-6 flex justify-center gap-3">
            <Button variant="outline" onClick={() => { setAdded(false); setForm({ title: '', author: '', isbn: '', category: 'Computer Science', copies: '2', publisher: '', year: '2026', description: '' }); }}>Add Another</Button>
            <Button onClick={() => toast.success('Barcode label printed')}>Print Barcode</Button>
          </div>
        </Card>
      ) : (
        <Card className="mx-auto max-w-2xl p-6">
          <h3 className="mb-1 flex items-center gap-2 text-base font-semibold"><BookOpen className="h-4 w-4 text-primary-500" /> Book Details</h3>
          <p className="mb-5 text-xs text-dark-400">Fields marked * are required</p>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="label sm:col-span-2">Title *<Input placeholder="e.g. Deep Learning with PyTorch" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></label>
            <label className="label">Author *<Input placeholder="Eli Stevens" value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} /></label>
            <label className="label">ISBN *<Input placeholder="978-1617295263" value={form.isbn} onChange={(e) => setForm({ ...form, isbn: e.target.value })} /></label>
            <label className="label">Category
              <Select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                {['Computer Science', 'Engineering', 'Management', 'Literature'].map((c) => <option key={c}>{c}</option>)}
              </Select>
            </label>
            <label className="label">Copies<input type="number" className="input" value={form.copies} onChange={(e) => setForm({ ...form, copies: e.target.value })} /></label>
            <label className="label">Publisher<input className="input" placeholder="Manning" value={form.publisher} onChange={(e) => setForm({ ...form, publisher: e.target.value })} /></label>
            <label className="label">Year<input type="number" className="input" value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} /></label>
            <label className="label sm:col-span-2">Description<Textarea rows={3} placeholder="Brief synopsis…" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></label>
          </div>
          <div className="mt-6 flex justify-end gap-3">
            <Button variant="ghost" onClick={() => toast.success('Form cleared')}>Clear</Button>
            <Button onClick={submit}>Add to Catalogue</Button>
          </div>
        </Card>
      )}
    </div>
  );
}
