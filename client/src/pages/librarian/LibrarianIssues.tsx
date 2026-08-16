import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { BookOpen, Search } from 'lucide-react';
import { PageHeader, Card, Badge, Input, Button, Modal } from '../../components/ui';
import { issueRecords } from '../../data/mock';
import { cn } from '../../utils';

export default function LibrarianIssues() {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('All');
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ bookId: '', member: '' });

  const statuses = ['All', 'Issued', 'Overdue', 'Returned'];

  const filtered = issueRecords.filter((r) => {
    const q = `${r.bookTitle} ${r.memberName}`.toLowerCase().includes(query.toLowerCase());
    return q && (status === 'All' || r.status === status);
  });

  const renew = (id: string) => {
    toast.success('Loan renewed for 7 more days');
  };

  return (
    <div>
      <PageHeader
        title="Issues & Returns"
        subtitle="Track loans, renewals and fines"
        crumbs={[{ label: 'Library' }, { label: 'Issues' }]}
        actions={
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setOpen(true)}>Manual Entry</Button>
            <Button onClick={() => toast.success('Overdue reminders sent to 27 members')}>Send Overdue Reminders</Button>
          </div>
        }
      />

      <Card className="mb-4 flex flex-col gap-3 p-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-dark-400" />
          <Input placeholder="Search book or member…" value={query} onChange={(e) => setQuery(e.target.value)} className="pl-10" aria-label="Search" />
        </div>
        <select className="input sm:w-40" value={status} onChange={(e) => setStatus(e.target.value)} aria-label="Status filter">
          {statuses.map((s) => <option key={s}>{s}</option>)}
        </select>
      </Card>

      <Card className="overflow-x-auto p-0">
        <table className="table-base min-w-[860px]">
          <thead>
            <tr>
              <th>Book</th>
              <th>Member</th>
              <th>Issued</th>
              <th>Due</th>
              <th>Fine</th>
              <th className="text-center">Status</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => (
              <tr key={r.id}>
                <td className="max-w-[220px] truncate text-sm font-medium">{r.bookTitle}</td>
                <td className="text-sm text-dark-500 dark:text-dark-300">{r.memberName}</td>
                <td className="text-xs text-dark-400">{r.issueDate}</td>
                <td className={cn('text-xs font-semibold', r.status === 'Overdue' ? 'text-danger' : 'text-dark-400')}>{r.dueDate}</td>
                <td className="text-xs font-bold text-danger">{r.fine > 0 ? `₹${r.fine}` : '—'}</td>
                <td className="text-center"><Badge tone={r.status === 'Issued' ? 'primary' : r.status === 'Overdue' ? 'danger' : 'success'} dot>{r.status}</Badge></td>
                <td className="text-right">
                  <div className="flex justify-end gap-1.5">
                    {r.status !== 'Returned' && (
                      <>
                        <button className="btn-outline px-2.5 py-1.5 text-xs" onClick={() => renew(r.id)}>Renew</button>
                        <button className="btn-primary px-2.5 py-1.5 text-xs" onClick={() => toast.success(`"${r.bookTitle}" returned`)}>Return</button>
                      </>
                    )}
                    {r.status === 'Overdue' && <button className="btn-outline px-2.5 py-1.5 text-xs text-danger" onClick={() => toast.success(`Fine ₹${r.fine} collected`)}>Collect Fine</button>}
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && <tr><td colSpan={7} className="p-10 text-center text-sm text-dark-400">No loan records match.</td></tr>}
          </tbody>
        </table>
      </Card>

      <Modal open={open} onClose={() => setOpen(false)} title="Manual Loan Entry" subtitle="For walk-ins without barcode scan">
        <div className="space-y-4">
          <Input label="Book ID / Title" value={form.bookId} onChange={(e) => setForm({ ...form, bookId: e.target.value })} />
          <Input label="Member ID / Name" value={form.member} onChange={(e) => setForm({ ...form, member: e.target.value })} />
          <div className="flex justify-end gap-3">
            <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={() => { if (!form.bookId || !form.member) return toast.error('Both fields required'); toast.success('Loan recorded'); setOpen(false); setForm({ bookId: '', member: '' }); }}>Record Loan</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
