import { PageHeader, Card, Badge, DataTable, type Column, StatCard } from '../../components/ui';
import { exams, subjects } from '../../data/mock';
import { CalendarDays, ClipboardList, Hourglass, MapPin } from 'lucide-react';
import { exportCSV } from '../../utils';

export default function StudentExams() {
  const rows = exams.map((e) => ({
    ...e,
    subjectName: subjects.find((s) => s.id === e.subjectId)?.name ?? '—',
  }));

  const columns: Column<(typeof rows)[number]>[] = [
    { key: 'name', header: 'Exam', render: (r) => <span className="font-medium">{r.name}</span> },
    { key: 'subjectName', header: 'Subject', hideBelow: 'md' },
    { key: 'date', header: 'Date' },
    { key: 'time', header: 'Time', hideBelow: 'sm' },
    { key: 'room', header: 'Room', render: (r) => <Badge tone="secondary">{r.room}</Badge> },
    { key: 'mode', header: 'Mode', render: (r) => <Badge tone={r.mode === 'lab' ? 'accent' : 'primary'}>{r.mode}</Badge> },
    { key: 'totalMarks', header: 'Marks', align: 'center' },
  ];

  return (
    <div>
      <PageHeader
        title="Exam Schedule"
        subtitle="Mid-semester & end-semester examinations · Semester 6"
        crumbs={[{ label: 'Student' }, { label: 'Exams' }]}
        actions={<button className="btn-outline" onClick={() => exportCSV('exam-schedule.csv', rows)}>Export Schedule</button>}
      />

      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Upcoming Exams" value={exams.length} icon={<CalendarDays className="h-5 w-5" />} iconClass="primary" format="plain" />
        <StatCard label="Next Exam In" value="32" icon={<Hourglass className="h-5 w-5" />} iconClass="accent" format="plain" trendLabel="days — ML Mid Sem" />
        <StatCard label="Theory Exams" value={exams.filter((e) => e.mode === 'theory').length} icon={<ClipboardList className="h-5 w-5" />} iconClass="secondary" format="plain" />
        <StatCard label="Labs & Vivas" value={exams.filter((e) => e.mode !== 'theory').length} icon={<MapPin className="h-5 w-5" />} iconClass="purple" format="plain" />
      </div>

      <DataTable data={rows} columns={columns} pageSize={10} searchKeys={['name', 'subjectName']} />

      <Card className="mt-6 border-accent-200 bg-accent-50/50 p-5 dark:border-accent-900/50 dark:bg-accent-900/10">
        <h3 className="text-sm font-semibold text-accent-700 dark:text-accent-300">Exam Rules</h3>
        <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-dark-600 dark:text-dark-300">
          <li>Report 30 minutes before the exam with your digital student ID</li>
          <li>Only non-programmable calculators are allowed</li>
          <li>Hall tickets will be available 5 days before each exam</li>
          <li>Minimum 75% attendance is required to appear for end-semester exams</li>
        </ul>
      </Card>
    </div>
  );
}
