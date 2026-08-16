import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Search } from 'lucide-react';
import { PageHeader, Card, Badge, Input, Modal, Button, Avatar, Select } from '../../components/ui';
import { placements, companies } from '../../data/mock';
import { formatINR } from '../../utils';

export default function AdminPlacements() {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ company: 'Tata Consultancy Services', role: 'SDE-1', ctc: '7.5' });

  const avgCtc = (placements.reduce((s, p) => s + p.ctc, 0) / placements.length).toFixed(1);

  const filtered = placements.filter((p) => `${p.studentName} ${p.company} ${p.role}`.toLowerCase().includes(query.toLowerCase()));

  return (
    <div>
      <PageHeader
        title="Placement Management"
        subtitle="Batch 2025-26 · 89% placed · 1,912 offers"
        crumbs={[{ label: 'Admin' }, { label: 'Placements' }]}
        actions={<Button onClick={() => setOpen(true)}>Add Placement Record</Button>}
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Card className="p-4"><p className="text-xs text-dark-400">Students Placed</p><p className="mt-1 text-2xl font-bold">1,912</p></Card>
        <Card className="p-4"><p className="text-xs text-dark-400">Avg. Package</p><p className="mt-1 text-2xl font-bold text-primary-600 dark:text-primary-400">₹{avgCtc} LPA</p></Card>
        <Card className="p-4"><p className="text-xs text-dark-400">Highest Package</p><p className="mt-1 text-2xl font-bold text-accent-500">₹62 LPA</p></Card>
        <Card className="p-4"><p className="text-xs text-dark-400">Active Recruiters</p><p className="mt-1 text-2xl font-bold text-secondary-600 dark:text-secondary-400">{companies.length}+</p></Card>
      </div>

      <Card className="my-4 flex flex-col gap-3 p-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-dark-400" />
          <Input placeholder="Search student, company, role…" value={query} onChange={(e) => setQuery(e.target.value)} className="pl-10" aria-label="Search" />
        </div>
        <Badge tone="neutral">{filtered.length} records</Badge>
      </Card>

      <Card className="overflow-x-auto p-0">
        <table className="table-base min-w-[840px]">
          <thead>
            <tr>
              <th>Student</th>
              <th>Company</th>
              <th>Role</th>
              <th>Package</th>
              <th>Date</th>
              <th className="text-center">Status</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id}>
                <td>
                  <div className="flex items-center gap-3">
                    <Avatar name={p.studentName} size="sm" />
                    <div>
                      <p className="font-medium">{p.studentName}</p>
                      <p className="text-xs text-dark-400">{p.rollNumber}</p>
                    </div>
                  </div>
                </td>
                <td className="text-sm font-medium">{p.company}</td>
                <td className="text-sm text-dark-500 dark:text-dark-300">{p.role}</td>
                <td className="text-sm font-bold text-success">{formatINR(p.ctc)}</td>
                <td className="text-sm text-dark-500 dark:text-dark-300">{p.date}</td>
                <td className="text-center"><Badge tone={p.status === 'Offered' ? 'success' : p.status === 'Interview' ? 'primary' : 'accent'} dot>{p.status}</Badge></td>
                <td className="text-right">
                  <div className="flex justify-end gap-1.5">
                    <button className="btn-outline px-2.5 py-1.5 text-xs" onClick={() => toast.success('Offer letter opened')}>Offer Letter</button>
                    <button className="btn-primary px-2.5 py-1.5 text-xs" onClick={() => toast.success('Record updated')}>Edit</button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && <tr><td colSpan={7} className="p-10 text-center text-sm text-dark-400">No placement records match.</td></tr>}
          </tbody>
        </table>
      </Card>

      <Modal open={open} onClose={() => setOpen(false)} title="Add Placement Record" subtitle="Link to the student's profile">
        <div className="space-y-4">
          <Input label="Student" placeholder="Start typing name…" />
          <div className="grid grid-cols-2 gap-4">
            <Select label="Company" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })}>
              {companies.map((c) => <option key={c.name}>{c.name}</option>)}
            </Select>
            <Input label="Role" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} />
          </div>
          <Input label="CTC (₹ LPA)" type="number" step="0.5" value={form.ctc} onChange={(e) => setForm({ ...form, ctc: e.target.value })} />
          <div className="flex justify-end gap-3">
            <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={() => { toast.success(`Student placed at ${form.company} — ₹${form.ctc} LPA`); setOpen(false); }}>Save Placement</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
