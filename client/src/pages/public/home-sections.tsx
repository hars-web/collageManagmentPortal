import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Bot,
  Building2,
  CalendarDays,
  ChevronRight,
  Cpu,
  FlaskConical,
  HeartHandshake,
  Home as HomeIcon,
  Leaf,
  Lightbulb,
  Microscope,
  Play,
  Quote,
  Rocket,
  Search,
  ShieldCheck,
  Star,
  Users,
  Video,
} from 'lucide-react';
import { Button, Card, SectionHeading } from '../../components/ui';
import { useCountUp } from '../../hooks';
import {
  companies,
  courses,
  departments,
  events,
  galleryItems,
  news,
  testimonials,
} from '../../data/mock';
import { cn, formatINRCrore } from '../../utils';

export function StatCounter({ value, suffix, format, delay }: { value: number; suffix: string; format?: boolean; delay?: number }) {
  const { value: v, ref } = useCountUp(value, 1800 + delay! * 300, false);
  return (
    <span ref={ref} className="font-display text-2xl font-bold tracking-tight text-dark-900 dark:text-white lg:text-3xl">
      {format ? v.toLocaleString('en-IN') : v}
      <span className="text-primary-600 dark:text-primary-400">{suffix}</span>
    </span>
  );
}

export function SearchCourses() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [level, setLevel] = useState('All');
  const results = courses
    .filter((c) => (level === 'All' ? true : c.level === level))
    .filter((c) => `${c.name} ${c.code} ${c.specializations.join(' ')}`.toLowerCase().includes(query.toLowerCase()))
    .slice(0, 5);

  return (
    <section className="section-pad">
      <div className="container-page">
        <SectionHeading
          eyebrow="Find Your Program"
          title={<>Search Across <span className="gradient-text">120+ Programs</span></>}
          subtitle="Filter by level or type to discover the programme that matches your ambition."
        />
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <div className="mx-auto max-w-3xl">
            <div className="glass flex flex-col gap-3 rounded-3xl p-3 shadow-card sm:flex-row sm:items-center">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-dark-400" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by course name, code or specialization…"
                  aria-label="Search courses"
                  className="input h-12 border-0 bg-transparent pl-12 focus:ring-0"
                />
              </div>
              <select value={level} onChange={(e) => setLevel(e.target.value)} aria-label="Filter by level" className="input h-12 w-full sm:w-40">
                <option>All</option>
                <option>UG</option>
                <option>PG</option>
                <option>PhD</option>
              </select>
              <Button size="lg" onClick={() => navigate('/courses')} className="h-12 shrink-0">
                Search Courses
              </Button>
            </div>
            {query && (
              <div className="mt-3 overflow-hidden rounded-2xl border border-dark-100 bg-white shadow-card dark:border-dark-800 dark:bg-dark-900">
                {results.map((c) => (
                  <Link key={c.id} to={`/courses/${c.id}`} className="flex items-center justify-between gap-3 border-b border-dark-50 px-5 py-3.5 text-sm transition-colors last:border-0 hover:bg-primary-50/60 dark:border-dark-800 dark:hover:bg-dark-800">
                    <span>
                      <span className="font-semibold text-dark-800 dark:text-dark-100">{c.name}</span>
                      <span className="ml-2 text-xs text-dark-400">{c.duration}</span>
                    </span>
                    <ChevronRight className="h-4 w-4 text-primary-600" />
                  </Link>
                ))}
                {results.length === 0 && <p className="px-5 py-6 text-center text-sm text-dark-400">No courses match "{query}"</p>}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

const features = [
  { icon: Microscope, title: 'Modern Labs', desc: '35+ industry-grade labs including AI GPU lab, VLSI, robotics and pharma GMP pilot plant.', color: 'from-primary-500 to-primary-700' },
  { icon: Users, title: 'Experienced Faculty', desc: '1200+ faculty with PhDs from IITs/NITs/IISc and deep industry experience.', color: 'from-secondary-500 to-secondary-700' },
  { icon: HeartHandshake, title: 'Industry Partnerships', desc: '150+ MOUs with TCS, Infosys, Bosch, Dr. Reddy\'s and more for live projects and hiring.', color: 'from-accent-500 to-accent-700' },
  { icon: FlaskConical, title: 'Research & Patents', desc: '85+ patents filed, funded research projects and a dedicated R&D ecosystem.', color: 'from-violet-500 to-violet-700' },
  { icon: HomeIcon, title: 'Comfortable Hostels', desc: 'Smart hostels with 24×7 security, Wi-Fi, mess, gym and laundry for 8000+ students.', color: 'from-sky-500 to-sky-700' },
  { icon: Lightbulb, title: 'Innovation & Incubation', desc: 'CUTM Innovation Hub has incubated 40+ startups with ₹8 Cr+ raised in funding.', color: 'from-pink-500 to-pink-700' },
];

export function WhyChooseGrid() {
  return (
    <section className="section-pad bg-gradient-to-b from-transparent via-primary-50/40 to-transparent dark:via-primary-900/10">
      <div className="container-page">
        <SectionHeading eyebrow="Why Choose CUTM" title={<>Built for the <span className="gradient-text">Future of Work</span></>} subtitle="A learning-by-doing philosophy backed by real infrastructure, real industry and real outcomes." />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <motion.div key={f.title} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.5, delay: i * 0.07 }}>
              <Card className="card-hover group h-full p-6">
                <span className={cn('flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-soft transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6', f.color)}>
                  <f.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-lg font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-dark-500 dark:text-dark-400">{f.desc}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function DepartmentsGrid() {
  return (
    <section className="section-pad">
      <div className="container-page">
        <SectionHeading eyebrow="Academics" title={<>14 Departments, <span className="gradient-text">One Vision</span></>} subtitle="Every department is built like a mini industry — labs, centres and corporate partners included." />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {departments.map((d, i) => (
            <motion.div key={d.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.4, delay: (i % 4) * 0.06 }}>
              <Link to={`/departments/${d.id}`} className="card card-hover group flex h-full flex-col p-5">
                <div className="flex items-start justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl text-white shadow-soft transition-transform group-hover:scale-110" style={{ background: d.color }}>
                    <span className="text-lg font-bold font-display">{d.shortName.slice(0, 3)}</span>
                  </span>
                  <span className="text-xs font-semibold text-dark-400 dark:text-dark-500">{d.placementRate}% placed</span>
                </div>
                <h3 className="mt-4 text-sm font-semibold leading-snug">{d.name}</h3>
                <p className="mt-1 line-clamp-2 text-xs text-dark-400 dark:text-dark-500">{d.description}</p>
                <span className="mt-auto pt-4 text-xs font-semibold text-primary-600 dark:text-primary-400">{d.students.toLocaleString('en-IN')} students →</span>
              </Link>
            </motion.div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link to="/departments" className="btn-outline">
            View All Departments <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export function CourseShowcase() {
  return (
    <section className="section-pad bg-dark-900 text-white">
      <div className="container-page">
        <SectionHeading light eyebrow="Programmes" title={<>Flagship <span className="text-secondary-300">Courses</span></>} subtitle="From AI to Agriculture — programmes co-designed with industry leaders." />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {courses.slice(0, 6).map((c, i) => (
            <motion.div key={c.id} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.5, delay: i * 0.06 }}>
              <Link to={`/courses/${c.id}`} className="group block h-full rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-secondary-400/50 hover:bg-white/[0.08]">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-primary-600/20 px-3 py-1 text-xs font-bold text-primary-300">{c.level}</span>
                  <span className="text-xs font-medium text-slate-400">{c.duration}</span>
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold leading-snug transition-colors group-hover:text-secondary-300">{c.name}</h3>
                <p className="mt-2 line-clamp-2 text-sm text-slate-400">{c.overview}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {c.specializations.slice(0, 3).map((s) => (
                    <span key={s} className="rounded-full border border-white/10 px-2.5 py-0.5 text-[11px] text-slate-300">{s}</span>
                  ))}
                </div>
                <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4 text-sm">
                  <span className="text-slate-400">Fee from <span className="font-bold text-white">{formatINRCrore(c.feePerYear)}/yr</span></span>
                  <span className="flex items-center gap-1 font-semibold text-secondary-300">Details <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" /></span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link to="/courses" className="btn-secondary">
            Browse All 120+ Courses <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export function ExploreCampus() {
  const highlights = [
    { icon: Microscope, label: 'Smart Labs', value: '35+' },
    { icon: Building2, label: 'Campuses', value: '5' },
    { icon: Users, label: 'Hostel Capacity', value: '8000+' },
    { icon: Cpu, label: 'AI GPU Cluster', value: '4' },
  ];
  return (
    <section id="campus-tour" className="section-pad">
      <div className="container-page">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div initial={{ opacity: 0, x: -32 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-700 ring-1 ring-primary-600/15 dark:bg-primary-900/40 dark:text-primary-300">
              <Video className="h-3 w-3" /> Campus Life
            </span>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">A 200-Acre <span className="gradient-text">Smart Campus</span></h2>
            <p className="mt-5 leading-relaxed text-dark-500 dark:text-dark-400">
              Solar-powered buildings, 5G-ready Wi-Fi, an innovation hub, sports arenas, organic farms and
              residential villages — our campuses are living laboratories where students build, farm, code and compete every day.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4">
              {highlights.map((h) => (
                <div key={h.label} className="flex items-center gap-3 rounded-2xl border border-dark-100 bg-white p-4 dark:border-dark-800 dark:bg-dark-900">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary-50 to-secondary-50 text-primary-600 dark:from-primary-900/40 dark:to-secondary-900/40 dark:text-primary-400">
                    <h.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-display text-lg font-bold">{h.value}</p>
                    <p className="text-xs text-dark-400">{h.label}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/campus-life" className="btn-primary">Explore Campus Life</Link>
              <Link to="/gallery" className="btn-outline">View Gallery</Link>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 32 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="relative">
            <div className="relative overflow-hidden rounded-3xl shadow-card">
              <img src="/images/campus.jpg" alt="CUTM main campus building" className="aspect-[4/3] w-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-950/60 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <div className="glass rounded-2xl p-4">
                  <p className="text-sm font-semibold text-dark-900 dark:text-white">Centurion University — Main Campus, Bhubaneswar</p>
                  <p className="mt-0.5 text-xs text-dark-500 dark:text-dark-400">58 km from Bhubaneswar · 500 m from NH-16</p>
                </div>
              </div>
            </div>
            <motion.div className="absolute -left-4 -top-4 hidden rounded-2xl bg-white p-3 shadow-card dark:bg-dark-900 sm:block" animate={{ y: [0, -10, 0] }} transition={{ duration: 5, repeat: Infinity }}>
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-success/15 text-success"><Leaf className="h-4 w-4" /></span>
                <div>
                  <p className="text-xs font-bold">5 MW Solar</p>
                  <p className="text-[10px] text-dark-400">60% energy self-sufficient</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function PlacementCompanies() {
  const [filters, setFilters] = useState('All');
  const industries = ['All', ...Array.from(new Set(companies.map((c) => c.industry)))].slice(0, 6);
  const visible = companies.filter((c) => filters === 'All' || c.industry === filters);
  return (
    <section className="section-pad bg-gradient-to-b from-transparent via-secondary-50/50 to-transparent dark:via-secondary-900/10">
      <div className="container-page">
        <SectionHeading eyebrow="Placements" title={<>Recruiters Who <span className="gradient-text">Hire Centurions</span></>} subtitle="218+ companies hired from the 2025 batch. Highest package: ₹52 LPA." />
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {industries.map((ind) => (
            <button key={ind} onClick={() => setFilters(ind)} className={cn('rounded-full px-4 py-2 text-xs font-semibold transition-all', filters === ind ? 'bg-primary-600 text-white shadow-glow' : 'border border-dark-200 bg-white text-dark-500 hover:border-primary-400 hover:text-primary-600 dark:border-dark-700 dark:bg-dark-900 dark:text-dark-300')}>
              {ind}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
          {visible.map((c, i) => (
            <motion.div key={c.id} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: i * 0.03 }} className="card card-hover flex items-center gap-3 px-5 py-3.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary-50 to-secondary-50 font-display text-xs font-bold text-primary-700 dark:from-primary-900/40 dark:to-secondary-900/40 dark:text-primary-300">
                {c.name.slice(0, 3).toUpperCase()}
              </span>
              <div>
                <p className="text-sm font-semibold">{c.name}</p>
                <p className="text-[10px] text-dark-400">{c.industry} · avg {formatINRCrore(c.avgPackage)}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function LatestNews() {
  return (
    <section className="section-pad">
      <div className="container-page">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <SectionHeading align="left" eyebrow="Newsroom" title={<>Latest <span className="gradient-text">News</span></>} className="mb-0" />
          <Link to="/about" className="btn-outline">All News <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {news.slice(0, 3).map((n, i) => (
            <motion.div key={n.id} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.5, delay: i * 0.08 }}>
              <Card className="card-hover h-full overflow-hidden">
                <div className="relative h-44 overflow-hidden">
                  <img src={`/images/${['building.jpg', 'students.jpg', 'fountain.jpg'][i]}`} alt="" className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" loading="lazy" />
                  <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold text-primary-700 backdrop-blur">{n.category}</span>
                </div>
                <div className="p-5">
                  <p className="text-[11px] font-medium text-dark-400">{n.date} · {n.views.toLocaleString()} views</p>
                  <h3 className="mt-2 font-semibold leading-snug transition-colors hover:text-primary-600 dark:hover:text-primary-400">{n.title}</h3>
                  <p className="mt-2 line-clamp-2 text-sm text-dark-500 dark:text-dark-400">{n.excerpt}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-primary-600 dark:text-primary-400">Read More <ArrowRight className="h-3 w-3" /></span>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function UpcomingEvents() {
  return (
    <section className="section-pad bg-dark-900 text-white">
      <div className="container-page">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <SectionHeading light align="left" eyebrow="Events Calendar" title={<>Upcoming <span className="text-secondary-300">Events</span></>} className="mb-0" />
          <Link to="/events" className="btn-secondary">View All Events</Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {events.slice(0, 4).map((e, i) => (
            <motion.div key={e.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.45, delay: i * 0.06 }}>
              <div className="group flex h-full gap-5 rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition-all hover:border-secondary-400/50 hover:bg-white/[0.07]">
                <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-primary-600 to-secondary-600 text-white shadow-glow">
                  <span className="font-display text-xl font-bold leading-none">{new Date(e.date).getDate()}</span>
                  <span className="text-[10px] uppercase">{new Date(e.date).toLocaleString('en-IN', { month: 'short' })}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-secondary-300">
                    <CalendarDays className="h-3 w-3" /> {e.time} · {e.venue}
                  </div>
                  <h3 className="mt-1.5 font-display text-base font-semibold leading-snug transition-colors group-hover:text-secondary-300">{e.title}</h3>
                  <p className="mt-1.5 line-clamp-2 text-sm text-slate-400">{e.description}</p>
                  <div className="mt-3 flex items-center gap-2 text-xs text-slate-400">
                    <Users className="h-3.5 w-3.5" /> {e.registered?.toLocaleString()}/{e.capacity.toLocaleString()} registered
                    <span className="ml-auto font-semibold text-primary-300">Register →</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function GallerySection() {
  return (
    <section className="section-pad">
      <div className="container-page">
        <SectionHeading eyebrow="Life at CUTM" title={<>Moments from the <span className="gradient-text">Campus</span></>} subtitle="Festivals, hackathons, labs, farms and friendships — every day is an event." />
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {galleryItems.slice(0, 8).map((g, i) => (
            <motion.div
              key={g.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: (i % 4) * 0.06 }}
              className={cn('group relative overflow-hidden rounded-2xl', i === 0 || i === 5 ? 'col-span-2 row-span-2' : '')}
            >
              <img src={g.image} alt={g.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-950/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="absolute bottom-0 left-0 right-0 translate-y-3 p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <p className="text-sm font-semibold text-white">{g.title}</p>
                <p className="text-[11px] text-slate-300">{g.category}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TestimonialsSection() {
  return (
    <section className="section-pad bg-gradient-to-b from-transparent via-primary-50/40 to-transparent dark:via-primary-900/10">
      <div className="container-page">
        <SectionHeading eyebrow="Alumni Voices" title={<>What Our <span className="gradient-text">Centurions Say</span></>} subtitle="22,000+ alumni across 30 countries — here are a few of their stories." />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.slice(0, 3).map((t, i) => (
            <motion.div key={t.id} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.5, delay: i * 0.08 }}>
              <Card className="card-hover relative h-full p-6">
                <Quote className="absolute right-5 top-5 h-8 w-8 text-primary-100 dark:text-primary-900/50" />
                <div className="flex gap-0.5 text-accent-500" aria-label={`${t.rating} star rating`}>
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} className={cn('h-4 w-4', s < Math.round(t.rating) ? 'fill-current' : 'opacity-25')} />
                  ))}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-dark-600 dark:text-dark-300">"{t.quote}"</p>
                <div className="mt-6 flex items-center gap-3 border-t border-dark-100 pt-4 dark:border-dark-800">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 text-sm font-bold text-white">
                    {t.name.split(' ').map((w) => w[0]).join('')}
                  </span>
                  <div>
                    <p className="text-sm font-semibold">{t.name}</p>
                    <p className="text-xs text-dark-400">{t.role} · {t.company}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FAQPreview() {
  return (
    <section className="section-pad">
      <div className="container-page max-w-4xl">
        <SectionHeading eyebrow="Help" title={<>Frequently Asked <span className="gradient-text">Questions</span></>} subtitle="Quick answers to the questions every applicant asks us first." />
        <div className="space-y-3">
          {[
            { q: 'What is the admission process for B.Tech?', a: 'Apply online, submit 10+2 marks, appear for JEE/OJEE (or CUTM entrance), and complete the document verification + fee payment. Scholarships up to 100% for meritorious students.' },
            { q: 'Are scholarships available?', a: 'Yes — merit scholarships up to 100% tuition waiver, state schemes (E-Medhabruti), reserved category support and industry fellowships.' },
            { q: 'What is the average placement package?', a: 'Average package is ₹7.8 LPA with the highest at ₹52 LPA. 92% of eligible students were placed in 2025.' },
            { q: 'Does CUTM provide hostel facilities?', a: 'Yes, with a capacity of 8,000+ students across 5 campuses. Rooms have Wi-Fi, mess, gym, laundry and 24×7 security.' },
          ].map((f, i) => (
            <motion.details key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.06 }} className="group rounded-2xl border border-dark-100 bg-white p-5 shadow-soft open:border-primary-200 dark:border-dark-800 dark:bg-dark-900 dark:open:border-primary-700/40">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-dark-800 dark:text-dark-100">
                {f.q}
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary-600 transition-transform group-open:rotate-45 dark:bg-primary-900/40 dark:text-primary-400">
                  <span className="text-lg leading-none">+</span>
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-dark-500 dark:text-dark-400">{f.a}</p>
            </motion.details>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link to="/faq" className="btn-outline">View All FAQs</Link>
        </div>
      </div>
    </section>
  );
}

export function NewsletterSection() {
  return (
    <section className="pb-20">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-primary-600 via-primary-700 to-dark-900 px-6 py-16 text-center text-white shadow-glow sm:px-16">
          <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-secondary-500/30 blur-3xl" aria-hidden />
          <div className="pointer-events-none absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-accent-500/20 blur-3xl" aria-hidden />
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="relative">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold ring-1 ring-white/20">
              <Rocket className="h-3.5 w-3.5 text-accent-300" /> Admissions Open for 2026-27
            </span>
            <h2 className="mt-5 font-display text-3xl font-bold sm:text-4xl">Ready to Become a Centurion?</h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
              Join 18,000+ students learning by doing. Get the admission guide, scholarship details and campus tour invite — straight to your inbox.
            </p>
            <form className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row" onSubmit={(e) => e.preventDefault()}>
              <input type="email" required placeholder="Enter your email" aria-label="Email for admission guide" className="w-full rounded-xl border border-white/15 bg-white/10 px-5 py-3.5 text-sm text-white outline-none backdrop-blur transition-all placeholder:text-slate-300/70 focus:border-white/40 focus:ring-4 focus:ring-white/10" />
              <button type="submit" className="btn whitespace-nowrap bg-accent-500 px-6 py-3.5 text-sm font-semibold text-white hover:bg-accent-600 active:scale-[0.98]">
                Get Admission Guide
              </button>
            </form>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-300">
              <span className="flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5 text-secondary-300" /> No spam, unsubscribe anytime</span>
              <span className="flex items-center gap-1.5"><Bot className="h-3.5 w-3.5 text-secondary-300" /> Apply in 10 minutes</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function HeroVideoSection() {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/60 bg-dark-900 shadow-card dark:border-dark-800">
      {playing ? (
        <div className="aspect-video w-full">
          <iframe
            className="h-full w-full"
            src="https://www.youtube.com/embed/AHeRASOwnYc?autoplay=1"
            title="CUTM campus tour"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      ) : (
        <button onClick={() => setPlaying(true)} aria-label="Play campus tour video" className="group relative block w-full">
          <img src="/images/building.jpg" alt="CUTM students on campus" className="aspect-video w-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-950/70 via-dark-950/20 to-transparent" />
          <span className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:bg-primary-600/80" style={{ boxShadow: '0 0 0 12px rgba(255,255,255,0.08)' }}>
            <Play className="ml-1 h-8 w-8 fill-current" />
          </span>
          <span className="absolute bottom-5 left-5 rounded-xl bg-white/15 px-4 py-2 text-left text-white backdrop-blur-md">
            <span className="block text-sm font-semibold">Inside CUTM — Campus Tour 2026</span>
            <span className="block text-xs text-slate-300">2 min · 5 campuses · 100+ acres</span>
          </span>
        </button>
      )}
    </div>
  );
}
