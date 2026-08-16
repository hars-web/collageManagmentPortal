import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Award, Briefcase, Check, Clock, GraduationCap, IndianRupee, Users } from 'lucide-react';
import { PublicPage, PageBanner } from './PublicPage';
import { Card, Badge, Tabs, TabPanel, Accordion } from '../../components/ui';
import { courses } from '../../data/mock';
import { formatINRCrore, cn } from '../../utils';

export default function CourseDetailPage() {
  const { id } = useParams();
  const course = courses.find((c) => c.id === id) ?? courses[0];
  const [tab, setTab] = useState('overview');

  const faqs = [
    { q: 'Is the fee refundable?', a: 'Yes. A full refund (minus ₹5,000 registration fee) is available until 30 days after the start of the semester. After that, the policy follows the university guidelines.' },
    { q: 'Are scholarships applicable?', a: 'Merit, need-based and sports scholarships cover 25%–100% of the tuition fee. E-Medhabruti (Govt. of Odisha) and PMSSS are also accepted.' },
    { q: 'What is the hostel situation?', a: 'Separate hostels for boys and girls with 2/3 sharing options. Wifi, 24×7 security, mess and laundry included in the hostel fee.' },
  ];

  return (
    <PublicPage title={course.name} description={course.overview}>
      <PageBanner title={course.name} subtitle={course.overview}>
        <div className="mt-5 flex flex-wrap gap-3">
          <Badge tone="neutral">{course.code}</Badge>
          <Badge tone="neutral">{course.level}</Badge>
          <Badge tone="neutral">{course.duration}</Badge>
          <Badge tone="neutral">{course.seats} seats</Badge>
        </div>
      </PageBanner>

      <section className="container-page py-14">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <Card>
              <Tabs
                value={tab}
                onChange={setTab}
                tabs={[
                  { value: 'overview', label: 'Overview' },
                  { value: 'curriculum', label: 'Curriculum' },
                  { value: 'careers', label: 'Careers' },
                  { value: 'apply', label: 'Apply' },
                ]}
              />
              <div className="p-6">
                <TabPanel value="overview" active={tab}>
                  <p className="leading-relaxed text-dark-500 dark:text-dark-300">{course.overview}</p>
                  <h3 className="mt-6 font-semibold">Eligibility</h3>
                  <p className="mt-1 text-sm text-dark-500 dark:text-dark-300">{course.eligibility}</p>
                  <h3 className="mt-6 font-semibold">Specialisations</h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {course.specializations.map((s) => (
                      <span key={s} className="rounded-full bg-primary-50 px-3.5 py-1.5 text-xs font-semibold text-primary-700 dark:bg-primary-900/30 dark:text-primary-300">{s}</span>
                    ))}
                  </div>
                  <div className="mt-6 grid gap-3 sm:grid-cols-3">
                    <div className="rounded-2xl bg-dark-50 p-4 text-center dark:bg-dark-800"><p className="flex items-center justify-center gap-1.5 text-lg font-bold text-primary-600 dark:text-primary-400"><GraduationCap className="h-4 w-4" />{course.duration}</p><p className="text-xs text-dark-400">Duration</p></div>
                    <div className="rounded-2xl bg-dark-50 p-4 text-center dark:bg-dark-800"><p className="flex items-center justify-center gap-1.5 text-lg font-bold text-secondary-600 dark:text-secondary-400"><Users className="h-4 w-4" />{course.seats}</p><p className="text-xs text-dark-400">Intake</p></div>
                    <div className="rounded-2xl bg-dark-50 p-4 text-center dark:bg-dark-800"><p className="flex items-center justify-center gap-1.5 text-lg font-bold text-accent-500"><IndianRupee className="h-4 w-4" />{formatINRCrore(course.feePerYear)}</p><p className="text-xs text-dark-400">Per Year</p></div>
                  </div>
                </TabPanel>
                <TabPanel value="curriculum" active={tab}>
                  <h3 className="font-semibold">Semester-wise structure</h3>
                  <p className="mt-1 text-sm text-dark-400">The curriculum is reviewed annually with industry advisory boards and mapped to NEP 2020 credit framework.</p>
                  <Accordion
                    items={[
                      { title: 'Semester 1 — Foundation', content: 'Mathematics for Computing, Programming Essentials, Communication Skills, Physics/Chemistry, Design Thinking + 8-week industry exposure.' },
                      { title: 'Semester 2 — Core Launch', content: 'OOPS, Data Structures, Digital Logic, Linear Algebra, Co-curricular labs and a mini project.' },
                      { title: 'Semester 3 — Specialisation Begins', content: 'Algorithms, DBMS, Operating Systems, electives in the chosen track, hackathon participation.' },
                      { title: 'Semester 4 — Depth & Projects', content: 'Advanced track courses, cloud & DevOps, open electives, capstone project part 1.' },
                    ]}
                  />
                </TabPanel>
                <TabPanel value="careers" active={tab}>
                  <h3 className="font-semibold">Career Pathways</h3>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    {course.careerPaths.map((c) => (
                      <div key={c} className="flex items-center gap-3 rounded-2xl border border-dark-100 p-4 dark:border-dark-800">
                        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-success/10 text-success"><Briefcase className="h-4 w-4" /></span>
                        <p className="text-sm font-medium">{c}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-5 rounded-2xl bg-gradient-to-r from-primary-600 to-secondary-500 p-5 text-white">
                    <p className="font-semibold">Placement record (batch 2025-26)</p>
                    <p className="mt-1 text-sm text-white/80">92% placement · avg ₹6.4 LPA · highest ₹52 LPA · 318 recruiters on campus.</p>
                  </div>
                </TabPanel>
                <TabPanel value="apply" active={tab}>
                  <h3 className="font-semibold">How to apply</h3>
                  <ol className="mt-3 space-y-3">
                    {['Fill the online application on the admissions page', 'Upload documents (marksheet, ID, photo)', 'Take the entrance exam (OJEE/JEE/CUTM-AT) or use a valid national score', 'Get admission confirmation within 7 working days'].map((step, i) => (
                      <li key={step} className="flex items-start gap-3 text-sm">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-600 text-xs font-bold text-white">{i + 1}</span>
                        <span className="mt-0.5 text-dark-500 dark:text-dark-300">{step}</span>
                      </li>
                    ))}
                  </ol>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <Link to="/admissions" className="btn-primary"><Award className="h-4 w-4" /> Start Application</Link>
                    <Link to="/contact" className="btn-outline">Talk to a Counsellor</Link>
                  </div>
                </TabPanel>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold">Frequently Asked Questions</h3>
              <Accordion items={faqs.map((f) => ({ title: f.q, content: f.a }))} />
            </Card>
          </div>

          <aside className="space-y-6">
            <Card className="p-6">
              <h3 className="font-semibold">Fee Structure</h3>
              <div className="mt-4 space-y-3 text-sm">
                {[
                  { label: 'Tuition Fee', value: formatINRCrore(course.feePerYear) },
                  { label: 'Hostel (optional)', value: '₹50,000/yr' },
                  { label: 'Exam & Misc', value: '₹8,000/yr' },
                  { label: 'Total (approx)', value: formatINRCrore(course.feePerYear + 58000), bold: true },
                ].map((f) => (
                  <div key={f.label} className={cn('flex items-center justify-between rounded-xl bg-dark-50 px-4 py-3 dark:bg-dark-800', f.bold && 'ring-1 ring-primary-200 dark:ring-primary-800')}>
                    <span className="text-dark-400">{f.label}</span>
                    <span className={cn('font-bold', f.bold ? 'text-primary-600 dark:text-primary-400' : '')}>{f.value}</span>
                  </div>
                ))}
              </div>
              <Link to="/admissions" className="btn-primary mt-5 w-full py-2.5">Apply Now</Link>
              <Link to="/contact" className="btn-outline mt-3 w-full py-2.5"><Clock className="h-4 w-4" /> Book Campus Visit</Link>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold">Highlights</h3>
              <ul className="mt-4 space-y-3 text-sm">
                {['NAAC A++ accredited university', 'Industry advisory board reviewed curriculum', 'Dedicated placement cell + 318 recruiters', '100% Wi-Fi campus with smart classrooms', 'Startup incubation & seed funding support'].map((h) => (
                  <li key={h} className="flex items-start gap-2.5">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                    <span className="text-dark-500 dark:text-dark-300">{h}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </aside>
        </div>

        <Link to="/courses" className="mt-10 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 hover:underline dark:text-primary-400">
          <ArrowLeft className="h-4 w-4" /> All Courses
        </Link>
      </section>
    </PublicPage>
  );
}
