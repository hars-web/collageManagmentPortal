import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Search } from 'lucide-react';
import { PageHeader, Card, Badge, Button, Modal, Input, Select, Avatar } from '../../components/ui';
import { results, students } from '../../data/mock';
import { cn } from '../../utils';

export default function AdminResults() {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ exam: 'Mid-Term 2', subject: 'Machine Learning', minMarks: '40' });
  const studentOf = (id: string) => students.find((s) => s.id === id);

  const filtered = results.filter((r) => `${studentOf(r.studentId)?.name ?? ''} ${studentOf(r.studentId)?.rollNumber ?? ''} ${r.subjectName}`.toLowerCase().includes(query.toLowerCase()));
  const passRate = Math.round((results.filter((r) => r.result === 'PASS').length / results.length) * 100);

  return (
    <div>
      <PageHeader
        title="Results & Evaluation"
        subtitle="Publish, revoke and analyse exam results"
        crumbs={[{ label: 'Admin' }, { label: 'Results' }]}
        actions={<Button onClick={() => setOpen(true)}>Publish New Result</Button>}
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Card className="p-4"><p className="text-xs text-dark-400">Pass Rate</p><p className="mt-1 text-2xl font-bold text-success">{passRate}%</p></Card>
        <Card className="p-4"><p className="text-xs text-dark-400">Total Results</p><p className="mt-1 text-2xl font-bold">{results.length}</p></Card>
        <Card className="p-4"><p className="text-xs text-dark-400">Pending Moderation</p><p className="mt-1 text-2xl font-bold text-accent-500">3</p></Card>
        <Card className="p-4"><p className="text-xs text-dark-400">Revaluation Requests</p><p className="mt-1 text-2xl font-bold text-primary-600 dark:text-primary-400">12</p></Card>
      </div>

      <Card className="my-4 flex flex-col gap-3 p-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-dark-400" />
          <Input placeholder="Search student, roll or exam…" value={query} onChange={(e) => setQuery(e.target.value)} className="pl-10" aria-label="Search" />
        </div>
        <Badge tone="neutral">{filtered.length} rows</Badge>
      </Card>

      <Card className="overflow-x-auto p-0">
        <table className="table-base min-w-[820px]">
          <thead>
            <tr>
              <th>Student</th>
              <th>Roll No</th>
              <th>Exam</th>
              <th>Subject</th>
              <th>Marks</th>
              <th className="text-center">Grade</th>
              <th className="text-center">Status</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => (
              <tr key={r.id}>
                <td>
                  <div className="flex items-center gap-3">
                    <Avatar name={studentOf(r.studentId)?.name ?? 'Student'} size="sm" />
                    <p className="font-medium">{studentOf(r.studentId)?.name ?? '—'}</p>
                  </div>
                </td>
                <td className="font-mono text-xs">{studentOf(r.studentId)?.rollNumber ?? '—'}</td>
                <td className="text-sm">Semester {r.semester}</td>
                <td className="text-sm text-dark-500 dark:text-dark-300">{r.subjectCode}</td>
                <td className={cn('text-sm font-bold', r.totalMarks >= 80 ? 'text-success' : r.totalMarks >= 40 ? 'text-dark-600 dark:text-dark-200' : 'text-danger')}>{r.totalMarks}/100</td>
                <td className="text-center"><Badge tone={r.grade.startsWith('A') ? 'success' : r.grade.startsWith('B') ? 'primary' : r.grade === 'C' ? 'accent' : 'danger'}>{r.grade}</Badge></td>
                <td className="text-center"><Badge tone="success" dot>Published</Badge></td>
                <td className="text-right">
                  <div className="flex justify-end gap-1.5">
                    <button className="btn-outline px-2.5 py-1.5 text-xs" onClick={() => toast.success('Result sheet opened')}>View</button>
                    <button className="btn-primary px-2.5 py-1.5 text-xs" onClick={() => toast.success('Result updated')}>Edit</button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && <tr><td colSpan={8} className="p-10 text-center text-sm text-dark-400">No results match.</td></tr>}
          </tbody>
        </table>
      </Card>

      <Modal open={open} onClose={() => setOpen(false)} title="Publish Results" subtitle="CSV upload or manual entry">
        <div className="space-y-4">
          <Select label="Exam" value={form.exam} onChange={(e) => setForm({ ...form, exam: e.target.value })}>
            {['Mid-Term 1', 'Mid-Term 2', 'End-Semester', 'Practical'].map((e) => <option key={e}>{e}</option>)}
          </Select>
          <div className="grid grid-cols-2 gap-4">
            <Select label="Subject" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}>
              {['Machine Learning', 'Data Structures', 'Operating Systems', 'DBMS', 'Computer Networks'].map((s) => <option key={s}>{s}</option>)}
            </Select>
            <Input label="Pass Mark (%)" type="number" value={form.minMarks} onChange={(e) => setForm({ ...form, minMarks: e.target.value })} />
          </div>
          <label className="flex cursor-pointer flex-col items-center gap-1.5 rounded-2xl border-2 border-dashed border-dark-200 p-5 text-center hover:border-primary-400 dark:border-dark-700">
            <span className="text-sm font-semibold">Upload marks CSV</span>
            <span className="text-xs text-dark-400">roll_number, marks · max 2 MB</span>
            <input type="file" className="hidden" onChange={() => toast.success('CSV uploaded & validated')} />
          </label>
          <div className="flex justify-end gap-3">
            <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={() => { toast.success('Results published to student portal'); setOpen(false); }}>Publish</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
