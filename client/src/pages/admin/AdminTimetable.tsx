import { PageHeader, Card, Button } from '../../components/ui';
import { timetable, subjects, facultyMembers } from '../../data/mock';
import { toast } from 'react-hot-toast';
import { cn } from '../../utils';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const slots = ['09:00', '10:00', '11:15', '12:15', '02:00', '03:00'];

export default function AdminTimetable() {
  return (
    <div>
      <PageHeader
        title="Timetable Management"
        subtitle="Sem 6 · CSE · Batch A · room conflicts highlighted"
        crumbs={[{ label: 'Admin' }, { label: 'Timetable' }]}
        actions={
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => toast.success('Template exported')}>Export</Button>
            <Button size="sm" onClick={() => toast.success('Open the timetable builder')}>Builder</Button>
          </div>
        }
      />

      <Card className="overflow-x-auto p-0">
        <table className="table-base min-w-[940px]">
          <thead>
            <tr>
              <th className="w-28">Time</th>
              {days.map((d) => <th key={d} className="text-center">{d}</th>)}
            </tr>
          </thead>
          <tbody>
            {slots.map((start) => (
              <tr key={start}>
                <td className="text-xs font-bold text-dark-500 dark:text-dark-300">{start} - {start === '11:15' ? '12:15' : start === '12:15' ? '01:15' : `${(Number(start.split(':')[0]) + 1).toString().padStart(2, '0')}:00`}</td>
                {days.map((d) => {
                  const slot = timetable.find((t) => t.day === d && t.start === start);
                  const sub = slot ? subjects.find((x) => x.id === slot.subjectId) : undefined;
                  const conflict = slot && slot.room === 'Lab-2' && slot.day === 'Wednesday';
                  const isLab = sub?.category === 'lab';
                  return (
                    <td key={d} className="text-center align-middle">
                      {slot ? (
                        <div className={cn('mx-auto max-w-[160px] rounded-xl p-2 text-left text-[11px] leading-snug', isLab ? 'bg-secondary-50 text-secondary-700 dark:bg-secondary-900/30 dark:text-secondary-300' : conflict ? 'bg-danger-50 text-danger-700 dark:bg-danger-900/30 dark:text-danger-300 ring-1 ring-danger' : 'bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300')}>
                          <p className="font-bold">{sub?.name ?? '—'}</p>
                          <p className="opacity-80">{sub ? (facultyMembers.find((f) => f.id === sub.facultyId)?.name.split(' ')[1] ?? '') : ''} · {slot.room}</p>
                          {conflict && <p className="font-semibold text-danger">Room conflict!</p>}
                        </div>
                      ) : (
                        <span className="text-dark-200 dark:text-dark-600">—</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <div className="mt-5 flex flex-wrap gap-3 text-xs">
        <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-primary-500" /> Theory</span>
        <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-secondary-500" /> Lab</span>
        <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-danger" /> Conflict</span>
      </div>
    </div>
  );
}
