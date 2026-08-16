import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { BookOpen, BookMarked, CalendarCheck2, Search } from 'lucide-react';
import { PageHeader, Card, Badge, Input, Modal, Button, Select } from '../../components/ui';
import { libraryBooks, issueRecords } from '../../data/mock';
import { cn, timeAgo } from '../../utils';

export default function LibrarianDashboard() {
  const [query, setQuery] = useState('');
  const [issueOpen, setIssueOpen] = useState(false);
  const [returnOpen, setReturnOpen] = useState(false);
  const [form, setForm] = useState({ bookTitle: '', member: '', bookId: '' });

  const issued = issueRecords.filter((i) => i.status === 'Issued');
  const overdue = issueRecords.filter((i) => i.status === 'Overdue');

  const filtered = libraryBooks.filter((b) => `${b.title} ${b.author} ${b.category}`.toLowerCase().includes(query.toLowerCase()));

  return (
    <div>
      <PageHeader
        title="Library Dashboard"
        subtitle="Central library · 8:00 AM – 10:00 PM · 320 seats"
        crumbs={[{ label: 'Library' }, { label: 'Dashboard' }]}
        actions={
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setIssueOpen(true)}><BookMarked className="h-4 w-4" /> Issue</Button>
            <Button onClick={() => setReturnOpen(true)}><CalendarCheck2 className="h-4 w-4" /> Return</Button>
          </div>
        }
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Card className="p-4"><p className="text-xs text-dark-400">Books Issued Now</p><p className="mt-1 text-2xl font-bold text-primary-600 dark:text-primary-400">{issued.length}</p></Card>
        <Card className="p-4"><p className="text-xs text-dark-400">Overdue</p><p className="mt-1 text-2xl font-bold text-danger">{overdue.length}</p></Card>
        <Card className="p-4"><p className="text-xs text-dark-400">Due Today</p><p className="mt-1 text-2xl font-bold text-accent-500">14</p></Card>
        <Card className="p-4"><p className="text-xs text-dark-400">Seats Occupied</p><p className="mt-1 text-2xl font-bold text-success">276/320</p></Card>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card className="mb-4 flex flex-col gap-3 p-4 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-dark-400" />
              <Input placeholder="Search catalogue — title, author, ISBN…" value={query} onChange={(e) => setQuery(e.target.value)} className="pl-10" aria-label="Search" />
            </div>
            <Badge tone="neutral">{filtered.length} results</Badge>
          </Card>
          <Card className="overflow-x-auto p-0">
            <table className="table-base min-w-[760px]">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Copies</th>
                  <th>Available</th>
                  <th className="text-center">Status</th>
                  <th className="text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.slice(0, 8).map((b) => (
                  <tr key={b.id}>
                    <td className="max-w-[240px] truncate text-sm font-medium">{b.title}</td>
                    <td className="text-sm text-dark-500 dark:text-dark-300">{b.author}</td>
                    <td className="text-sm">{b.copies}</td>
                    <td className={cn('text-sm font-bold', b.available > 0 ? 'text-success' : 'text-danger')}>{b.available}</td>
                    <td className="text-center"><Badge tone={b.available > 0 ? 'success' : 'danger'} dot>{b.available > 0 ? 'In Stock' : 'Issued Out'}</Badge></td>
                    <td className="text-right">
                      <button
                        className="btn-primary px-3 py-1.5 text-xs disabled:opacity-40"
                        disabled={b.available === 0}
                        onClick={() => { setForm({ bookTitle: b.title, member: '', bookId: b.id }); setIssueOpen(true); }}
                      >
                        Issue
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="p-5">
            <h3 className="text-base font-semibold">Active Loans</h3>
            <div className="mt-4 space-y-3">
              {issueRecords.map((r) => (
                <div key={r.id} className="flex items-center gap-3 rounded-xl border border-dark-100 p-3 dark:border-dark-800">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400"><BookOpen className="h-4 w-4" /></span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{r.bookTitle}</p>
                    <p className="text-[11px] text-dark-400">{r.memberName} · due {r.dueDate}</p>
                  </div>
                  <Badge tone={r.status === 'Issued' ? 'primary' : 'danger'} dot>{r.status}</Badge>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-5">
            <h3 className="text-base font-semibold">Daily Stats</h3>
            <div className="mt-3 space-y-2.5 text-sm">
              <div className="flex justify-between rounded-xl bg-dark-50 p-3 dark:bg-dark-800"><span className="text-dark-400">Visitors today</span><b>1,204</b></div>
              <div className="flex justify-between rounded-xl bg-dark-50 p-3 dark:bg-dark-800"><span className="text-dark-400">New members (30d)</span><b className="text-success">+86</b></div>
              <div className="flex justify-between rounded-xl bg-dark-50 p-3 dark:bg-dark-800"><span className="text-dark-400">E-journals accessed</span><b>2,410</b></div>
              <div className="flex justify-between rounded-xl bg-dark-50 p-3 dark:bg-dark-800"><span className="text-dark-400">Fines collected (Jul)</span><b>₹4,850</b></div>
            </div>
          </Card>
        </div>
      </div>

      <Modal open={issueOpen} onClose={() => setIssueOpen(false)} title="Issue Book" subtitle={form.bookTitle}>
        <div className="space-y-4">
          <Input label="Member (Student ID / Employee ID)" list="members-list" placeholder="Scan or type ID…" value={form.member} onChange={(e) => setForm({ ...form, member: e.target.value })} />
          <datalist id="members-list">
            {issueRecords.map((r) => <option key={r.id} value={r.memberName} />)}
          </datalist>
          <Select label="Loan Period">
            <option>7 days</option>
            <option>14 days</option>
            <option>30 days (faculty)</option>
          </Select>
          <div className="flex justify-end gap-3">
            <Button variant="ghost" onClick={() => setIssueOpen(false)}>Cancel</Button>
            <Button onClick={() => { if (!form.member) return toast.error('Scan the member ID'); toast.success(`"${form.bookTitle || 'Book'}" issued to ${form.member}`); setIssueOpen(false); setForm({ bookTitle: '', member: '', bookId: '' }); }}>Confirm Issue</Button>
          </div>
        </div>
      </Modal>

      <Modal open={returnOpen} onClose={() => setReturnOpen(false)} title="Return Book" subtitle="Scans the book ID to close the loan">
        <div className="space-y-4">
          <Input label="Book Barcode / ID" value={form.bookId} onChange={(e) => setForm({ ...form, bookId: e.target.value })} />
          {form.bookId && (
            <div className="rounded-xl bg-dark-50 p-3 text-sm dark:bg-dark-800">
              <p className="font-semibold">{issueRecords[0].bookTitle}</p>
              <p className="mt-0.5 text-xs text-dark-400">Borrowed by {issueRecords[0].memberName} · due {timeAgo(issueRecords[0].issueDate)}</p>
              <p className="mt-1 text-xs text-success">On time — no fine</p>
            </div>
          )}
          <div className="flex justify-end gap-3">
            <Button variant="ghost" onClick={() => setReturnOpen(false)}>Cancel</Button>
            <Button onClick={() => { if (!form.bookId) return toast.error('Scan the book ID'); toast.success('Book returned — stock updated'); setReturnOpen(false); setForm({ ...form, bookId: '' }); }}>Process Return</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
