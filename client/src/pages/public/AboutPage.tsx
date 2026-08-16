import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Award, Building2, Clock, Globe2, Handshake, MapPin, Target, TrendingUp } from 'lucide-react';
import { PublicPage, PageBanner } from './PublicPage';
import { SectionHeading, Card } from '../../components/ui';
import { departments, university } from '../../data/mock';

const milestones = [
  { year: '2005', text: 'University established with the vision of "learning by doing" in Odisha.' },
  { year: '2010', text: 'NAAC "A" grade; B.Tech programmes approved by AICTE with 100% faculty qualification.' },
  { year: '2015', text: 'First university in India to launch B.Tech with Vocational courses; 50-acre agri campus opens.' },
  { year: '2018', text: 'CUTM Innovation Hub launches; 15 startups incubated in year one.' },
  { year: '2021', text: 'NAAC A++ grade. NIRF ranked in Engineering, Pharmacy and Management categories.' },
  { year: '2024', text: '5 MW solar micro-grid commissioned; 18,000+ students across 5 campuses.' },
  { year: '2026', text: '92% placement rate, 85+ patents, 150+ industry MOUs, 40+ funded startups.' },
];

const pillars = [
  { icon: Target, title: 'Learning by Doing', desc: '80% of credits involve labs, live projects, industry problems and on-campus enterprises.' },
  { icon: Handshake, title: 'Industry Integration', desc: 'Curriculum co-designed with 150+ partners; every student completes 4 industry internships.' },
  { icon: TrendingUp, title: 'Entrepreneurship First', desc: 'Every student runs a micro-enterprise before graduation through our 5P model.' },
  { icon: Globe2, title: 'Global Exposure', desc: 'MoUs with universities in USA, Germany, Japan and Singapore for exchange and research.' },
];

export default function AboutPage() {
  return (
    <PublicPage
      title="About University"
      description={`${university.shortName} is a NAAC A++ accredited university with 18,000+ students, 14 departments and 92% placements. Learn by doing — earn by leading.`}
    >
      <PageBanner title="About Centurion University" subtitle="A 20-year journey of building India's most industry-ready graduates through an uncompromising learning-by-doing philosophy." />

      <section className="section-pad">
        <div className="container-page">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <SectionHeading align="left" eyebrow="Who We Are" title={<>A University That <span className="gradient-text">Builds Careers</span></>} className="mb-6" />
              <div className="space-y-4 text-sm leading-relaxed text-dark-500 dark:text-dark-400 sm:text-base">
                <p>
                  Established in 2005, Centurion University of Technology and Management (CUTM) is one of Odisha's largest
                  private universities — a NAAC A++ accredited institution with 18,000+ students, 1,200+ faculty and five campuses.
                </p>
                <p>
                  Our unique <strong className="text-dark-700 dark:text-dark-200">"Learn by Doing"</strong> model means students don't just study
                  technology — they build solar grids, run organic farms, code for industry partners and launch startups.
                  Over <strong className="text-dark-700 dark:text-dark-200">85 patents</strong> and <strong className="text-dark-700 dark:text-dark-200">40+ funded startups</strong> have emerged from our campuses.
                </p>
                <p>
                  With a 92% placement record, 218+ recruiters and an average package of ₹7.8 LPA, CUTM graduates work at
                  Amazon, TCS, Infosys, Deloitte, Bosch, Dr. Reddy's and hundreds of other organisations worldwide.
                </p>
              </div>
              <div className="mt-8 grid grid-cols-3 gap-4">
                {[
                  { icon: Award, label: 'NAAC A++' },
                  { icon: Building2, label: '5 Campuses' },
                  { icon: Clock, label: '20+ Years' },
                ].map((s) => (
                  <div key={s.label} className="card flex flex-col items-center gap-2 p-4 text-center">
                    <s.icon className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                    <span className="text-xs font-semibold">{s.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <div className="relative">
                <img src="/images/students.jpg" alt="Students collaborating at CUTM" className="aspect-[4/3] w-full rounded-3xl object-cover shadow-card" loading="lazy" />
                <div className="glass absolute -bottom-6 -right-4 hidden rounded-2xl p-4 shadow-card sm:block">
                  <p className="font-display text-2xl font-bold text-primary-600 dark:text-primary-400">92%</p>
                  <p className="text-xs font-medium text-dark-500 dark:text-dark-400">Placement Record 2025</p>
                </div>
                <div className="glass absolute -top-5 -left-4 hidden rounded-2xl p-4 shadow-card sm:block">
                  <p className="font-display text-2xl font-bold text-secondary-600 dark:text-secondary-400">₹52 LPA</p>
                  <p className="text-xs font-medium text-dark-500 dark:text-dark-400">Highest Package</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section-pad bg-gradient-to-b from-transparent via-primary-50/40 to-transparent dark:via-primary-900/10">
        <div className="container-page">
          <SectionHeading eyebrow="Our Philosophy" title={<>Four Pillars of the <span className="gradient-text">CUTM Model</span></>} />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((p, i) => (
              <motion.div key={p.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.45, delay: i * 0.08 }}>
                <Card className="card-hover h-full p-6 text-center">
                  <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-600 to-secondary-500 text-white shadow-glow">
                    <p.icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-4 font-semibold">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-dark-500 dark:text-dark-400">{p.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-page">
          <SectionHeading eyebrow="Timeline" title={<>20 Years of <span className="gradient-text">Milestones</span></>} />
          <div className="mx-auto max-w-3xl">
            {milestones.map((m, i) => (
              <motion.div key={m.year} initial={{ opacity: 0, x: i % 2 ? 24 : -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.4 }} className="relative border-l-2 border-primary-200 pl-8 pb-8 last:pb-0 dark:border-primary-800">
                <span className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-gradient-to-br from-primary-600 to-secondary-500 ring-4 ring-primary-100 dark:ring-primary-900/50" />
                <span className="font-display text-lg font-bold text-primary-600 dark:text-primary-400">{m.year}</span>
                <p className="mt-1 text-sm leading-relaxed text-dark-600 dark:text-dark-300">{m.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-dark-900 text-white">
        <div className="container-page">
          <SectionHeading light eyebrow="Leadership & Governance" title={<>Guided by Vision, <span className="text-secondary-300">Backed by Systems</span></>} subtitle="Our leadership team blends academic excellence with entrepreneurial energy." />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { name: 'Prof. D.N. Rao', role: 'Founder & Chancellor', desc: 'Former Professor at IIT Kharagpur; architect of the learning-by-doing model.' },
              { name: 'Prof. Supriya Pattanayak', role: 'Vice Chancellor', desc: 'Educationist with 30+ years across IIMs and international universities.' },
              { name: 'Prof. R.N. Mohanty', role: 'Pro Vice Chancellor', desc: 'Leads curriculum innovation and industry partnerships.' },
              { name: 'Mr. A. Mohanty', role: 'Registrar', desc: 'Oversees academic administration and statutory compliance.' },
              { name: 'Dr. S.K. Panda', role: 'Dean — R&D', desc: 'Leads 85+ patents and funded research programmes.' },
              { name: 'Ms. S. Das', role: 'Dean — Placements', desc: 'Drives the 92% placement engine and 218-company network.' },
            ].map((p, i) => (
              <motion.div key={p.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.06 }}>
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition-all hover:border-secondary-400/50 hover:bg-white/[0.07]">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-600 to-secondary-600 font-display text-lg font-bold text-white">
                    {p.name.split(' ').slice(-1)[0][0]}
                  </span>
                  <h3 className="mt-4 font-semibold">{p.name}</h3>
                  <p className="text-xs font-semibold uppercase tracking-wide text-secondary-300">{p.role}</p>
                  <p className="mt-2 text-sm text-slate-400">{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-page">
          <SectionHeading eyebrow="Departments" title={<>Explore Our <span className="gradient-text">Departments</span></>} />
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
            {departments.slice(0, 10).map((d, i) => (
              <motion.div key={d.id} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.35, delay: i * 0.04 }}>
                <Link to={`/departments/${d.id}`} className="card card-hover flex h-full flex-col items-center gap-2 p-4 text-center">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold text-white" style={{ background: d.color }}>{d.shortName.slice(0, 3)}</span>
                  <span className="text-xs font-semibold leading-snug">{d.name}</span>
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link to="/departments" className="btn-primary">View All Departments <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="container-page">
          <Card className="flex flex-col items-center justify-between gap-6 p-8 sm:flex-row">
            <div className="flex items-start gap-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-600 to-secondary-500 text-white shadow-glow"><MapPin className="h-6 w-6" /></span>
              <div>
                <h3 className="text-lg font-semibold">Visit Our Campus</h3>
                <p className="mt-1 max-w-lg text-sm text-dark-500 dark:text-dark-400">Schedule a campus tour and experience the CUTM difference first-hand. Open all weekends.</p>
              </div>
            </div>
            <Link to="/contact" className="btn-primary whitespace-nowrap">Book a Campus Tour</Link>
          </Card>
        </div>
      </section>
    </PublicPage>
  );
}
