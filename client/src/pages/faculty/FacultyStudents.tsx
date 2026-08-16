import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { ChevronDown, Filter, Mail, Search, UserPlus } from 'lucide-react';
import { PageHeader, Card, Badge, Input, Modal, Button, Avatar } from '../../components/ui';
import { students } from '../../data/mock';
import { cn } from '../../utils';

type FilterState = { course: string; batch: string; status: string };

export default function FacultyStudents() {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<FilterState>({ course: 'All', batch: 'All', status: 'All' });
  const [selectOpen, setSelectOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [inviteOpen, setInviteOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');

  const courses = ['All', 'B.Tech CSE', 'B.Tech ECE', 'MCA', 'MBA'];
  const batches = ['All', '2023-27', '2022-26'];
  const statuses = ['All', 'Active', 'Low Attendance', 'At Risk'];

  const filtered = students.filter((s) => {
    const q = `${s.name} ${s.rollNumber} ${s.course}`.toLowerCase().includes(query.toLowerCase());
    return q && (filters.course === 'All' || s.course === filters.course) && (filters.batch === 'All' || s.batch === filters.batch);
  });

  return (
    <div>
      <PageHeader
        title="My Students"
        subtitle="1,204 students across your 3 courses"
        crumbs={[{ label: 'Faculty' }, { label: 'Students' }]}
        actions={
          <>
            <button className="btn-outline" onClick={() => setInviteOpen(true)}><UserPlus className="h-4 w-4" /> Invite Student</button>
            <button className="btn-primary" onClick={() => toast.success('Enrollment link copied to clipboard')}>Enroll New</button>
          </>
        }
      />

      <Card className="mb-4 flex flex-col gap-3 p-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-dark-400" />
          <Input placeholder="Search by name, roll number or course…" value={query} onChange={(e) => setQuery(e.target.value)} className="pl-10" aria-label="Search students" />
        </div>
        <div className="flex gap-2">
          <button className={cn('btn-outline', showFilters && 'border-primary-400 text-primary-600')} onClick={() => setShowFilters(!showFilters)}>
            <Filter className="h-4 w-4" /> Filters
          </button>
          <div className="relative">
            <button className="btn-outline" onClick={() => setSelectOpen(!selectOpen)}>
              {filters.course} <ChevronDown className="h-4 w-4" />
            </button>
            {selectOpen && (
              <div className="absolute right-0 top-12 z-20 w-44 rounded-2xl border border-dark-100 bg-white p-1.5 shadow-card dark:border-dark-800 dark:bg-dark-900">
                {courses.map((c) => (
                  <button key={c} className="block w-full rounded-xl px-3 py-2 text-left text-sm hover:bg-dark-50 dark:hover:bg-dark-800" onClick={() => { setFilters({ ...filters, course: c }); setSelectOpen(false); }}>{c}</button>
                ))}
              </div>
            )}
          </div>
        </div>
      </Card>

      {showFilters && (
        <Card className="mb-4 grid gap-3 p-4 sm:grid-cols-2">
          {(['course', 'batch', 'status'] as const).map((k) => (
            <label key={k} className="label">
              {k[0].toUpperCase() + k.slice(1)}
              <select className="input" value={filters[k]} onChange={(e) => setFilters({ ...filters, [k]: e.target.value })}>
                {k === 'course' ? courses : k === 'batch' ? batches : statuses}
              </select>
            </label>
          ))}
          <div className="flex items-end">
            <button className="btn-ghost w-full" onClick={() => setFilters({ course: 'All', batch: 'All', status: 'All' })}>Clear</button>
          </div>
        </Card>
      )}

      <Card className="overflow-x-auto p-0">
        <table className="table-base min-w-[820px]">
          <thead>
            <tr>
              <th>Student</th>
              <th>Roll No</th>
              <th>Course</th>
              <th>Batch</th>
              <th>Attendance</th>
              <th>CGPA</th>
              <th>Status</th>
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
                <td className="text-sm">{s.course}</td>
                <td className="text-sm">{s.batch}</td>
                <td>
                  <span className={cn('text-sm font-bold', s.attendance >= 80 ? 'text-success' : s.attendance >= 65 ? 'text-accent-500' : 'text-danger')}>{s.attendance}%</span>
                </td>
                <td className="text-sm font-semibold">{s.cgpa}</td>
                <td>
                  <Badge tone={s.attendance < 65 ? 'danger' : s.attendance < 80 ? 'accent' : 'success'} dot>
                    {s.attendance < 65 ? 'At Risk' : s.attendance < 80 ? 'Low Attendance' : 'Active'}
                  </Badge>
                </td>
                <td className="text-right">
                  <div className="flex justify-end gap-1.5">
                    <button className="btn-outline px-2.5 py-1.5 text-xs" onClick={() => toast.success(`Email sent to ${s.email}`)}><Mail className="h-3.5 w-3.5" /></button>
                    <button className="btn-primary px-2.5 py-1.5 text-xs" onClick={() => toast.success('Message sent')}>Message</button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={8} className="p-10 text-center text-sm text-dark-400">No students match your filters.</td></tr>
            )}
          </tbody>
        </table>
      </Card>

      <Modal open={inviteOpen} onClose={() => setInviteOpen(false)} title="Invite Student" subtitle="They'll receive an invite link to join your course">
        <div className="space-y-4">
          <Input label="Student Email" placeholder="student@cutm.ac.in" value={inviteEmail} onChange={(e) => setInviteEmail(e.target.value)} />
          <div className="flex justify-end gap-3">
            <Button variant="ghost" onClick={() => setInviteOpen(false)}>Cancel</Button>
            <Button onClick={() => { toast.success('Invitation sent!'); setInviteOpen(false); }}>Send Invite</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
