import { motion } from 'framer-motion';
import { ArrowRight, Award, Banknote, Briefcase, Building2, MapPin, Target } from 'lucide-react';
import { PublicPage, PageBanner } from './PublicPage';
import { SectionHeading, Card, Badge } from '../../components/ui';
import { companies } from '../../data/mock';
import { formatINR } from '../../utils';

const stats = [
  { label: 'Placement Rate', value: '92%', icon: Target },
  { label: 'Average Package', value: '₹7.8 LPA', icon: Banknote },
  { label: 'Highest Package', value: '₹52 LPA', icon: Award },
  { label: 'Companies', value: '218+', icon: Building2 },
];

export default function PlacementsPage() {
  return (
    <PublicPage
      title="Placements"
      description="92% placement rate at CUTM — 218+ recruiters including Amazon, TCS, Infosys, Deloitte. Average package ₹7.8 LPA."
    >
      <PageBanner title="Placement Cell" subtitle="From mock interviews to multiple offers — our placement engine runs year-round, not just in the final year." />

      <section className="section-pad">
        <div className="container-page">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s, i) => (
              <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.08 }}>
                <Card className="card-hover p-6 text-center">
                  <s.icon className="mx-auto h-7 w-7 text-primary-600 dark:text-primary-400" />
                  <p className="mt-3 font-display text-3xl font-bold gradient-text">{s.value}</p>
                  <p className="mt-1 text-xs font-medium uppercase tracking-wide text-dark-400">{s.label}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="container-page">
          <SectionHeading eyebrow="Batch 2025-26" title={<>Recruiters That <span className="gradient-text">Trust CUTM</span></>} subtitle="A snapshot of the 218 companies that hired from our campuses this year." />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {companies.map((c, i) => (
              <motion.div key={c.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-30px' }} transition={{ duration: 0.4, delay: (i % 3) * 0.06 }}>
                <Card className="card-hover flex items-start gap-4 p-5">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary-50 to-secondary-50 font-display text-xs font-bold text-primary-700 dark:from-primary-900/40 dark:to-secondary-900/40 dark:text-primary-300">
                    {c.name.slice(0, 3).toUpperCase()}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="truncate font-semibold">{c.name}</h3>
                      <Badge tone="neutral">{c.hiringYear}</Badge>
                    </div>
                    <p className="mt-0.5 text-xs text-dark-400">{c.industry}</p>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {c.roles.map((r) => (
                        <span key={r} className="rounded-full bg-dark-100 px-2 py-0.5 text-[10px] font-medium text-dark-500 dark:bg-dark-800 dark:text-dark-300">{r}</span>
                      ))}
                    </div>
                    <p className="mt-2 flex items-center gap-1 text-xs font-semibold text-secondary-600 dark:text-secondary-400">
                      <Banknote className="h-3.5 w-3.5" /> Avg {formatINR(c.avgPackage)}
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-20 bg-gradient-to-b from-transparent via-secondary-50/50 to-transparent dark:via-secondary-900/10">
        <div className="container-page">
          <SectionHeading eyebrow="How We Prepare You" title={<>The CUTM <span className="gradient-text">Placement Engine</span></>} />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Briefcase, title: 'Skill Certifications', desc: '20+ industry certifications (AWS, Azure, Google, Cisco) from year one.' },
              { icon: Target, title: 'Mock Interview Bootcamps', desc: '50+ mock rounds with real recruiters before the actual season.' },
              { icon: Building2, title: 'Pre-Placement Talks', desc: 'PPTs and company-specific prep sessions throughout the year.' },
              { icon: MapPin, title: 'Career Fair', desc: 'An annual mega drive hosting 100+ companies on campus.' },
            ].map((f, i) => (
              <motion.div key={f.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.07 }}>
                <Card className="card-hover h-full p-6">
                  <f.icon className="h-7 w-7 text-primary-600 dark:text-primary-400" />
                  <h3 className="mt-4 font-semibold">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-dark-500 dark:text-dark-400">{f.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <a href="#contact" className="btn-primary">For Recruiters: Hire from CUTM <ArrowRight className="h-4 w-4" /></a>
          </div>
        </div>
      </section>
    </PublicPage>
  );
}
