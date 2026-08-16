import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Building2, GraduationCap, IndianRupee, TrendingUp, UserCheck, Users } from 'lucide-react';
import { PageHeader, StatCard, Card, ChartCard, TrendChart, PieChartComponent, ProgressBar, Badge } from '../../components/ui';
import { adminStats, analyticsTrend, feeStatusData, feeCollections, courses } from '../../data/mock';

export default function AdminDashboard() {
  const pendingLeaves = 4;
  const pendingComplaints = 3;
  const feesCollectedCr = (adminStats.revenue / 1e7).toFixed(1);

  return (
    <div>
      <PageHeader
        title="Admin Control Center"
        subtitle="CUTM Bhubaneswar · Academic Year 2025-26"
        crumbs={[{ label: 'Admin' }, { label: 'Dashboard' }]}
        actions={
          <Link to="/admin/notices" className="btn-primary">
            <TrendingUp className="h-4 w-4" /> Publish Notice
          </Link>
        }
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Total Students" value={adminStats.totalStudents} icon={<Users className="h-5 w-5" />} iconClass="primary" format="plain" trend={2.4} />
        <StatCard label="Faculty" value={adminStats.totalFaculty} icon={<GraduationCap className="h-5 w-5" />} iconClass="secondary" format="plain" trend={0.8} />
        <StatCard label="Departments" value={adminStats.totalDepartments} icon={<Building2 className="h-5 w-5" />} iconClass="accent" format="plain" />
        <StatCard label="Courses" value={courses.length} icon={<BookOpen className="h-5 w-5" />} iconClass="purple" format="plain" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <ChartCard title="Fee Collection Trend" subtitle="FY 2025-26 · in ₹ crore" actions={<Badge tone="success" dot>On track</Badge>}>
            <TrendChart data={analyticsTrend} color="#14B8A6" />
          </ChartCard>

          <div className="grid gap-4 sm:grid-cols-3">
            <Card className="p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold">Fees Collected</p>
                <IndianRupee className="h-4 w-4 text-success" />
              </div>
              <p className="mt-2 text-2xl font-bold">₹{feesCollectedCr} Cr</p>
              <p className="text-xs text-success">+12.4% vs last year</p>
              <ProgressBar value={82} className="mt-3" />
              <p className="mt-1.5 text-[11px] text-dark-400">82% of target ₹128 Cr</p>
            </Card>
            <Card className="p-5">
              <p className="text-sm font-semibold">Avg. Attendance</p>
              <p className="mt-2 text-2xl font-bold text-primary-600 dark:text-primary-400">86%</p>
              <p className="text-xs text-dark-400">Campus-wide · last 30 days</p>
              <ProgressBar value={86} className="mt-3" />
              <p className="mt-1.5 text-[11px] text-dark-400">Target 90%</p>
            </Card>
            <Card className="p-5">
              <p className="text-sm font-semibold">Placement Rate</p>
              <p className="mt-2 text-2xl font-bold text-secondary-600 dark:text-secondary-400">89%</p>
              <p className="text-xs text-dark-400">Batch 2025-26 · 1,912 placed</p>
              <ProgressBar value={89} className="mt-3" />
              <p className="mt-1.5 text-[11px] text-dark-400">Target 92%</p>
            </Card>
          </div>

          <Card className="overflow-x-auto p-0">
            <div className="flex items-center justify-between p-5 pb-3">
              <h3 className="text-base font-semibold">Recent Fee Collections</h3>
              <Link to="/admin/fees" className="inline-flex items-center gap-1 text-xs font-semibold text-primary-600 hover:underline dark:text-primary-400">View all <ArrowRight className="h-3 w-3" /></Link>
            </div>
            <table className="table-base min-w-[600px]">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Course</th>
                  <th>Amount</th>
                  <th>Method</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {feeCollections.slice(0, 6).map((f) => (
                  <tr key={f.id}>
                    <td className="text-sm font-medium">{f.studentName}</td>
                    <td className="text-sm text-dark-500 dark:text-dark-300">{f.course}</td>
                    <td className="text-sm font-bold text-success">₹{f.amount.toLocaleString('en-IN')}</td>
                    <td className="text-sm text-dark-500 dark:text-dark-300">{f.method}</td>
                    <td><Badge tone={f.status === 'Completed' ? 'success' : 'accent'} dot>{f.status}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>

        <div className="space-y-6">
          <ChartCard title="Fee Status" subtitle="All students">
            <PieChartComponent data={feeStatusData} />
          </ChartCard>

          <Card className="p-5">
            <h3 className="text-base font-semibold">Approvals & Tasks</h3>
            <div className="mt-4 space-y-2.5">
              {[
                { label: 'Leave requests pending', count: pendingLeaves, to: '/admin/faculty', tone: 'accent' },
                { label: 'New student registrations', count: 12, to: '/admin/students', tone: 'primary' },
                { label: 'Open complaints', count: pendingComplaints, to: '/admin/complaints', tone: 'danger' },
                { label: 'Scholarship applications', count: 8, to: '/admin/scholarships', tone: 'secondary' },
              ].map((t) => (
                <Link key={t.label} to={t.to} className="flex items-center justify-between rounded-2xl border border-dark-100 p-3.5 transition-colors hover:border-primary-300 dark:border-dark-800 dark:hover:border-primary-700">
                  <span className="text-sm font-medium">{t.label}</span>
                  <span className="flex items-center gap-2">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold text-white ${t.tone === 'danger' ? 'bg-danger' : t.tone === 'accent' ? 'bg-accent-500' : t.tone === 'secondary' ? 'bg-secondary-500' : 'bg-primary-600'}`}>{t.count}</span>
                    <ArrowRight className="h-3.5 w-3.5 text-dark-300" />
                  </span>
                </Link>
              ))}
            </div>
          </Card>

          <Card className="p-5">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold">Student Demographics</h3>
              <UserCheck className="h-4 w-4 text-dark-300" />
            </div>
            <div className="mt-4 space-y-3 text-sm">
              {[
                { label: 'B.Tech', pct: 62, value: '4,892' },
                { label: 'M.Tech', pct: 12, value: '946' },
                { label: 'MBA / MCA', pct: 14, value: '1,104' },
                { label: 'Diploma & PhD', pct: 12, value: '946' },
              ].map((d) => (
                <div key={d.label}>
                  <div className="mb-1 flex justify-between">
                    <span className="text-dark-500 dark:text-dark-300">{d.label}</span>
                    <span className="font-semibold">{d.value} · {d.pct}%</span>
                  </div>
                  <ProgressBar value={d.pct} />
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
