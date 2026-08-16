import { useState } from 'react';
import { PageHeader, Card, Badge, DataTable, type Column } from '../../components/ui';
import { timetable, subjects } from '../../data/mock';
import { cn } from '../../utils';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export default function StudentTimetable() {
  const [day, setDay] = useState('All');
  const rows = timetable
    .filter((t) => day === 'All' || t.day === day)
    .map((t) => ({
      ...t,
      subjectName: subjects.find((s) => s.id === t.subjectId)?.name ?? '—',
    }));

  const columns: Column<(typeof rows)[number]>[] = [
    { key: 'day', header: 'Day', render: (r) => <Badge tone="primary">{r.day}</Badge> },
    { key: 'start', header: 'Start', render: (r) => <span className="font-semibold">{r.start}</span> },
    { key: 'end', header: 'End' },
    { key: 'subjectName', header: 'Subject', render: (r) => <span className="font-medium">{r.subjectName}</span> },
    { key: 'room', header: 'Room', hideBelow: 'md' },
  ];

  return (
    <div>
      <PageHeader title="Timetable" subtitle="Weekly schedule · Semester 6" crumbs={[{ label: 'Student' }, { label: 'Timetable' }]} />

      <div className="mb-5 flex flex-wrap gap-2">
        {['All', ...days].map((d) => (
          <button key={d} onClick={() => setDay(d)} className={cn('rounded-full px-4 py-2 text-xs font-semibold transition-all', day === d ? 'bg-primary-600 text-white shadow-glow' : 'border border-dark-200 bg-white text-dark-500 hover:border-primary-400 dark:border-dark-700 dark:bg-dark-900 dark:text-dark-300')}>
            {d === 'All' ? 'Full Week' : d}
          </button>
        ))}
      </div>

      <DataTable data={rows} columns={columns} pageSize={20} />

      <Card className="mt-6 p-5">
        <h3 className="text-base font-semibold">Week at a glance</h3>
        <div className="mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {days.map((d) => {
            const slots = timetable.filter((t) => t.day === d);
            return (
              <div key={d} className="rounded-2xl border border-dark-100 p-4 dark:border-dark-800">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold">{d}</span>
                  <Badge tone="neutral">{slots.length} classes</Badge>
                </div>
                <div className="mt-3 space-y-1.5">
                  {slots.map((s) => (
                    <div key={s.id} className="flex items-center justify-between rounded-lg bg-dark-50 px-3 py-2 text-xs dark:bg-dark-800">
                      <span className="font-semibold text-primary-600 dark:text-primary-400">{s.start}–{s.end}</span>
                      <span className="truncate pl-2">{subjects.find((sub) => sub.id === s.subjectId)?.name ?? '—'}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
