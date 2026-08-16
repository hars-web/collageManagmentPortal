import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Download, Search, UserPlus } from 'lucide-react';
import { PageHeader, Card, Badge, Input, Button, Modal, Select, Avatar } from '../../components/ui';
import { students, feeRecords } from '../../data/mock';
import { cn, downloadFile, exportCSV } from '../../utils';

const feeTone: Record<string, 'success' | 'accent' | 'danger'> = { paid: 'success', partial: 'accent', unpaid: 'danger' };

const latestFee = (studentId: string): string => {
  const own = feeRecords.filter((f) => f.studentId === studentId);
  if (!own.length) return 'Paid';
  return own[own.length - 1].status;
};

export default function AdminStudents() {
  const [query, setQuery] = useState('');
  const [course, setCourse] = useState('All');
  const [year, setYear] = useState('All');
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', course: 'B.Tech CSE', batch: '2025-29' });

  const courses = ['All', 'B.Tech CSE', 'B.Tech ECE', 'B.Tech Mechanical', 'B.Tech Civil', 'MCA', 'MBA'];
  const batches = ['All', '2025-29', '2024-28', '2023-27', '2022-26'];

  const filtered = students.filter((s) => {
    const q = `${s.name} ${s.rollNumber} ${s.email}`.toLowerCase().includes(query.toLowerCase());
    return q && (course === 'All' || s.program === course) && (year === 'All' || s.batch === year);
  });

  const addStudent = () => {
    if (!form.name || !form.email) return toast.error('Name and email are required');
    toast.success(`${form.name} added to ${form.course} (${form.batch})`);
    setOpen(false);
    setForm({ name: '', email: '', course: 'B.Tech CSE', batch: '2025-29' });
  };

  return (
    <div>
      <PageHeader
        title="Student Records"
        subtitle="7,888 enrolled students across all programs"
        crumbs={[{ label: 'Admin' }, { label: 'Students' }]}
        actions={
          <>
            <button className="btn-outline" onClick={() => exportCSV('students.csv', filtered.map((s) => ({ Name: s.name, Roll: s.rollNumber, Course: s.program, Batch: s.batch, CGPA: s.cgpa })))}>
              <Download className="h-4 w-4" /> Export
            </button>
            <Button onClick={() => setOpen(true)}><UserPlus className="h-4 w-4" /> Add Student</Button>
          </>
        }
      />

      <Card className="mb-4 flex flex-col gap-3 p-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-dark-400" />
          <Input placeholder="Search name, roll, email…" value={query} onChange={(e) => setQuery(e.target.value)} className="pl-10" aria-label="Search" />
        </div>
        <select className="input sm:w-44" value={course} onChange={(e) => setCourse(e.target.value)} aria-label="Course filter">
          {courses.map((c) => <option key={c}>{c}</option>)}
        </select>
        <select className="input sm:w-36" value={year} onChange={(e) => setYear(e.target.value)} aria-label="Batch filter">
          {batches.map((b) => <option key={b}>{b}</option>)}
        </select>
      </Card>

      <Card className="overflow-x-auto p-0">
        <table className="table-base min-w-[860px]">
          <thead>
            <tr>
              <th>Student</th>
              <th>Roll No</th>
              <th>Course</th>
              <th>Batch</th>
              <th>Attendance</th>
              <th>CGPA</th>
              <th>Fee Status</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((s) => (
              <tr key={s.id}>
                <td>
                  <div className="flex items-center gap-3">
                    <Avatar name={s.name} size="sm" />
                    <div>
                      <p className="font-medium">{s.name}</p>
                      <p className="text-xs text-dark-400">{s.email}</p>
                    </div>
                  </div>
                </td>
                <td className="font-mono text-xs">{s.rollNumber}</td>
                <td className="text-sm">{s.program}</td>
                <td className="text-sm">{s.batch}</td>
                <td className={cn('text-sm font-bold', s.attendance >= 80 ? 'text-success' : s.attendance >= 65 ? 'text-accent-500' : 'text-danger')}>{s.attendance}%</td>
                <td className="text-sm font-semibold">{s.cgpa}</td>
                <td>
                  <Badge tone={feeTone[latestFee(s.id)] ?? 'success'} dot>{latestFee(s.id)}</Badge>
                </td>
                <td className="text-right">
                  <div className="flex justify-end gap-1.5">
                    <button className="btn-outline px-2.5 py-1.5 text-xs" onClick={() => downloadFile(`${s.rollNumber}-profile.txt`, `${s.name}\n${s.rollNumber}\n${s.program}\n${s.email}`)}>Profile</button>
                    <button className="btn-primary px-2.5 py-1.5 text-xs" onClick={() => toast.success(`${s.name} updated`)}>Edit</button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && <tr><td colSpan={8} className="p-10 text-center text-sm text-dark-400">No records match.</td></tr>}
          </tbody>
        </table>
      </Card>

      <Modal open={open} onClose={() => setOpen(false)} title="Add New Student" subtitle="Student gets auto-generated credentials by email">
        <div className="space-y-4">
          <Input label="Full Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <Input label="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <div className="grid grid-cols-2 gap-4">
            <Select label="Course" value={form.course} onChange={(e) => setForm({ ...form, course: e.target.value })}>
              {courses.filter((c) => c !== 'All').map((c) => <option key={c}>{c}</option>)}
            </Select>
            <Select label="Batch" value={form.batch} onChange={(e) => setForm({ ...form, batch: e.target.value })}>
              {batches.filter((b) => b !== 'All').map((b) => <option key={b}>{b}</option>)}
            </Select>
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={addStudent}>Create Student</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
