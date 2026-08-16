import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { PageHeader, Card, Badge, ChartCard, BarChartComponent, PieChartComponent, RadialProgressChart } from '../../components/ui';
import { students, attendanceTrend, results } from '../../data/mock';
import { cn } from '../../utils';

export default function FacultyPerformance() {
  const atRisk = students.filter((s) => s.attendance < 70).length;
  const passRate = Math.round((results.filter((r) => r.percentage >= 40).length / results.length) * 100);

  const grades = [
    { name: 'A+', value: students.filter((s) => s.cgpa >= 9).length, color: '#22C55E' },
    { name: 'A', value: students.filter((s) => s.cgpa >= 8 && s.cgpa < 9).length, color: '#14B8A6' },
    { name: 'B+', value: students.filter((s) => s.cgpa >= 7 && s.cgpa < 8).length, color: '#2563EB' },
    { name: 'B', value: students.filter((s) => s.cgpa >= 6 && s.cgpa < 7).length, color: '#F59E0B' },
    { name: 'Below', value: students.filter((s) => s.cgpa < 6).length, color: '#EF4444' },
  ];

  return (
    <div>
      <PageHeader
        title="Class Performance Analytics"
        subtitle="Machine Learning · Semester 6 · Insights for better outcomes"
        crumbs={[{ label: 'Faculty' }, { label: 'Performance' }]}
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Card className="p-4"><p className="text-xs text-dark-400">Pass Rate</p><p className="mt-1 text-2xl font-bold text-success">{passRate}%</p></Card>
        <Card className="p-4"><p className="text-xs text-dark-400">Class Avg CGPA</p><p className="mt-1 text-2xl font-bold">7.6</p></Card>
        <Card className="p-4"><p className="text-xs text-dark-400">At-Risk Students</p><p className="mt-1 text-2xl font-bold text-danger">{atRisk}</p></Card>
        <Card className="p-4"><p className="text-xs text-dark-400">Distinctions (A+)</p><p className="mt-1 text-2xl font-bold text-accent-500">{students.filter((s) => s.cgpa >= 9).length}</p></Card>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <ChartCard title="Attendance Trend" subtitle="All my courses, last 8 weeks">
          <BarChartComponent data={attendanceTrend} color="#2563EB" />
        </ChartCard>
        <ChartCard title="Grade Distribution" subtitle="Across enrolled students">
          <PieChartComponent data={grades} />
        </ChartCard>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Card className="p-5">
          <h3 className="text-base font-semibold">At-Risk Students</h3>
          <p className="text-xs text-dark-400">Attendance below 70% — intervention recommended</p>
          <div className="mt-4 space-y-3">
            {students.filter((s) => s.attendance < 70).slice(0, 4).map((s) => (
              <div key={s.id} className="flex items-center justify-between rounded-xl bg-danger-50/60 p-3 dark:bg-danger-900/20">
                <div>
                  <p className="text-sm font-semibold">{s.name}</p>
                  <p className="text-xs text-dark-400">{s.rollNumber}</p>
                </div>
                <div className="text-right">
                  <p className={cn('text-sm font-bold', s.attendance < 60 ? 'text-danger' : 'text-accent-500')}>{s.attendance}%</p>
                  <Link to="/faculty/students" className="text-[11px] font-semibold text-primary-600 hover:underline dark:text-primary-400">Message →</Link>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold">Subject-wise Performance</h3>
            <Badge tone="primary">Sem 6 · Midterm</Badge>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {[
              { name: 'Machine Learning', avg: 78, atRisk: 9, p: 86 },
              { name: 'NLP (Elective)', avg: 74, atRisk: 7, p: 81 },
              { name: 'ML Lab', avg: 84, atRisk: 3, p: 93 },
            ].map((sub) => (
              <div key={sub.name} className="rounded-2xl border border-dark-100 p-4 dark:border-dark-800">
                <p className="text-sm font-semibold">{sub.name}</p>
                <p className="mt-2 text-2xl font-bold">{sub.avg}<span className="text-sm font-normal text-dark-400">% avg</span></p>
                <p className="mt-1 text-xs text-dark-400">{sub.atRisk} at risk · {sub.p}% pass</p>
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-dark-100 dark:bg-dark-800">
                  <div className="h-full rounded-full bg-gradient-to-r from-primary-500 to-secondary-500" style={{ width: `${sub.p}%` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5 flex items-center gap-4 rounded-2xl bg-dark-50 p-4 text-sm dark:bg-dark-800">
            <RadialProgressChart value={76} label="Students above 75%" color="#F59E0B" size="sm" />
            <p className="text-dark-400">
              <b className="text-dark-600 dark:text-dark-200">AI Insight:</b> NLP cohort attendance is dipping in the last 3 sessions. Consider a recorded lecture and a short quiz to re-engage.
              <Link to="/faculty/attendance" className="ml-1 inline-flex items-center gap-0.5 font-semibold text-primary-600 dark:text-primary-400">Review <ArrowRight className="h-3 w-3" /></Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
