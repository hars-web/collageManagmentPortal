import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Search, UserPlus } from 'lucide-react';
import { PageHeader, Card, Badge, Input, Button, Modal, Select, Avatar } from '../../components/ui';
import { students, facultyMembers } from '../../data/mock';
import { cn } from '../../utils';

export default function LibrarianMembers() {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', type: 'Student' });

  const members = [
    ...students.slice(0, 8).map((s) => ({ id: s.id, name: s.name, email: s.email, type: 'Student', books: 2, fines: 0, active: true })),
    ...facultyMembers.slice(0, 2).map((f) => ({ id: f.id, name: f.name, email: f.email, type: 'Faculty', books: 4, fines: 0, active: true })),
  ];

  const filtered = members.filter((m) => `${m.name} ${m.email}`.toLowerCase().includes(query.toLowerCase()));

  return (
    <div>
      <PageHeader
        title="Library Members"
        subtitle="9,420 active members · 86 new this month"
        crumbs={[{ label: 'Library' }, { label: 'Members' }]}
        actions={<Button onClick={() => setOpen(true)}><UserPlus className="h-4 w-4" /> Register Member</Button>}
      />

      <Card className="mb-4 flex flex-col gap-3 p-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-dark-400" />
          <Input placeholder="Search member name or ID…" value={query} onChange={(e) => setQuery(e.target.value)} className="pl-10" aria-label="Search" />
        </div>
        <Badge tone="neutral">{filtered.length} members</Badge>
      </Card>

      <Card className="overflow-x-auto p-0">
        <table className="table-base min-w-[800px]">
          <thead>
            <tr>
              <th>Member</th>
              <th>Type</th>
              <th>Books Issued</th>
              <th>Fines</th>
              <th className="text-center">Status</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((m) => (
              <tr key={m.id}>
                <td>
                  <div className="flex items-center gap-3">
                    <Avatar name={m.name} size="sm" />
                    <div>
                      <p className="font-medium">{m.name}</p>
                      <p className="text-xs text-dark-400">{m.email}</p>
                    </div>
                  </div>
                </td>
                <td><Badge tone={m.type === 'Faculty' ? 'primary' : 'neutral'}>{m.type}</Badge></td>
                <td className="text-sm font-semibold">{m.books}</td>
                <td className={cn('text-sm font-semibold', m.fines > 0 ? 'text-danger' : 'text-dark-300')}>{m.fines > 0 ? `₹${m.fines}` : '—'}</td>
                <td className="text-center"><Badge tone="success" dot>Active</Badge></td>
                <td className="text-right">
                  <div className="flex justify-end gap-1.5">
                    <button className="btn-outline px-2.5 py-1.5 text-xs" onClick={() => toast.success(`${m.name}'s loans opened`)}>Loans</button>
                    <button className="btn-primary px-2.5 py-1.5 text-xs" onClick={() => toast.success('Member card regenerated')}>Card</button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && <tr><td colSpan={6} className="p-10 text-center text-sm text-dark-400">No members match.</td></tr>}
          </tbody>
        </table>
      </Card>

      <Modal open={open} onClose={() => setOpen(false)} title="Register Member" subtitle="Library ID auto-generated">
        <div className="space-y-4">
          <Input label="Full Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <Input label="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <Select label="Member Type" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
            {['Student', 'Faculty', 'Staff', 'Alumni'].map((t) => <option key={t}>{t}</option>)}
          </Select>
          <div className="flex justify-end gap-3">
            <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={() => { if (!form.name || !form.email) return toast.error('Name and email required'); toast.success(`${form.name} registered as ${form.type}`); setOpen(false); setForm({ name: '', email: '', type: 'Student' }); }}>Register</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
