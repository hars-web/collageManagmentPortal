import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, BadgeCheck, Banknote, BookOpen, CheckCircle2, Clock, GraduationCap, Users } from 'lucide-react';
import { PublicPage, PageBanner } from './PublicPage';
import { SectionHeading, Card, Badge, Tabs, TabPanel, Input, Select, Button, Accordion } from '../../components/ui';
import { courses, departments } from '../../data/mock';
import { formatINR } from '../../utils';

export default function CoursesPage() {
  const [level, setLevel] = useState('All');
  const [dept, setDept] = useState('All');
  const [query, setQuery] = useState('');

  const filtered = courses.filter((c) => {
    const okLevel = level === 'All' || c.level === level;
    const okDept = dept === 'All' || c.departmentId === dept;
    const okQuery = `${c.name} ${c.code} ${c.specializations.join(' ')}`.toLowerCase().includes(query.toLowerCase());
    return okLevel && okDept && okQuery;
  });

  return (
    <PublicPage
      title="Courses"
      description="Explore 120+ UG, PG and PhD programmes at CUTM — B.Tech, MBA, B.Sc Agriculture, Pharmacy, Law and more, co-designed with industry."
    >
      <PageBanner title="Programmes & Courses" subtitle="120+ industry-aligned programmes across engineering, management, agriculture, pharmacy, health sciences, law and vocational studies." />

      <section className="section-pad">
        <div className="container-page">
          <div className="glass sticky top-20 z-20 mb-8 rounded-2xl p-4 shadow-card">
            <div className="grid gap-3 md:grid-cols-[1fr_180px_180px]">
              <Input placeholder="Search course, code, specialization…" value={query} onChange={(e) => setQuery(e.target.value)} leftIcon={<BookOpen className="h-4 w-4" />} aria-label="Search courses" />
              <Select value={level} onChange={(e) => setLevel(e.target.value)} aria-label="Filter by level">
                <option value="All">All Levels</option>
                <option value="UG">Undergraduate</option>
                <option value="PG">Postgraduate</option>
                <option value="PhD">Doctoral</option>
              </Select>
              <Select value={dept} onChange={(e) => setDept(e.target.value)} aria-label="Filter by department">
                <option value="All">All Departments</option>
                {departments.map((d) => (
                  <option key={d.id} value={d.id}>{d.shortName}</option>
                ))}
              </Select>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((c, i) => (
              <motion.div key={c.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-30px' }} transition={{ duration: 0.4, delay: (i % 3) * 0.06 }}>
                <Card className="card-hover flex h-full flex-col p-6">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-primary-50 px-3 py-1 text-xs font-bold text-primary-700 dark:bg-primary-900/40 dark:text-primary-300">{c.level}</span>
                    <span className="text-xs text-dark-400">{c.code}</span>
                  </div>
                  <h3 className="mt-4 font-display text-lg font-semibold leading-snug">{c.name}</h3>
                  <p className="mt-2 line-clamp-2 text-sm text-dark-500 dark:text-dark-400">{c.overview}</p>
                  <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                    <div className="rounded-xl bg-dark-50 p-2.5 dark:bg-dark-800">
                      <p className="flex items-center justify-center gap-1 text-xs font-semibold"><Clock className="h-3 w-3 text-primary-600" />{c.duration.split(' ')[0]} yrs</p>
                      <p className="mt-0.5 text-[10px] text-dark-400">Duration</p>
                    </div>
                    <div className="rounded-xl bg-dark-50 p-2.5 dark:bg-dark-800">
                      <p className="text-xs font-semibold text-secondary-600 dark:text-secondary-400">{c.seats}</p>
                      <p className="mt-0.5 text-[10px] text-dark-400">Seats</p>
                    </div>
                    <div className="rounded-xl bg-dark-50 p-2.5 dark:bg-dark-800">
                      <p className="flex items-center justify-center gap-1 text-xs font-semibold"><Banknote className="h-3 w-3 text-accent-500" />{formatINR(c.feePerYear / 100000)}L</p>
                      <p className="mt-0.5 text-[10px] text-dark-400">Fee/yr</p>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {c.specializations.slice(0, 3).map((s) => (
                      <span key={s} className="rounded-full bg-secondary-50 px-2.5 py-0.5 text-[11px] font-medium text-secondary-700 dark:bg-secondary-900/40 dark:text-secondary-300">{s}</span>
                    ))}
                  </div>
                  <div className="mt-5 flex items-center justify-between border-t border-dark-100 pt-4 dark:border-dark-800">
                    <span className="text-xs text-dark-400">{departments.find((d) => d.id === c.departmentId)?.shortName}</span>
                    <Link to={`/courses/${c.id}`} className="btn-primary px-4 py-2 text-xs">View Details</Link>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
          {filtered.length === 0 && (
            <Card className="p-12 text-center">
              <p className="text-lg font-semibold">No courses match your filters</p>
              <p className="mt-1 text-sm text-dark-400">Try clearing the search or choosing different filters.</p>
            </Card>
          )}
        </div>
      </section>

      <section className="pb-20">
        <div className="container-page">
          <Card className="flex flex-col items-center justify-between gap-5 p-8 text-center sm:flex-row sm:text-left">
            <div>
              <h3 className="font-display text-xl font-bold">Not sure which course fits?</h3>
              <p className="mt-1 text-sm text-dark-500 dark:text-dark-400">Talk to our academic counsellors for free personalised guidance.</p>
            </div>
            <Link to="/contact" className="btn-secondary whitespace-nowrap">Get Free Counselling</Link>
          </Card>
        </div>
      </section>
    </PublicPage>
  );
}

export function CourseDetailPage() {
  const { courseId } = useParams();
  const course = courses.find((c) => c.id === courseId) ?? courses[0];
  const dept = departments.find((d) => d.id === course.departmentId);
  const [tab, setTab] = useState('overview');
  const [form, setForm] = useState({ name: '', email: '', phone: '', stream: '' });

  return (
    <PublicPage title={course.name} description={course.overview}>
      <PageBanner title={course.name} subtitle={`${course.level} · ${course.duration} · ${dept?.name}`}>
        <div className="mt-6 flex flex-wrap gap-2">
          <Badge tone="secondary">{course.code}</Badge>
          <Badge tone="accent">{course.duration}</Badge>
          <Badge tone="primary">{course.seats} seats</Badge>
          <Badge tone="success">Fee: {formatINR(course.feePerYear)}/yr</Badge>
        </div>
      </PageBanner>

      <section className="section-pad">
        <div className="container-page">
          <Link to="/courses" className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-primary-600 hover:underline dark:text-primary-400">
            <ArrowLeft className="h-4 w-4" /> All Courses
          </Link>
          <Tabs
            value={tab}
            onChange={setTab}
            tabs={[
              { value: 'overview', label: 'Overview' },
              { value: 'curriculum', label: 'Curriculum & Specialisations' },
              { value: 'careers', label: 'Careers' },
              { value: 'apply', label: 'Apply' },
            ]}
            className="mb-8 w-full max-w-xl"
          />

          <TabPanel value="overview" active={tab}>
            <div className="grid gap-8 lg:grid-cols-3">
              <div className="space-y-6 lg:col-span-2">
                <Card className="p-6">
                  <h3 className="text-lg font-semibold">About the Programme</h3>
                  <p className="mt-3 leading-relaxed text-dark-500 dark:text-dark-400">{course.overview}</p>
                  <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {[
                      { icon: Clock, label: 'Duration', value: course.duration },
                      { icon: Users, label: 'Seats', value: String(course.seats) },
                      { icon: GraduationCap, label: 'Level', value: course.level },
                      { icon: Banknote, label: 'Fee / Year', value: formatINR(course.feePerYear) },
                    ].map((s) => (
                      <div key={s.label} className="rounded-xl bg-dark-50 p-3 text-center dark:bg-dark-800">
                        <s.icon className="mx-auto h-4 w-4 text-primary-600 dark:text-primary-400" />
                        <p className="mt-1.5 text-sm font-bold">{s.value}</p>
                        <p className="text-[10px] text-dark-400">{s.label}</p>
                      </div>
                    ))}
                  </div>
                </Card>
                <Card className="p-6">
                  <h3 className="text-lg font-semibold">Eligibility</h3>
                  <p className="mt-2 text-sm text-dark-600 dark:text-dark-300">{course.eligibility}</p>
                  <h3 className="mt-6 text-lg font-semibold">Why study this at CUTM?</h3>
                  <ul className="mt-3 space-y-2.5">
                    {[
                      'Curriculum co-designed with 150+ industry partners',
                      '4 industry internships + capstone projects guaranteed',
                      'Dedicated placement cell with mock drives and soft-skill training',
                      'Access to modern labs, research centres and innovation hub',
                      'Scholarships up to 100% based on merit and entrance scores',
                    ].map((point) => (
                      <li key={point} className="flex items-start gap-2.5 text-sm text-dark-600 dark:text-dark-300">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" /> {point}
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>
              <div className="space-y-6">
                <Card className="overflow-hidden">
                  <img src="/images/building.jpg" alt="CUTM classroom" className="h-40 w-full object-cover" loading="lazy" />
                  <div className="p-5">
                    <p className="text-xs font-semibold uppercase tracking-wide text-primary-600 dark:text-primary-400">{dept?.shortName} Department</p>
                    <h4 className="mt-1 font-semibold">{dept?.name}</h4>
                    <p className="mt-1 text-xs text-dark-400">{dept?.students.toLocaleString('en-IN')} students · {dept?.placementRate}% placement</p>
                    <Link to={`/departments/${dept?.id}`} className="btn-outline mt-4 w-full py-2 text-xs">Visit Department</Link>
                  </div>
                </Card>
                <Card className="p-5">
                  <h4 className="font-semibold">Admission Timeline</h4>
                  <ul className="mt-3 space-y-3 text-sm">
                    <li className="flex items-center justify-between"><span className="text-dark-500 dark:text-dark-400">Applications open</span><Badge tone="success">Aug 2026</Badge></li>
                    <li className="flex items-center justify-between"><span className="text-dark-500 dark:text-dark-400">Entrance test</span><Badge tone="accent">Oct 2026</Badge></li>
                    <li className="flex items-center justify-between"><span className="text-dark-500 dark:text-dark-400">Classes begin</span><Badge tone="primary">Aug 2027</Badge></li>
                  </ul>
                </Card>
              </div>
            </div>
          </TabPanel>

          <TabPanel value="curriculum" active={tab}>
            <Card className="p-6">
              <h3 className="text-lg font-semibold">Specialisations</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {course.specializations.map((s) => (
                  <Badge key={s} tone="secondary" className="px-4 py-1.5 text-sm">{s}</Badge>
                ))}
              </div>
              <h3 className="mt-8 text-lg font-semibold">Semester-wise Structure</h3>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                {[1, 2, 3, 4, 5, 6, 7, 8].slice(0, course.level === 'PG' ? 4 : course.level === 'PhD' ? 2 : 8).map((sem) => (
                  <div key={sem} className="rounded-2xl border border-dark-100 p-4 dark:border-dark-800">
                    <p className="text-xs font-bold uppercase tracking-wide text-primary-600 dark:text-primary-400">Semester {sem}</p>
                    <ul className="mt-2 space-y-1 text-sm text-dark-500 dark:text-dark-400">
                      <li>Core theory subjects · {sem === 1 || sem === 2 ? '4' : '3'} courses</li>
                      <li>{sem === 1 ? 'Skill lab + induction' : sem % 2 === 0 ? 'Industry internship (summer)' : 'Lab practicum'}</li>
                      <li>{sem === 8 ? 'Capstone project & placement drive' : 'Minor project'}</li>
                    </ul>
                  </div>
                ))}
              </div>
            </Card>
          </TabPanel>

          <TabPanel value="careers" active={tab}>
            <div className="grid gap-6 lg:grid-cols-2">
              <Card className="p-6">
                <h3 className="text-lg font-semibold">Career Paths</h3>
                <div className="mt-4 space-y-3">
                  {course.careerPaths.map((path, i) => (
                    <div key={path} className="flex items-center gap-3 rounded-xl bg-dark-50 p-3.5 dark:bg-dark-800">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary-600 to-secondary-500 text-xs font-bold text-white">{i + 1}</span>
                      <span className="text-sm font-medium">{path}</span>
                    </div>
                  ))}
                </div>
              </Card>
              <Card className="p-6">
                <h3 className="text-lg font-semibold">Placement Snapshot for this Programme</h3>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-success/10 p-4 text-center">
                    <p className="font-display text-2xl font-bold text-success">{dept?.placementRate}%</p>
                    <p className="text-xs text-dark-500 dark:text-dark-400">Placement rate</p>
                  </div>
                  <div className="rounded-xl bg-primary-50 p-4 text-center dark:bg-primary-900/30">
                    <p className="font-display text-2xl font-bold text-primary-600 dark:text-primary-400">₹7.8L</p>
                    <p className="text-xs text-dark-500 dark:text-dark-400">Avg. package</p>
                  </div>
                  <div className="col-span-2 rounded-xl bg-accent-50 p-4 text-center dark:bg-accent-900/20">
                    <p className="font-display text-2xl font-bold text-accent-600 dark:text-accent-400">₹52L</p>
                    <p className="text-xs text-dark-500 dark:text-dark-400">Highest package offered in this domain</p>
                  </div>
                </div>
                <p className="mt-4 flex items-center gap-2 text-sm text-dark-500 dark:text-dark-400"><BadgeCheck className="h-4 w-4 text-secondary-600" /> Top recruiters: TCS, Infosys, Amazon, Deloitte, Bosch, Mu Sigma</p>
              </Card>
            </div>
          </TabPanel>

          <TabPanel value="apply" active={tab}>
            <div className="mx-auto max-w-xl">
              <Card className="p-6 sm:p-8">
                <h3 className="text-lg font-semibold">Apply for {course.code}</h3>
                <p className="mt-1 text-sm text-dark-400">Fill this quick form — our admissions team will call you within 24 hours.</p>
                <form className="mt-6 space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <Input label="Full Name" required placeholder="e.g. Aryan Behera" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Input label="Email" type="email" required placeholder="you@example.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                    <Input label="Phone" type="tel" required placeholder="+91 98765 43210" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                  </div>
                  <Select label="Stream in 10+2 / Graduation" required value={form.stream} onChange={(e) => setForm({ ...form, stream: e.target.value })}>
                    <option value="">Select stream</option>
                    <option>Science — PCM</option>
                    <option>Science — PCB</option>
                    <option>Commerce</option>
                    <option>Arts / Humanities</option>
                  </Select>
                  <Button type="submit" className="w-full" size="lg">Submit Application Request</Button>
                </form>
              </Card>
            </div>
          </TabPanel>

          <div className="mt-10">
            <Accordion
              items={[
                { title: 'Can I get admission without an entrance exam?', content: 'Yes. For most UG programmes, JEE/OJEE scores are optional — CUTM conducts its own entrance test and personal interview. Merit-based direct admission is available for qualifying scores.' },
                { title: 'Are hostel facilities guaranteed?', content: 'Hostel accommodation is available on a first-come-first-served basis. Fees include mess, Wi-Fi, gym, laundry and 24×7 security. 8,000+ rooms across 5 campuses.' },
                { title: 'What scholarships apply to this course?', content: 'Merit scholarships up to 100% tuition waiver, state E-Medhabruti, reserved category schemes and industry fellowships. Automatic consideration at the time of admission.' },
              ]}
            />
          </div>
        </div>
      </section>
    </PublicPage>
  );
}
