import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { BookOpen, Search } from 'lucide-react';
import { PageHeader, Card, Badge, Input, Button, Modal, Select } from '../../components/ui';
import { subjects, facultyMembers } from '../../data/mock';

const semesters = [1, 2, 3, 4, 5, 6, 7, 8];

export default function AdminSubjects() {
  const [query, setQuery] = useState('');
  const [sem, setSem] = useState('All');
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: '', code: '', semester: '5', credits: '4', type: 'Theory' });

  const filtered = subjects.filter((s) => {
    const q = `${s.name} ${s.code}`.toLowerCase().includes(query.toLowerCase());
    return q && (sem === 'All' || s.semester === Number(sem));
  });

  return (
    <div>
      <PageHeader
        title="Subjects & Curriculum"
        subtitle="All subjects across departments and semesters"
        crumbs={[{ label: 'Admin' }, { label: 'Subjects' }]}
        actions={<Button onClick={() => setOpen(true)}><BookOpen className="h-4 w-4" /> New Subject</Button>}
      />

      <Card className="mb-4 flex flex-col gap-3 p-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-dark-400" />
          <Input placeholder="Search subject name or code…" value={query} onChange={(e) => setQuery(e.target.value)} className="pl-10" aria-label="Search" />
        </div>
        <select className="input sm:w-40" value={sem} onChange={(e) => setSem(e.target.value)} aria-label="Semester filter">
          <option>All</option>
          {semesters.map((s) => <option key={s}>Sem {s}</option>)}
        </select>
      </Card>

      <Card className="overflow-x-auto p-0">
        <table className="table-base min-w-[760px]">
          <thead>
            <tr>
              <th>Code</th>
              <th>Subject</th>
              <th>Type</th>
              <th>Credits</th>
              <th>Semester</th>
              <th>Faculty</th>
              <th className="text-center">Status</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((s) => (
              <tr key={s.id}>
                <td className="font-mono text-xs font-bold text-primary-600 dark:text-primary-400">{s.code}</td>
                <td className="text-sm font-medium">{s.name}</td>
                <td><Badge tone={s.category === 'lab' ? 'secondary' : s.category === 'elective' ? 'accent' : 'neutral'}>{s.category}</Badge></td>
                <td className="text-sm">{s.credits}</td>
                <td className="text-sm">Sem {s.semester}</td>
                <td className="text-sm text-dark-500 dark:text-dark-300">{facultyMembers.find((f) => f.id === s.facultyId)?.name ?? '—'}</td>
                <td className="text-center"><Badge tone="success" dot>Active</Badge></td>
                <td className="text-right">
                  <div className="flex justify-end gap-1.5">
                    <button className="btn-outline px-2.5 py-1.5 text-xs" onClick={() => toast.success('Subject syllabus opened')}>Syllabus</button>
                    <button className="btn-primary px-2.5 py-1.5 text-xs" onClick={() => toast.success(`${s.name} updated`)}>Edit</button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && <tr><td colSpan={8} className="p-10 text-center text-sm text-dark-400">No subjects match.</td></tr>}
          </tbody>
        </table>
      </Card>

      <Modal open={open} onClose={() => setOpen(false)} title="Create Subject" subtitle="Attach to a course & assign a faculty member">
        <div className="space-y-4">
          <Input label="Subject Name" placeholder="e.g. Deep Learning" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Code" placeholder="CSE602" value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} />
            <Select label="Semester" value={form.semester} onChange={(e) => setForm({ ...form, semester: e.target.value })}>
              {semesters.map((s) => <option key={s} value={s}>Sem {s}</option>)}
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Select label="Type" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
              {['Theory', 'Lab', 'Elective', 'Project'].map((t) => <option key={t}>{t}</option>)}
            </Select>
            <Input label="Credits" type="number" value={form.credits} onChange={(e) => setForm({ ...form, credits: e.target.value })} />
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={() => { if (!form.name || !form.code) return toast.error('Name & code required'); toast.success('Subject created'); setOpen(false); }}>Create Subject</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
