import { useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';
import { Logo } from '../../components/layout/Logo';
import { ThemeToggle } from '../../components/layout/ThemeToggle';
import { university } from '../../data/mock';

const perks = [
  { text: 'Single sign-on for all CUTM portals' },
  { text: 'JWT + refresh token protected sessions' },
  { text: 'Optional two-factor authentication' },
  { text: 'Role-based access for students, faculty & staff' },
];

export default function AuthLayout() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex min-h-screen">
      <div className="relative hidden w-[45%] flex-col justify-between overflow-hidden bg-dark-900 p-10 text-white lg:flex">
        <div className="pointer-events-none absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)', backgroundSize: '26px 26px' }} aria-hidden />
        <div className="pointer-events-none absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-primary-600/25 blur-3xl" aria-hidden />
        <div className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-secondary-600/20 blur-3xl" aria-hidden />

        <div className="relative flex items-center justify-between">
          <Logo light />
          <Link to="/" className="flex items-center gap-1.5 text-xs font-medium text-slate-300 transition-colors hover:text-secondary-300">
            <ArrowLeft className="h-3.5 w-3.5" /> Back to website
          </Link>
        </div>

        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="relative max-w-md">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-semibold ring-1 ring-white/15">
            <Sparkles className="h-3.5 w-3.5 text-accent-300" /> CUTM Unified Portal
          </span>
          <h1 className="mt-6 font-display text-4xl font-bold leading-tight">
            One login for the <span className="text-secondary-300">entire campus</span>
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-slate-300">
            Dashboard, attendance, results, fees, library, placements and more — securely connected for {university.shortName} students, faculty and staff.
          </p>
          <ul className="mt-8 space-y-3">
            {perks.map((p) => (
              <li key={p.text} className="flex items-center gap-3 text-sm text-slate-200">
                <CheckCircle2 className="h-4.5 w-4.5 h-5 w-5 shrink-0 text-secondary-400" /> {p.text}
              </li>
            ))}
          </ul>
        </motion.div>

        <div className="relative flex items-center gap-2 text-xs text-slate-400">
          <ShieldCheck className="h-4 w-4 text-secondary-400" />
          Protected by end-to-end encryption · SOC2-aligned infrastructure
        </div>
      </div>

      <div className="relative flex flex-1 flex-col">
        <div className="absolute right-4 top-4 z-10 flex items-center gap-2">
          <Link to="/" className="btn-ghost hidden text-xs sm:inline-flex"><ArrowLeft className="h-3.5 w-3.5" /> Website</Link>
          <ThemeToggle />
        </div>
        <div className="flex flex-1 items-center justify-center px-4 py-12 sm:px-8">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="w-full max-w-md"
          >
            <div className="mb-8 lg:hidden">
              <Logo />
            </div>
            <Outlet />
          </motion.div>
        </div>
        <p className="pb-6 text-center text-xs text-dark-400 dark:text-dark-500">© {new Date().getFullYear()} Centurion University of Technology and Management</p>
      </div>
    </div>
  );
}
