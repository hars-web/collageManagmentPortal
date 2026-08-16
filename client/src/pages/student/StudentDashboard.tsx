import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  AlertTriangle,
  ArrowRight,
  Award,
  BookOpen,
  CalendarDays,
  CalendarPlus,
  ClipboardCheck,
  Clock,
  FileText,
  GraduationCap,
  Library,
  NotepadText,
  Sparkles,
  TrendingUp,
  Wallet,
} from 'lucide-react';
import { PageHeader, StatCard, Card, Badge, ProgressBar, RadialProgressChart, TrendChart, ChartCard, Avatar } from '../../components/ui';
import { currentUser, attendanceSummary, performanceTrend, assignments, exams, timetable, notifications, students } from '../../data/mock';
import { cn, timeAgo } from '../../utils';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const today = 'Tuesday';

export default function StudentDashboard() {
  const attendance = 91;
  const pending = assignments.filter((a) => a.status === 'pending' || a.status === 'overdue');
  const todayClasses = timetable.filter((t) => t.day === today);
  const upcomingExams = exams.slice(0, 2);
  const student = students[0];

  return (
    <div>
      <PageHeader
        title={`Good ${new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 17 ? 'afternoon' : 'evening'}, ${currentUser.name.split(' ')[0]}!`}
        subtitle={`Semester 6 · ${currentUser.program} · Batch 2021-25`}
        crumbs={[{ label: 'Student', to: '/student' }, { label: 'Dashboard' }]}
        actions={
          <>
            <Link to="/student/leaves" className="btn-outline"><CalendarPlus className="h-4 w-4" /> Apply Leave</Link>
            <Link to="/student/assignments" className="btn-primary"><NotepadText className="h-4 w-4" /> View Assignments</Link>
          </>
        }
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Attendance" value={attendance} icon={<ClipboardCheck className="h-5 w-5" />} iconClass="primary" format="percent" trend={2.1} />
        <StatCard label="CGPA" value={student.cgpa} icon={<Award className="h-5 w-5" />} iconClass="secondary" format="plain" trend={0.4} />
        <StatCard label="Pending Assignments" value={pending.length} icon={<NotepadText className="h-5 w-5" />} iconClass="accent" format="plain" />
        <StatCard label="Upcoming Exams" value={upcomingExams.length} icon={<CalendarDays className="h-5 w-5" />} iconClass="purple" format="plain" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <ChartCard title="Performance Trend" subtitle="CGPA across semesters">
            <TrendChart data={performanceTrend} color="#14B8A6" />
          </ChartCard>

          <Card>
            <div className="flex items-center justify-between p-5 pb-3">
              <div>
                <h3 className="text-base font-semibold">Today's Classes</h3>
                <p className="text-xs text-dark-400">{today} · {todayClasses.length} sessions</p>
              </div>
              <Link to="/student/timetable" className="inline-flex items-center gap-1 text-xs font-semibold text-primary-600 hover:underline dark:text-primary-400">
                Full timetable <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
            <div className="space-y-3 p-5 pt-2">
              {todayClasses.map((slot, i) => {
                const subject = ['Machine Learning', 'Cloud Computing & DevOps', 'Full Stack Lab', 'NLP'][i] ?? 'Subject';
                const room = slot.room;
                const done = i < 1;
                return (
                  <div key={slot.id} className="flex items-center gap-4 rounded-2xl border border-dark-100 p-3.5 transition-colors hover:border-primary-200 dark:border-dark-800 dark:hover:border-primary-700/40">
                    <div className="flex h-12 w-14 shrink-0 flex-col items-center justify-center rounded-xl bg-gradient-to-br from-primary-600 to-secondary-500 text-white">
                      <span className="text-xs font-bold leading-none">{slot.start}</span>
                      <span className="mt-0.5 text-[9px] opacity-80">{slot.end}</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold">{subject}</p>
                      <p className="text-xs text-dark-400">{room}</p>
                    </div>
                    <Badge tone={done ? 'success' : 'primary'}>{done ? 'Completed' : 'Upcoming'}</Badge>
                  </div>
                );
              })}
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between p-5 pb-3">
              <h3 className="text-base font-semibold">Upcoming Deadlines</h3>
              <Link to="/student/assignments" className="inline-flex items-center gap-1 text-xs font-semibold text-primary-600 hover:underline dark:text-primary-400">
                All assignments <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
            <div className="space-y-3 p-5 pt-2">
              {pending.slice(0, 4).map((a) => (
                <div key={a.id} className="flex items-center gap-4 rounded-2xl border border-dark-100 p-3.5 dark:border-dark-800">
                  <span className={cn('flex h-10 w-10 shrink-0 items-center justify-center rounded-xl', a.status === 'overdue' ? 'bg-danger/10 text-danger' : 'bg-accent-50 text-accent-600 dark:bg-accent-900/30 dark:text-accent-400')}>
                    {a.status === 'overdue' ? <AlertTriangle className="h-5 w-5" /> : <Clock className="h-5 w-5" />}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{a.title}</p>
                    <p className="text-xs text-dark-400">Due {a.dueDate} · {a.totalMarks} marks</p>
                  </div>
                  <Badge tone={a.status === 'overdue' ? 'danger' : 'accent'}>{a.status}</Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold">Attendance</h3>
                <p className="text-xs text-dark-400">Above minimum 75%</p>
              </div>
              <Badge tone="success">Healthy</Badge>
            </div>
            <div className="mt-2">
              <RadialProgressChart value={attendance} label="Overall" color="#2563EB" />
            </div>
            <div className="mt-1 space-y-2.5">
              {attendanceSummary.slice(0, 3).map((s) => (
                <div key={s.subjectId}>
                  <div className="mb-1 flex items-center justify-between text-xs">
                    <span className="truncate font-medium">{s.subjectName}</span>
                    <span className={cn('font-semibold', s.percentage >= 75 ? 'text-success' : 'text-danger')}>{s.percentage}%</span>
                  </div>
                  <ProgressBar value={s.percentage} color={s.percentage >= 75 ? '#22C55E' : '#EF4444'} />
                </div>
              ))}
            </div>
            <Link to="/student/attendance" className="btn-outline mt-5 w-full py-2 text-xs">Attendance Details</Link>
          </Card>

          <Card className="p-5">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-base font-semibold">Upcoming Exams</h3>
              <Link to="/student/exams" className="text-xs font-semibold text-primary-600 hover:underline dark:text-primary-400">View all</Link>
            </div>
            <div className="space-y-3">
              {upcomingExams.map((e) => (
                <div key={e.id} className="flex items-start gap-3 rounded-xl bg-dark-50 p-3 dark:bg-dark-800">
                  <CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-primary-600 dark:text-primary-400" />
                  <div>
                    <p className="text-sm font-medium leading-snug">{e.name}</p>
                    <p className="text-xs text-dark-400">{e.date} · {e.time} · {e.room}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-5">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-base font-semibold">Recent Activity</h3>
            </div>
            <div className="space-y-3">
              {notifications.slice(0, 4).map((n) => (
                <div key={n.id} className="flex items-start gap-3">
                  <span className={cn('mt-1 h-2 w-2 shrink-0 rounded-full', n.read ? 'bg-dark-200 dark:bg-dark-600' : 'bg-primary-600')} />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{n.title}</p>
                    <p className="text-[11px] text-dark-400">{timeAgo(n.createdAt)}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="overflow-hidden border-secondary-200 bg-gradient-to-br from-secondary-50 to-primary-50 dark:border-secondary-900/50 dark:from-secondary-900/20 dark:to-primary-900/20">
            <div className="flex items-start gap-4 p-5">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-600 to-secondary-500 text-white shadow-glow">
                <Sparkles className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-semibold">AI Study Insight</p>
                <p className="mt-1 text-xs leading-relaxed text-dark-500 dark:text-dark-300">
                  You've been most consistent in <strong>Machine Learning</strong> (95% attendance). Your <strong>NLP</strong> attendance (83%) could cost 2 marks in internals — focus this week.
                </p>
                <Link to="/student/attendance" className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-primary-600 dark:text-primary-400">
                  <TrendingUp className="h-3.5 w-3.5" /> Improve now
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
