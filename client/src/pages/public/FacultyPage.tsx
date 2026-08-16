import { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, BookOpen, Mail, Phone, Search, Star } from 'lucide-react';
import { PublicPage, PageBanner } from './PublicPage';
import { SectionHeading, Card, Input, Badge } from '../../components/ui';
import { departments, facultyMembers } from '../../data/mock';

export default function FacultyPage() {
  const [dept, setDept] = useState('All');
  const [query, setQuery] = useState('');

  const filtered = facultyMembers.filter((f) => {
    const okDept = dept === 'All' || f.departmentId === dept;
    const okQuery = `${f.name} ${f.specialization} ${f.designation}`.toLowerCase().includes(query.toLowerCase());
    return okDept && okQuery;
  });

  return (
    <PublicPage
      title="Faculty"
      description="Meet 1,200+ faculty at CUTM — PhDs from IITs, NITs and IISc with deep industry experience and 2,000+ publications."
    >
      <PageBanner title="Our Faculty" subtitle="1,200+ academicians and industry mentors — most with doctorates from India's finest institutions and real industry experience." />

      <section className="section-pad">
        <div className="container-page">
          <div className="mb-8 grid gap-3 md:grid-cols-[1fr_220px]">
            <Input placeholder="Search by name, specialisation, designation…" value={query} onChange={(e) => setQuery(e.target.value)} leftIcon={<Search className="h-4 w-4" />} aria-label="Search faculty" />
            <select value={dept} onChange={(e) => setDept(e.target.value)} className="input" aria-label="Filter by department">
              <option value="All">All Departments</option>
              {departments.map((d) => (
                <option key={d.id} value={d.id}>{d.shortName}</option>
              ))}
            </select>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((f, i) => {
              const deptInfo = departments.find((d) => d.id === f.departmentId);
              return (
                <motion.div key={f.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-30px' }} transition={{ duration: 0.4, delay: (i % 3) * 0.06 }}>
                  <Card className="card-hover h-full p-6">
                    <div className="flex items-start justify-between">
                      <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-500 font-display text-xl font-bold text-white shadow-soft">
                        {f.name.split(' ').slice(-1)[0][0]}
                      </span>
                      <span className="flex items-center gap-1 rounded-full bg-accent-50 px-2.5 py-1 text-xs font-bold text-accent-700 dark:bg-accent-900/40 dark:text-accent-300">
                        <Star className="h-3 w-3 fill-current" /> {f.rating}
                      </span>
                    </div>
                    <h3 className="mt-4 font-display text-lg font-semibold">{f.name}</h3>
                    <p className="text-sm text-primary-600 dark:text-primary-400">{f.designation}</p>
                    <p className="mt-0.5 text-xs text-dark-400">{deptInfo?.shortName} Department</p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      <Badge tone="secondary">{f.qualification}</Badge>
                      <Badge tone="primary">{f.experienceYears}+ yrs exp</Badge>
                      <Badge tone="accent">{f.publications} publications</Badge>
                    </div>
                    <p className="mt-4 text-sm text-dark-500 dark:text-dark-400">Specialises in <span className="font-medium text-dark-700 dark:text-dark-200">{f.specialization}</span></p>
                    <div className="mt-4 flex items-center gap-3 border-t border-dark-100 pt-4 text-xs text-dark-400 dark:border-dark-800">
                      <span className="flex items-center gap-1.5"><Mail className="h-3.5 w-3.5" /> {f.email}</span>
                      <span className="flex items-center gap-1.5"><Phone className="h-3.5 w-3.5" /> {f.phone}</span>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
          {filtered.length === 0 && <Card className="p-12 text-center text-sm text-dark-400">No faculty match your search.</Card>}
        </div>
      </section>

      <section className="pb-20">
        <div className="container-page">
          <SectionHeading eyebrow="Faculty Excellence" title={<>Beyond the <span className="gradient-text">Classroom</span></>} />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Award, value: '250+', label: 'PhDs from IITs, NITs & IISc' },
              { icon: BookOpen, value: '2,400+', label: 'Publications in reputed journals' },
              { icon: Star, value: '4.6/5', label: 'Average teaching rating' },
              { icon: Mail, value: '1:15', label: 'Faculty-student mentorship ratio' },
            ].map((s, i) => (
              <Card key={i} className="card-hover p-6 text-center">
                <s.icon className="mx-auto h-6 w-6 text-primary-600 dark:text-primary-400" />
                <p className="mt-3 font-display text-2xl font-bold">{s.value}</p>
                <p className="mt-1 text-xs text-dark-400">{s.label}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </PublicPage>
  );
}
