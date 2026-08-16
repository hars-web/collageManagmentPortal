import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, BookOpen, Building2, Cpu, GraduationCap, Users } from 'lucide-react';
import { PublicPage, PageBanner } from './PublicPage';
import { SectionHeading, Card, Badge, StatCard } from '../../components/ui';
import { courses, departments, facultyMembers } from '../../data/mock';

export default function DepartmentsPage() {
  return (
    <PublicPage
      title="Departments"
      description="14 academic departments at CUTM — each with modern labs, expert faculty and industry partnerships."
    >
      <PageBanner title="Academic Departments" subtitle="14 departments, each built like a mini industry — with dedicated labs, research centres and corporate partners." />
      <section className="section-pad">
        <div className="container-page">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {departments.map((d, i) => (
              <motion.div key={d.id} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.45, delay: (i % 3) * 0.07 }}>
                <Card className="card-hover group h-full overflow-hidden">
                  <div className="h-1.5 w-full" style={{ background: `linear-gradient(90deg, ${d.color}, transparent)` }} />
                  <div className="p-6">
                    <div className="flex items-start justify-between">
                      <span className="flex h-12 w-12 items-center justify-center rounded-2xl text-lg font-bold text-white shadow-soft transition-transform group-hover:scale-110" style={{ background: d.color }}>
                        {d.shortName.slice(0, 3)}
                      </span>
                      <Badge tone="success">{d.placementRate}% placed</Badge>
                    </div>
                    <h3 className="mt-4 font-display text-lg font-semibold">{d.name}</h3>
                    <p className="mt-2 line-clamp-3 text-sm text-dark-500 dark:text-dark-400">{d.description}</p>
                    <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
                      <div className="rounded-lg bg-dark-50 py-2 dark:bg-dark-800"><p className="font-bold">{d.students.toLocaleString('en-IN')}</p><p className="text-[10px] text-dark-400">Students</p></div>
                      <div className="rounded-lg bg-dark-50 py-2 dark:bg-dark-800"><p className="font-bold">{d.faculty}</p><p className="text-[10px] text-dark-400">Faculty</p></div>
                      <div className="rounded-lg bg-dark-50 py-2 dark:bg-dark-800"><p className="font-bold">{d.courses}</p><p className="text-[10px] text-dark-400">Courses</p></div>
                    </div>
                    <div className="mt-5 flex items-center justify-between border-t border-dark-100 pt-4 dark:border-dark-800">
                      <span className="text-xs text-dark-400">HOD: {d.hod.split(' ').slice(0, 2).join(' ')}</span>
                      <Link to={`/departments/${d.id}`} className="inline-flex items-center gap-1 text-xs font-bold text-primary-600 dark:text-primary-400">
                        Explore <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                      </Link>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PublicPage>
  );
}

export function DepartmentDetailPage() {
  const { deptId } = useParams();
  const dept = departments.find((d) => d.id === deptId) ?? departments[0];
  const deptCourses = courses.filter((c) => c.departmentId === dept.id);
  const deptFaculty = facultyMembers.filter((f) => f.departmentId === dept.id);

  return (
    <PublicPage title={`${dept.name} Department`} description={dept.description}>
      <PageBanner title={dept.name} subtitle={`${dept.students.toLocaleString('en-IN')} students · ${dept.faculty} faculty · ${dept.placementRate}% placement · Established ${dept.established}`}>
        <div className="mt-6 flex flex-wrap gap-2">
          <Badge tone="primary">Code: {dept.code}</Badge>
          <Badge tone="secondary">HOD: {dept.hod}</Badge>
        </div>
      </PageBanner>

      <section className="section-pad">
        <div className="container-page">
          <Link to="/departments" className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-primary-600 hover:underline dark:text-primary-400">
            <ArrowLeft className="h-4 w-4" /> All Departments
          </Link>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard label="Students" value={dept.students} icon={<Users className="h-5 w-5" />} iconClass="primary" format="plain" />
            <StatCard label="Faculty Members" value={dept.faculty} icon={<GraduationCap className="h-5 w-5" />} iconClass="secondary" format="plain" />
            <StatCard label="Courses Offered" value={dept.courses} icon={<BookOpen className="h-5 w-5" />} iconClass="accent" format="plain" />
            <StatCard label="Placement Rate" value={dept.placementRate} icon={<Cpu className="h-5 w-5" />} iconClass="success" format="percent" />
          </div>

          <div className="mt-12">
            <SectionHeading align="left" eyebrow="Programmes" title={<>Courses in {dept.shortName}</>} className="mb-8" />
            <div className="grid gap-4 md:grid-cols-2">
              {deptCourses.map((c) => (
                <Card key={c.id} className="card-hover p-5">
                  <div className="flex items-center justify-between">
                    <Badge tone="primary">{c.level}</Badge>
                    <span className="text-xs text-dark-400">{c.duration}</span>
                  </div>
                  <Link to={`/courses/${c.id}`} className="mt-3 block font-semibold transition-colors hover:text-primary-600 dark:hover:text-primary-400">{c.name}</Link>
                  <p className="mt-1.5 line-clamp-2 text-sm text-dark-500 dark:text-dark-400">{c.overview}</p>
                </Card>
              ))}
            </div>
          </div>

          <div className="mt-14">
            <SectionHeading align="left" eyebrow="Faculty" title={<>Meet Our {dept.shortName} Faculty</>} className="mb-8" />
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {deptFaculty.slice(0, 6).map((f, i) => (
                <motion.div key={f.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }}>
                  <Card className="card-hover flex items-center gap-4 p-5">
                    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-500 font-display text-lg font-bold text-white">
                      {f.name.split(' ').slice(-1)[0][0]}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate font-semibold">{f.name}</p>
                      <p className="text-xs text-primary-600 dark:text-primary-400">{f.designation}</p>
                      <p className="mt-1 truncate text-xs text-dark-400">{f.specialization} · {f.publications} publications</p>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mt-14 grid gap-4 sm:grid-cols-3">
            {[
              { icon: Building2, title: 'Labs & Centres', desc: 'Dedicated smart labs, research centres and industry-standard equipment.' },
              { icon: Users, title: 'Industry Tie-ups', desc: 'Corporate partners co-teach courses and run joint hackathons and projects.' },
              { icon: Cpu, title: 'Innovation Support', desc: 'Incubation, patent filing and funding support for student projects.' },
            ].map((f, i) => (
              <Card key={i} className="card-hover p-5">
                <f.icon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                <h4 className="mt-3 font-semibold">{f.title}</h4>
                <p className="mt-1.5 text-sm text-dark-500 dark:text-dark-400">{f.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </PublicPage>
  );
}
