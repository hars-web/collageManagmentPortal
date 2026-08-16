import { PageHeader, Card, Badge, ChartCard, PieChartComponent } from '../../components/ui';
import { students } from '../../data/mock';
import { cn } from '../../utils';

const buckets = [
  { name: '90-100%', value: 1842, color: '#22C55E' },
  { name: '75-89%', value: 3210, color: '#14B8A6' },
  { name: '65-74%', value: 1540, color: '#2563EB' },
  { name: '<65%', value: 1296, color: '#EF4444' },
];

const byDept = [
  { name: 'CSE', value: 86, color: '#2563EB' },
  { name: 'ECE', value: 84, color: '#14B8A6' },
  { name: 'Mech', value: 81, color: '#F59E0B' },
  { name: 'Civil', value: 79, color: '#22C55E' },
  { name: 'MBA', value: 88, color: '#8B5CF6' },
];

export default function AdminAttendance() {
  return (
    <div>
      <PageHeader
        title="Attendance Analytics"
        subtitle="Campus-wide · Semester 6 · week 12"
        crumbs={[{ label: 'Admin' }, { label: 'Attendance' }]}
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Card className="p-4"><p className="text-xs text-dark-400">Campus Average</p><p className="mt-1 text-2xl font-bold text-secondary-600 dark:text-secondary-400">85.8%</p><p className="text-[11px] text-success">+1.2% vs last sem</p></Card>
        <Card className="p-4"><p className="text-xs text-dark-400">Below 65% (At Risk)</p><p className="mt-1 text-2xl font-bold text-danger">1,296</p><p className="text-[11px] text-dark-400">16.4% of students</p></Card>
        <Card className="p-4"><p className="text-xs text-dark-400">Classes Conducted</p><p className="mt-1 text-2xl font-bold">12,480</p><p className="text-[11px] text-dark-400">this semester</p></Card>
        <Card className="p-4"><p className="text-xs text-dark-400">Best Department</p><p className="mt-1 text-2xl font-bold text-success">MBA</p><p className="text-[11px] text-dark-400">88% attendance</p></Card>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <ChartCard title="Attendance Distribution" subtitle="All 7,888 students">
          <PieChartComponent data={buckets} />
        </ChartCard>
        <ChartCard title="Department Averages" subtitle="Compared to campus average 85.8%">
          <PieChartComponent data={byDept} />
        </ChartCard>
      </div>

      <Card className="mt-6 overflow-x-auto p-0">
        <div className="flex items-center justify-between p-5 pb-3">
          <h3 className="text-base font-semibold">Risk Register — Low Attendance</h3>
          <Badge tone="danger">{students.filter((s) => s.attendance < 65).length} students flagged</Badge>
        </div>
        <table className="table-base min-w-[700px]">
          <thead>
            <tr>
              <th>Student</th>
              <th>Course</th>
              <th>Attendance</th>
              <th>Flag</th>
              <th className="text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {students.filter((s) => s.attendance < 70).slice(0, 6).map((s) => (
              <tr key={s.id}>
                <td className="text-sm font-medium">{s.name}</td>
                <td className="text-sm text-dark-500 dark:text-dark-300">{s.program}</td>
                <td className={cn('text-sm font-bold', s.attendance < 60 ? 'text-danger' : 'text-accent-500')}>{s.attendance}%</td>
                <td><Badge tone={s.attendance < 60 ? 'danger' : 'accent'} dot>{s.attendance < 60 ? 'Critical' : 'Warning'}</Badge></td>
                <td className="text-right"><button className="btn-outline px-3 py-1.5 text-xs">Notify + Report</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
