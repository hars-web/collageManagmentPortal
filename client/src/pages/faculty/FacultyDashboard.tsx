import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, CheckCircle2, ClipboardCheck, Clock, Users } from 'lucide-react';
import { PageHeader, StatCard, Card, Badge, ChartCard, TrendChart, RadialProgressChart, ProgressBar, Avatar } from '../../components/ui';
import { facultyStats, timetable, subjects, studentsInClass, attendanceTrend } from '../../data/mock';
import { cn } from '../../utils';

const today = 'Tuesday';

export default function FacultyDashboard() {
  const todayClasses = timetable.filter((t) => t.day === today);
  const mySubjects = subjects.slice(0, 3);

  return (
    <div>
      <PageHeader
        title={`Welcome, Dr. Anjali!`}
        subtitle="Associate Professor · Machine Learning & NLP"
        crumbs={[{ label: 'Faculty' }, { label: 'Dashboard' }]}
        actions={
          <Link to="/faculty/attendance" className="btn-primary">
            <ClipboardCheck className="h-4 w-4" /> Mark Attendance
          </Link>
        }
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Students Taught" value={facultyStats.totalStudents} icon={<Users className="h-5 w-5" />} iconClass="primary" format="plain" trend={4.2} />
        <StatCard label="Today's Lectures" value={facultyStats.todayLectures} icon={<BookOpen className="h-5 w-5" />} iconClass="secondary" format="plain" />
        <StatCard label="Pending Grading" value={facultyStats.pendingAssignments} icon={<CheckCircle2 className="h-5 w-5" />} iconClass="accent" format="plain" />
        <StatCard label="Avg. Teaching Rating" value={facultyStats.averageRating} icon={<Star className="h-5 w-5" />} iconClass="purple" format="plain" trend={0.1} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <ChartCard title="Class Attendance Trend" subtitle="Average across your 3 courses">
            <TrendChart data={attendanceTrend} color="#2563EB" />
          </ChartCard>

          <Card>
            <div className="flex items-center justify-between p-5 pb-3">
              <div>
                <h3 className="text-base font-semibold">Today's Schedule</h3>
                <p className="text-xs text-dark-400">{today} · {todayClasses.length} lectures</p>
              </div>
              <Link to="/faculty/schedule" className="inline-flex items-center gap-1 text-xs font-semibold text-primary-600 hover:underline dark:text-primary-400">
                Full schedule <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
            <div className="space-y-3 p-5 pt-2">
              {todayClasses.map((slot, i) => (
                <div key={slot.id} className="flex items-center gap-4 rounded-2xl border border-dark-100 p-3.5 dark:border-dark-800">
                  <div className="flex h-12 w-14 shrink-0 flex-col items-center justify-center rounded-xl bg-gradient-to-br from-primary-600 to-secondary-500 text-white">
                    <span className="text-xs font-bold">{slot.start}</span>
                    <span className="text-[9px] opacity-80">{slot.end}</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold">{['Machine Learning', 'NLP — Elective', 'Full Stack Lab'][i] ?? 'Class'}</p>
                    <p className="text-xs text-dark-400">{slot.room} · {[64, 58, 64][i]} students</p>
                  </div>
                  <Badge tone={i === 0 ? 'success' : 'primary'}>{i === 0 ? 'Completed' : 'Upcoming'}</Badge>
                  <Link to="/faculty/attendance" className="btn-outline px-3 py-1.5 text-xs">Attendance</Link>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between p-5 pb-3">
              <h3 className="text-base font-semibold">My Courses — Attendance Overview</h3>
              <Link to="/faculty/performance" className="inline-flex items-center gap-1 text-xs font-semibold text-primary-600 hover:underline dark:text-primary-400">
                Analytics <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
            <div className="space-y-4 p-5 pt-2">
              {mySubjects.map((s) => (
                <div key={s.id}>
                  <div className="mb-1.5 flex items-center justify-between text-sm">
                    <span className="font-medium">{s.name}</span>
                    <span className="flex items-center gap-2">
                      <Badge tone="neutral">{s.hoursPerWeek} hrs/wk</Badge>
                      <span className="font-bold text-success">91%</span>
                    </span>
                  </div>
                  <ProgressBar value={91} />
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="p-5">
            <h3 className="text-base font-semibold">Class Attendance</h3>
            <div className="mt-2">
              <RadialProgressChart value={91} label="This week" color="#14B8A6" />
            </div>
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="rounded-xl bg-success/10 p-2.5"><p className="text-base font-bold text-success">169</p><p className="text-dark-400">Present</p></div>
              <div className="rounded-xl bg-danger/10 p-2.5"><p className="text-base font-bold text-danger">17</p><p className="text-dark-400">Absent</p></div>
              <div className="rounded-xl bg-dark-50 p-2.5 dark:bg-dark-800"><p className="text-base font-bold">186</p><p className="text-dark-400">Enrolled</p></div>
            </div>
            <Link to="/faculty/attendance" className="btn-outline mt-5 w-full py-2 text-xs">Manage Attendance</Link>
          </Card>

          <Card className="p-5">
            <h3 className="text-base font-semibold">Quick Actions</h3>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {[
                { label: 'Upload Notes', to: '/faculty/notes', icon: BookOpen },
                { label: 'Create Assignment', to: '/faculty/assignments', icon: CheckCircle2 },
                { label: 'Grade Students', to: '/faculty/grading', icon: ClipboardCheck },
                { label: 'Leave Request', to: '/faculty/leaves', icon: Clock },
              ].map((a) => (
                <Link key={a.label} to={a.to} className="card-hover flex flex-col items-center gap-2 rounded-xl border border-dark-100 p-4 text-center text-xs font-semibold transition-colors hover:border-primary-300 dark:border-dark-800">
                  <a.icon className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                  {a.label}
                </Link>
              ))}
            </div>
          </Card>

          <Card className="p-5">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-base font-semibold">Top Students</h3>
            </div>
            <div className="space-y-3">
              {studentsInClass.slice(0, 5).map((s, i) => (
                <div key={s.id} className="flex items-center gap-3">
                  <span className="w-5 text-xs font-bold text-dark-400">#{i + 1}</span>
                  <Avatar name={s.name} size="sm" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{s.name}</p>
                    <p className="text-[11px] text-dark-400">{s.rollNumber}</p>
                  </div>
                  <Badge tone={s.cgpa >= 8.5 ? 'success' : 'primary'}>{s.cgpa} CGPA</Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function Star({ className }: { className?: string }) {
  return <span className={cn('text-accent-500', className)}>★</span>;
}
