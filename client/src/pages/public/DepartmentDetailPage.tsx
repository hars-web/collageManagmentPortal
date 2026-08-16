import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Award, BookOpen, Building2, GraduationCap, Users } from 'lucide-react';
import { PublicPage, PageBanner } from './PublicPage';
import { Card, Badge, ProgressBar } from '../../components/ui';
import { departments, courses, facultyMembers } from '../../data/mock';

export default function DepartmentDetailPage() {
  const { id } = useParams();
  const dept = departments.find((d) => d.id === id) ?? departments[0];
  const deptCourses = courses.filter((c) => c.departmentId === dept.id);
  const deptFaculty = facultyMembers.filter((f) => f.departmentId === dept.id).slice(0, 4);

  return (
    <PublicPage title={`${dept.name} Department`} description={dept.description}>
      <PageBanner title={dept.name} subtitle={dept.description}>
        <div className="mt-5 flex flex-wrap gap-3">
          <Badge tone="light">Est. {dept.established}</Badge>
          <Badge tone="light">{dept.students.toLocaleString('en-IN')} students</Badge>
          <Badge tone="light">{dept.faculty} faculty</Badge>
          <Badge tone="light">{dept.placementRate}% placement</Badge>
        </div>
      </PageBanner>

      <section className="container-page py-14">
        <div className="grid gap-4 sm:grid-cols-3">
          <Card className="p-5 text-center"><p className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400"><Users className="h-5 w-5" /></p><p className="mt-2 text-2xl font-bold">{dept.students.toLocaleString('en-IN')}</p><p className="text-xs text-dark-400">Students</p></Card>
          <Card className="p-5 text-center"><p className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-secondary-50 text-secondary-600 dark:bg-secondary-900/30 dark:text-secondary-400"><BookOpen className="h-5 w-5" /></p><p className="mt-2 text-2xl font-bold">{dept.courses}</p><p className="text-xs text-dark-400">Programmes</p></Card>
          <Card className="p-5 text-center"><p className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-accent-50 text-accent-600 dark:bg-accent-900/30 dark:text-accent-400"><GraduationCap className="h-5 w-5" /></p><p className="mt-2 text-2xl font-bold">{dept.placementRate}%</p><p className="text-xs text-dark-400">Placement Rate</p></Card>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="font-display text-2xl font-bold">Programmes Offered</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {deptCourses.map((c) => (
                <Link key={c.id} to={`/courses/${c.id}`} className="card card-hover p-5">
                  <div className="flex items-start justify-between">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary-600 to-secondary-500 text-white"><Award className="h-5 w-5" /></span>
                    <Badge tone="neutral">{c.level}</Badge>
                  </div>
                  <h3 className="mt-3 font-semibold">{c.name}</h3>
                  <p className="mt-1 text-xs text-dark-400">{c.duration} · {c.seats} seats · {c.specializations.length} tracks</p>
                  <p className="mt-3 text-sm text-primary-600 dark:text-primary-400">₹{c.feePerYear.toLocaleString('en-IN')}/yr →</p>
                </Link>
              ))}
              {deptCourses.length === 0 && <Card className="p-8 text-center text-sm text-dark-400">Programme details coming soon.</Card>}
            </div>

            <h2 className="mt-10 font-display text-2xl font-bold">Placement Performance</h2>
            <Card className="mt-5 p-6">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold">{dept.shortName} placement rate</p>
                <Badge tone="success">{dept.placementRate}%</Badge>
              </div>
              <ProgressBar value={dept.placementRate} className="mt-3" />
              <p className="mt-3 text-xs text-dark-400">Top recruiters include TCS, Infosys, Wipro, Amazon, Bosch and industry partners of the department. Dedicated career counselling from semester 3 onwards.</p>
            </Card>
          </div>

          <aside className="space-y-6">
            <Card className="p-6">
              <h3 className="flex items-center gap-2 font-semibold"><Building2 className="h-4 w-4 text-primary-500" /> Head of Department</h3>
              <div className="mt-4 rounded-2xl bg-dark-50 p-4 dark:bg-dark-800">
                <p className="font-bold">{dept.hod}</p>
                <p className="mt-0.5 text-xs text-dark-400">{dept.name} · Est. {dept.established}</p>
              </div>
            </Card>
            <Card className="p-6">
              <h3 className="font-semibold">Key Faculty</h3>
              <div className="mt-4 space-y-4">
                {deptFaculty.map((f) => (
                  <div key={f.id} className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 text-sm font-bold text-white">{f.name.replace(/^(Dr\.|Prof\.)\s*/, '').split(' ').map((n) => n[0]).join('').slice(0, 2)}</span>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">{f.name}</p>
                      <p className="truncate text-xs text-dark-400">{f.designation} · {f.experienceYears} yrs exp</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
            <Link to="/admissions" className="btn-primary w-full py-3">Apply to this Department</Link>
          </aside>
        </div>

        <Link to="/departments" className="mt-10 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 hover:underline dark:text-primary-400">
          <ArrowLeft className="h-4 w-4" /> All Departments
        </Link>
      </section>
    </PublicPage>
  );
}
