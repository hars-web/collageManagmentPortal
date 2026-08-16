import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { BookOpen, Clock, GraduationCap, Users } from 'lucide-react';
import { PageHeader, Card, Badge, Button, Modal, Input, Select } from '../../components/ui';
import { courses, departments } from '../../data/mock';
import { cn } from '../../utils';

const types = ['Full-time', 'Part-time', 'Online'] as const;
const shades = ['primary', 'secondary', 'accent', 'danger', 'success', 'purple'] as const;

export default function AdminCourses() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: '', code: '', type: 'Full-time', duration: '4', fees: '135000' });

  const addCourse = () => {
    if (!form.name || !form.code) return toast.error('Course name and code are required');
    toast.success(`${form.name} created`);
    setOpen(false);
  };

  return (
    <div>
      <PageHeader
        title="Courses"
        subtitle="Manage programs, intake and fees"
        crumbs={[{ label: 'Admin' }, { label: 'Courses' }]}
        actions={<Button onClick={() => setOpen(true)}><BookOpen className="h-4 w-4" /> New Course</Button>}
      />

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {courses.map((c, i) => (
          <Card key={c.id} className="card-hover flex flex-col p-5">
            <div className="flex items-start justify-between">
              <span className={cn('flex h-11 w-11 items-center justify-center rounded-xl text-lg font-bold text-white', shades[i % shades.length] === 'primary' ? 'bg-primary-600' : shades[i % shades.length] === 'secondary' ? 'bg-secondary-500' : shades[i % shades.length] === 'accent' ? 'bg-accent-500' : shades[i % shades.length] === 'danger' ? 'bg-danger' : shades[i % shades.length] === 'success' ? 'bg-success' : 'bg-purple-600')}>
                {c.name.charAt(0)}
              </span>
              <Badge tone="neutral">{c.code}</Badge>
            </div>
            <h3 className="mt-3 font-semibold">{c.name}</h3>
            <p className="mt-1 flex items-center gap-1 text-xs text-dark-400"><GraduationCap className="h-3.5 w-3.5" /> {c.level} · {c.duration} · {c.seats} seats</p>
            <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
              <div className="rounded-xl bg-dark-50 p-2 dark:bg-dark-800"><p className="flex items-center justify-center gap-1 font-bold"><Users className="h-3 w-3" />{c.seats}</p><p className="text-[10px] text-dark-400">Intake</p></div>
              <div className="rounded-xl bg-dark-50 p-2 dark:bg-dark-800"><p className="font-bold text-accent-500">{(c.feePerYear / 100000).toFixed(1)}L</p><p className="text-[10px] text-dark-400">Fees/yr</p></div>
              <div className="rounded-xl bg-dark-50 p-2 dark:bg-dark-800"><p className="font-bold text-success">{departments.find((d) => d.id === c.departmentId)?.placementRate ?? 0}%</p><p className="text-[10px] text-dark-400">Placed</p></div>
            </div>
            <div className="mt-4 flex items-center gap-2 border-t border-dark-100 pt-3 text-[11px] text-dark-400 dark:border-dark-800">
              <Clock className="h-3 w-3" /> {c.duration} · {c.specializations.length} specialisations
            </div>
            <div className="mt-3 flex gap-2">
              <button className="btn-outline flex-1 py-1.5 text-xs" onClick={() => toast.success('Intake updated')}>Edit</button>
              <button className="btn-primary flex-1 py-1.5 text-xs" onClick={() => toast.success('Course deactivated')}>Archive</button>
            </div>
          </Card>
        ))}
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title="Create Course" subtitle="Registers the program for new admissions">
        <div className="space-y-4">
          <Input label="Course Name" placeholder="e.g. B.Tech Artificial Intelligence" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Code" placeholder="CSE-AI" value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} />
            <Select label="Type" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
              {types.map((t) => <option key={t}>{t}</option>)}
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input label="Duration (years)" type="number" value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} />
            <Input label="Annual Fees (₹)" type="number" value={form.fees} onChange={(e) => setForm({ ...form, fees: e.target.value })} />
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={addCourse}>Create Course</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
