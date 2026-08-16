import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Download, Search, UserPlus } from 'lucide-react';
import { PageHeader, Card, Badge, Input, Button, Modal, Select, Avatar } from '../../components/ui';
import { facultyMembers, departments } from '../../data/mock';
import { exportCSV } from '../../utils';

const deptName = (id: string) => departments.find((d) => d.id === id)?.name ?? '—';

export default function AdminFaculty() {
  const [query, setQuery] = useState('');
  const [dept, setDept] = useState('All');
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', designation: 'Assistant Professor', department: 'Computer Science & Engineering' });

  const depts = ['All', ...departments.map((d) => d.name)];

  const filtered = facultyMembers.filter((f) => {
    const q = `${f.name} ${f.email} ${f.designation}`.toLowerCase().includes(query.toLowerCase());
    return q && (dept === 'All' || deptName(f.departmentId) === dept);
  });

  return (
    <div>
      <PageHeader
        title="Faculty Management"
        subtitle={`${facultyMembers.length} faculty members shown · 240 total`}
        crumbs={[{ label: 'Admin' }, { label: 'Faculty' }]}
        actions={
          <>
            <button className="btn-outline" onClick={() => exportCSV('faculty.csv', filtered.map((f) => ({ Name: f.name, Designation: f.designation, Department: deptName(f.departmentId), Experience: f.experienceYears })))}>
              <Download className="h-4 w-4" /> Export
            </button>
            <Button onClick={() => setOpen(true)}><UserPlus className="h-4 w-4" /> Add Faculty</Button>
          </>
        }
      />

      <Card className="mb-4 flex flex-col gap-3 p-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-dark-400" />
          <Input placeholder="Search name, designation, email…" value={query} onChange={(e) => setQuery(e.target.value)} className="pl-10" aria-label="Search" />
        </div>
        <select className="input sm:w-64" value={dept} onChange={(e) => setDept(e.target.value)} aria-label="Department filter">
          {depts.map((d) => <option key={d}>{d}</option>)}
        </select>
      </Card>

      <Card className="overflow-x-auto p-0">
        <table className="table-base min-w-[860px]">
          <thead>
            <tr>
              <th>Faculty</th>
              <th>Designation</th>
              <th>Department</th>
              <th>Experience</th>
              <th>Rating</th>
              <th>Publications</th>
              <th className="text-center">Status</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((f) => (
              <tr key={f.id}>
                <td>
                  <div className="flex items-center gap-3">
                    <Avatar name={f.name} size="sm" />
                    <div>
                      <p className="font-medium">{f.name}</p>
                      <p className="text-xs text-dark-400">{f.email}</p>
                    </div>
                  </div>
                </td>
                <td className="text-sm">{f.designation}</td>
                <td className="text-sm text-dark-500 dark:text-dark-300">{deptName(f.departmentId)}</td>
                <td className="text-sm">{f.experienceYears} yrs</td>
                <td className="text-sm font-bold text-accent-500">★ {f.rating}</td>
                <td className="text-sm">{f.publications} pubs</td>
                <td className="text-center"><Badge tone="success" dot>Active</Badge></td>
                <td className="text-right">
                  <div className="flex justify-end gap-1.5">
                    <button className="btn-outline px-2.5 py-1.5 text-xs" onClick={() => toast.success('Profile opened')}>View</button>
                    <button className="btn-primary px-2.5 py-1.5 text-xs" onClick={() => toast.success(`${f.name} updated`)}>Edit</button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && <tr><td colSpan={8} className="p-10 text-center text-sm text-dark-400">No faculty match.</td></tr>}
          </tbody>
        </table>
      </Card>

      <Modal open={open} onClose={() => setOpen(false)} title="Add Faculty Member" subtitle="Credentials will be sent to their email">
        <div className="space-y-4">
          <Input label="Full Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <Input label="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <Select label="Designation" value={form.designation} onChange={(e) => setForm({ ...form, designation: e.target.value })}>
            {['Professor', 'Associate Professor', 'Assistant Professor', 'Lab Instructor'].map((d) => <option key={d}>{d}</option>)}
          </Select>
          <Select label="Department" value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })}>
            {depts.filter((d) => d !== 'All').map((d) => <option key={d}>{d}</option>)}
          </Select>
          <div className="flex justify-end gap-3">
            <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={() => { toast.success('Faculty created & invited'); setOpen(false); setForm({ name: '', email: '', designation: 'Assistant Professor', department: 'Computer Science & Engineering' }); }}>Create Faculty</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
