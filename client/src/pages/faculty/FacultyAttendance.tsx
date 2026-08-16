import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Check, X } from 'lucide-react';
import { PageHeader, Card, Badge, Button, Avatar, Select } from '../../components/ui';
import { students, subjects } from '../../data/mock';
import { cn } from '../../utils';

export default function FacultyAttendance() {
  const [subject, setSubject] = useState(subjects[0].name);
  const [batch, setBatch] = useState('Batch A');
  const [date, setDate] = useState('2026-08-07');
  const [marked, setMarked] = useState<Record<string, boolean>>({});
  const [saved, setSaved] = useState(false);

  const classStudents = students.slice(0, 10);
  const presentCount = Object.values(marked).filter(Boolean).length;
  const absentCount = classStudents.length - presentCount;

  const markAll = (v: boolean) => {
    const m: Record<string, boolean> = {};
    classStudents.forEach((s) => (m[s.id] = v));
    setMarked(m);
    setSaved(false);
  };

  const toggle = (id: string) => {
    setMarked((m) => ({ ...m, [id]: !m[id] }));
    setSaved(false);
  };

  return (
    <div>
      <PageHeader
        title="Mark Attendance"
        subtitle="Session marked against your class rosters"
        crumbs={[{ label: 'Faculty' }, { label: 'Attendance' }]}
      />

      <Card className="mb-5 flex flex-col gap-3 p-4 sm:flex-row sm:items-end">
        <label className="label flex-1">
          Subject
          <Select value={subject} onChange={(e) => setSubject(e.target.value)}>
            {subjects.map((s) => (
              <option key={s.id}>{s.name}</option>
            ))}
          </Select>
        </label>
        <label className="label flex-1">
          Section
          <Select value={batch} onChange={(e) => setBatch(e.target.value)}>
            {['Batch A', 'Batch B', 'Batch C'].map((b) => (
              <option key={b}>{b}</option>
            ))}
          </Select>
        </label>
        <label className="label flex-1">
          Date
          <input type="date" className="input" value={date} onChange={(e) => setDate(e.target.value)} />
        </label>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => markAll(true)}>All Present</Button>
          <Button variant="outline" onClick={() => markAll(false)}>All Absent</Button>
        </div>
      </Card>

      <Card className="overflow-x-auto p-0">
        <table className="table-base min-w-[640px]">
          <thead>
            <tr>
              <th>Student</th>
              <th>Roll No</th>
              <th className="text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {classStudents.map((s) => {
              const present = marked[s.id] === true;
              const absent = marked[s.id] === false;
              return (
                <tr key={s.id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <Avatar name={s.name} size="sm" />
                      <p className="font-medium">{s.name}</p>
                    </div>
                  </td>
                  <td className="font-mono text-xs">{s.rollNumber}</td>
                  <td className="text-center">
                    <div className="inline-flex rounded-full bg-dark-50 p-1 dark:bg-dark-800">
                      <button
                        onClick={() => toggle(s.id)}
                        className={cn('flex items-center gap-1 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors', present ? 'bg-success text-white' : 'text-dark-400 hover:text-success')}
                        aria-pressed={present}
                      >
                        <Check className="h-3.5 w-3.5" /> Present
                      </button>
                      <button
                        onClick={() => toggle(s.id)}
                        className={cn('flex items-center gap-1 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors', absent ? 'bg-danger text-white' : 'text-dark-400 hover:text-danger')}
                        aria-pressed={absent}
                      >
                        <X className="h-3.5 w-3.5" /> Absent
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>

      <div className="mt-5 flex flex-col items-center justify-between gap-4 rounded-2xl border border-dark-100 bg-white p-5 dark:border-dark-800 dark:bg-dark-900 sm:flex-row">
        <div className="flex gap-4 text-sm">
          <span className="flex items-center gap-2"><Badge tone="success" dot /> Present: <b className="text-success">{presentCount}</b></span>
          <span className="flex items-center gap-2"><Badge tone="danger" dot /> Absent: <b className="text-danger">{absentCount}</b></span>
          <span className="flex items-center gap-2 text-dark-400">Marked: <b>{Object.keys(marked).length}/{classStudents.length}</b></span>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => { setMarked({}); setSaved(false); }}>Reset</Button>
          <Button
            onClick={() => {
              if (Object.keys(marked).length === 0) return toast.error('Mark at least one student first');
              setSaved(true);
              toast.success(`Attendance saved for ${subject} · ${date}`);
            }}
          >
            {saved ? 'Saved ✓' : 'Save Attendance'}
          </Button>
        </div>
      </div>
    </div>
  );
}
