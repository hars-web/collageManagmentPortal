import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Award,
  BookOpen,
  Briefcase,
  Building2,
  FileCheck,
  GraduationCap,
  HeartHandshake,
  Home,
  Info,
  Mail,
  MapPin,
  Play,
  Sparkles,
  UserRound,
  Users,
} from 'lucide-react';
import { HeroVideoSection, StatCounter, SearchCourses, ExploreCampus, WhyChooseGrid, DepartmentsGrid, CourseShowcase, PlacementCompanies, LatestNews, UpcomingEvents, GallerySection, TestimonialsSection, NewsletterSection, FAQPreview } from './home-sections';
import { university } from '../../data/mock';

export default function HomePage() {
  return (
    <>
      <QuickLinks />
      <HeroSection />
      <StatsSection />
      <SearchCourses />
      <WhyChooseGrid />
      <DepartmentsGrid />
      <CourseShowcase />
      <ExploreCampus />
      <PlacementCompanies />
      <LatestNews />
      <UpcomingEvents />
      <GallerySection />
      <TestimonialsSection />
      <FAQPreview />
      <NewsletterSection />
    </>
  );
}

function QuickLinks() {
  const links = [
    { label: 'Home', to: '/', icon: Home },
    { label: 'About Us', to: '/about', icon: Info },
    { label: 'Programmes', to: '/courses', icon: BookOpen },
    { label: 'Student Corner', to: '/campus-life', icon: GraduationCap },
    { label: 'Admission', to: '/admissions', icon: FileCheck },
    { label: 'Placements', to: '/placements', icon: Briefcase },
    { label: 'Contact Us', to: '/contact', icon: Mail },
  ];
  const logins = [
    { label: 'Student Login', to: '/login?role=student', icon: GraduationCap },
    { label: 'Faculty Login', to: '/login?role=faculty', icon: UserRound },
  ];
  return (
    <section className="bg-white py-4 dark:bg-dark-950">
      <div className="container-page">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-9">
          {links.map((l, i) => (
            <motion.div key={l.to} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.35, delay: i * 0.04 }}>
              <Link to={l.to} className="card card-hover flex h-full flex-col items-center gap-1.5 px-2 py-3 text-center">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary-50 to-secondary-50 text-primary-600 dark:from-primary-900/40 dark:to-secondary-900/40 dark:text-primary-400">
                  <l.icon className="h-4 w-4" />
                </span>
                <span className="text-[11px] font-semibold leading-tight text-dark-700 dark:text-dark-200">{l.label}</span>
              </Link>
            </motion.div>
          ))}
          {logins.map((l, i) => (
            <motion.div key={l.to} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.35, delay: 0.3 + i * 0.04 }}>
              <Link to={l.to} className="flex h-full flex-col items-center justify-center gap-1.5 rounded-2xl bg-gradient-to-r from-primary-600 to-secondary-500 px-2 py-3 text-[11px] font-bold text-white shadow-glow transition-transform hover:scale-[1.03] active:scale-[0.98]">
                <l.icon className="h-4 w-4" /> {l.label}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HeroSection() {
  return (
    <section className="hero-gradient relative overflow-hidden">
      <img src="/images/collage.jpg" alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-dark-950/80 via-dark-900/75 to-dark-950/90" />
      <div className="absolute inset-0 bg-primary-950/20" />
      <div className="container-page relative flex flex-col items-center pb-24 pt-12 text-center text-white lg:pt-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold text-white shadow-soft backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-accent-300" />
            NAAC A++ Accredited · NIRF Ranked · Estd. 2005
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-6 max-w-4xl font-display text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl"
        >
          Learn by Doing. <br />
          <span className="gradient-text">Earn by Leading.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-6 max-w-2xl text-base leading-relaxed text-slate-200 sm:text-lg"
        >
          {university.tagline}. India's first university to make every student an entrepreneur — with 92% placements,
          150+ industry partners and 100+ acres of experiential learning campuses in Odisha.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-9 flex flex-wrap items-center justify-center gap-3.5"
        >
          <Link to="/admissions" className="btn-primary px-7 py-3.5 text-base">
            Apply for Admission <ArrowRight className="h-4 w-4" />
          </Link>
          <Link to="/courses" className="btn-outline px-7 py-3.5 text-base">
            <BookOpen className="h-4 w-4" /> Explore Courses
          </Link>
          <button className="btn-ghost gap-2.5 px-4 py-3.5 text-base" onClick={() => document.getElementById('campus-tour')?.scrollIntoView({ behavior: 'smooth' })}>
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary-600 to-secondary-500 text-white shadow-glow">
              <Play className="ml-0.5 h-4 w-4" />
            </span>
            Watch Campus Tour
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mt-14 w-full max-w-4xl"
        >
          <HeroVideoSection />
        </motion.div>
      </div>
    </section>
  );
}

function StatsSection() {
  const stats = [
    { icon: Users, value: university.students, suffix: '+', label: 'Students', format: true },
    { icon: GraduationCap, value: university.faculty, suffix: '+', label: 'Faculty Experts', format: true },
    { icon: Building2, value: university.departments, suffix: '', label: 'Departments', format: true },
    { icon: Award, value: university.placementRate, suffix: '%', label: 'Placement Rate', format: false },
    { icon: MapPin, value: 200, suffix: '+', label: 'Campus Size (Acres)', format: true },
    { icon: HeartHandshake, value: university.moUs, suffix: '+', label: 'Industry Partners', format: true },
  ];
  return (
    <section className="relative z-10 -mt-10 pb-4">
      <div className="container-page">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 gap-3 rounded-3xl border border-white/60 bg-white/80 p-5 shadow-card backdrop-blur-xl dark:border-dark-800 dark:bg-dark-900/80 sm:grid-cols-3 lg:grid-cols-6 lg:gap-4 lg:p-8"
        >
          {stats.map((s, i) => (
            <div key={s.label} className="flex flex-col items-center gap-1 text-center">
              <span className="mb-1.5 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary-50 to-secondary-50 text-primary-600 dark:from-primary-900/40 dark:to-secondary-900/40 dark:text-primary-400">
                <s.icon className="h-5 w-5" />
              </span>
              <StatCounter value={s.value} suffix={s.suffix} format={s.format} delay={i * 0.1} />
              <span className="text-xs font-medium text-dark-500 dark:text-dark-400">{s.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
