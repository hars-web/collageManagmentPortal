import { PageHeader, Card, Badge, Button } from '../../components/ui';
import { timetable, subjects } from '../../data/mock';
import { cn } from '../../utils';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const slots = ['09:00 - 10:00', '10:00 - 11:00', '11:15 - 12:15', '12:15 - 01:15', '02:00 - 03:00', '03:00 - 04:00'];

export default function FacultySchedule() {
  const mine = timetable.filter((t) => subjects.find((s) => s.id === t.subjectId)?.facultyId === 'f2');

  return (
    <div>
      <PageHeader
        title="Weekly Schedule"
        subtitle="Semester 6 · odd week (even week alternates practicals)"
        crumbs={[{ label: 'Faculty' }, { label: 'Schedule' }]}
        actions={
          <div className="flex gap-2">
            <Badge tone="neutral">Odd Week</Badge>
            <Button variant="outline" size="sm">Download PDF</Button>
          </div>
        }
      />

      <Card className="overflow-x-auto p-0">
        <table className="table-base min-w-[900px]">
          <thead>
            <tr>
              <th className="w-32">Time</th>
              {days.map((d) => (
                <th key={d} className={cn('text-center', d === 'Tuesday' && 'text-primary-600 dark:text-primary-400')}>{d}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {slots.map((s) => {
              const [start] = s.split(' - ');
              return (
                <tr key={s}>
                  <td className="text-xs font-bold text-dark-500 dark:text-dark-300">{s}</td>
                  {days.map((d) => {
                    const cls = mine.find((t) => t.day === d && t.start === start);
                    const sub = cls ? subjects.find((x) => x.id === cls.subjectId) : undefined;
                    return (
                      <td key={d} className="text-center align-middle">
                        {cls ? (
                          <div className={cn('mx-auto max-w-[150px] rounded-xl p-2 text-left text-[11px] leading-snug', sub?.category === 'lab' ? 'bg-secondary-50 text-secondary-700 dark:bg-secondary-900/30 dark:text-secondary-300' : 'bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300')}>
                            <p className="font-bold">{sub?.name ?? '—'}</p>
                            <p className="mt-0.5 opacity-80">{cls.room} · {cls.batch ?? ''}</p>
                          </div>
                        ) : (
                          <span className="text-dark-200 dark:text-dark-600">—</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {[
          { label: 'Total Hours', value: `${mine.length * 4} hrs / week` },
          { label: 'Lectures', value: mine.filter((t) => subjects.find((s) => s.id === t.subjectId)?.category !== 'lab').length },
          { label: 'Labs', value: mine.filter((t) => subjects.find((s) => s.id === t.subjectId)?.category === 'lab').length },
        ].map((s) => (
          <Card key={s.label} className="flex items-center justify-between p-5">
            <span className="text-sm text-dark-400">{s.label}</span>
            <span className="text-lg font-bold">{s.value}</span>
          </Card>
        ))}
      </div>
    </div>
  );
}
