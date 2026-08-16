import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Globe, GraduationCap, Home, Menu, Phone, Search, UserRound, X } from 'lucide-react';
import { Logo } from './Logo';
import { ThemeToggle } from './ThemeToggle';
import { cn } from '../../utils';

const navItems = [
  { label: 'Home', to: '/', icon: Home },
  { label: 'About Us', to: '/about' },
  { label: 'Programmes', to: '/courses' },
  {
    label: 'Student Corner',
    children: [
      { label: 'Student Portal', to: '/login' },
      { label: 'Campus Life', to: '/campus-life' },
      { label: 'Events', to: '/events' },
      { label: 'Gallery', to: '/gallery' },
      { label: 'Placements', to: '/placements' },
      { label: 'Alumni', to: '/alumni' },
      { label: 'FAQ', to: '/faq' },
    ],
  },
  { label: 'Admission', to: '/admissions' },
  { label: 'Contact Us', to: '/contact' },
];

export function PublicNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMoreOpen(false);
  }, [location.pathname]);

  const isHome = location.pathname === '/';

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <>
      <div className="hidden bg-dark-900 text-white lg:block">
        <div className="container-page flex items-center justify-between py-1.5 text-xs">
          <div className="flex items-center gap-5">
            <a href="tel:+916745553000" className="flex items-center gap-1.5 text-slate-300 transition-colors hover:text-secondary-300">
              <Phone className="h-3 w-3" /> {`+91 674 555 3000`}
            </a>
            <span className="text-slate-400">admissions@cutm.ac.in</span>
            <span className="text-slate-400">NAAC A++ Accredited</span>
          </div>
          <div className="flex items-center gap-5">
            <a href="https://cutm.ac.in" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-slate-300 transition-colors hover:text-secondary-300">
              <Globe className="h-3.5 w-3.5" /> cutm.ac.in
            </a>
            <Link to="/admissions" className="text-secondary-300 transition-colors hover:text-secondary-200">Apply Now</Link>
            <Link to="/alumni" className="text-slate-300 transition-colors hover:text-secondary-300">Alumni</Link>
            <Link to="/login" className="flex items-center gap-1 text-slate-300 transition-colors hover:text-secondary-300">
              <GraduationCap className="h-3.5 w-3.5" /> Portal Login
            </Link>
          </div>
        </div>
      </div>

      <header
        className={cn(
          'sticky top-0 z-50 transition-all duration-300',
          scrolled || isHome ? 'glass shadow-soft' : 'bg-transparent',
        )}
      >
        <nav className="container-page flex h-16 items-center justify-between gap-4 lg:h-[72px]" aria-label="Main navigation">
          <Logo />

          <ul className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) =>
              item.to ? (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      cn(
                        'rounded-xl px-3.5 py-2 text-sm font-medium transition-colors',
                        isActive ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/40 dark:text-primary-300' : 'text-dark-600 hover:bg-dark-100/80 hover:text-primary-600 dark:text-dark-300 dark:hover:bg-dark-800 dark:hover:text-primary-400',
                      )
                    }
                  >
                    {item.icon && <item.icon className="h-4 w-4" />}
                    {item.label}
                  </NavLink>
                </li>
              ) : (
                <li key={item.label} className="relative">
                  <button
                    onClick={() => setMoreOpen((v) => !v)}
                    aria-expanded={moreOpen}
                    className={cn(
                      'flex items-center gap-1 rounded-xl px-3.5 py-2 text-sm font-medium transition-colors',
                      moreOpen ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/40 dark:text-primary-300' : 'text-dark-600 hover:bg-dark-100/80 hover:text-primary-600 dark:text-dark-300 dark:hover:bg-dark-800 dark:hover:text-primary-400',
                    )}
                  >
                    {item.label}
                    <ChevronDown className={cn('h-3.5 w-3.5 transition-transform', moreOpen && 'rotate-180')} />
                  </button>
                  <AnimatePresence>
                    {moreOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.98 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 top-full z-50 mt-2 w-52 overflow-hidden rounded-2xl border border-dark-100 bg-white p-1.5 shadow-card dark:border-dark-800 dark:bg-dark-900"
                      >
                        {item.children?.map((child) => (
                          <Link
                            key={child.to}
                            to={child.to}
                            className="block rounded-xl px-3.5 py-2.5 text-sm text-dark-600 transition-colors hover:bg-primary-50 hover:text-primary-700 dark:text-dark-300 dark:hover:bg-dark-800 dark:hover:text-primary-300"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              ),
            )}
          </ul>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Search the university"
              className="hidden h-9 w-9 items-center justify-center rounded-xl text-dark-500 transition-colors hover:bg-dark-100 hover:text-primary-600 dark:text-dark-300 dark:hover:bg-dark-800 sm:flex"
            >
              <Search className="h-[18px] w-[18px]" />
            </button>
            <ThemeToggle />
            <Link to="/login?role=student" className="hidden items-center gap-1.5 rounded-xl border border-dark-200 px-3.5 py-2 text-sm font-semibold text-dark-700 transition-colors hover:border-primary-400 hover:text-primary-600 dark:border-dark-700 dark:text-dark-200 dark:hover:border-primary-600 dark:hover:text-primary-400 md:inline-flex">
              <GraduationCap className="h-4 w-4" /> Student Login
            </Link>
            <Link to="/login?role=faculty" className="hidden items-center gap-1.5 rounded-xl border border-dark-200 px-3.5 py-2 text-sm font-semibold text-dark-700 transition-colors hover:border-primary-400 hover:text-primary-600 dark:border-dark-700 dark:text-dark-200 dark:hover:border-primary-600 dark:hover:text-primary-400 lg:inline-flex">
              <UserRound className="h-4 w-4" /> Faculty Login
            </Link>
            <Link to="/admissions" className="btn-primary hidden px-4 py-2 text-sm md:inline-flex">
              Apply Now
            </Link>
            <button
              className="flex h-9 w-9 items-center justify-center rounded-xl text-dark-600 dark:text-dark-300 lg:hidden"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              aria-expanded={mobileOpen}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] bg-dark-950/60 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="absolute right-0 top-0 flex h-full w-[85%] max-w-sm flex-col overflow-y-auto bg-white p-5 dark:bg-dark-900"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-label="Mobile navigation"
            >
              <div className="mb-6 flex items-center justify-between">
                <Logo />
                <button onClick={() => setMobileOpen(false)} aria-label="Close menu" className="rounded-xl p-2 text-dark-400 hover:bg-dark-100 dark:hover:bg-dark-800">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="flex flex-col gap-1">
                {navItems.flatMap((item) =>
                  item.to
                    ? [
                        <NavLink
                          key={item.to}
                          to={item.to}
                          className={({ isActive }) => cn('rounded-xl px-4 py-3 text-base font-medium transition-colors', isActive ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/40 dark:text-primary-300' : 'text-dark-700 dark:text-dark-200')}
                        >
                          {item.icon && <item.icon className="mr-2 inline-block h-4 w-4" />}
                          {item.label}
                        </NavLink>,
                      ]
                    : item.children!.map((child) => (
                        <NavLink
                          key={child.to}
                          to={child.to}
                          className={({ isActive }) => cn('rounded-xl px-4 py-3 text-base font-medium transition-colors', isActive ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/40 dark:text-primary-300' : 'text-dark-700 dark:text-dark-200')}
                        >
                          {child.label}
                        </NavLink>
                      )),
                )}
              </div>
              <div className="mt-6 flex flex-col gap-3">
                <Link to="/login?role=student" className="btn-outline w-full">Student Login</Link>
                <Link to="/login?role=faculty" className="btn-outline w-full">Faculty Login</Link>
                <Link to="/login" className="btn-primary w-full">Portal Login</Link>
              </div>
              <div className="mt-auto pt-8 text-xs text-dark-400 dark:text-dark-500">
                NAAC A++ Accredited · Estd. 2005 · Odisha, India
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {searchOpen && <GlobalSearch onClose={() => setSearchOpen(false)} />}
      </AnimatePresence>
    </>
  );
}

function GlobalSearch({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState('');
  const pages = [
    { label: 'B.Tech CSE Admission', to: '/admissions' },
    { label: 'MBA Programme', to: '/courses' },
    { label: 'Placement Records', to: '/placements' },
    { label: 'Student Portal', to: '/login' },
    { label: 'Campus Tour', to: '/campus-life' },
    { label: 'Scholarships', to: '/admissions' },
  ];
  const results = pages.filter((p) => p.label.toLowerCase().includes(query.toLowerCase())).slice(0, 6);
  return (
    <div className="fixed inset-0 z-[90] flex items-start justify-center bg-dark-950/60 p-4 pt-[12vh] backdrop-blur-sm" role="dialog" aria-label="Global search">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: -12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: -12 }}
        className="w-full max-w-lg overflow-hidden rounded-3xl border border-dark-100 bg-white shadow-2xl dark:border-dark-800 dark:bg-dark-900"
      >
        <div className="flex items-center gap-3 border-b border-dark-100 p-4 dark:border-dark-800">
          <Search className="h-5 w-5 text-primary-600" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search courses, pages, admissions…"
            className="w-full bg-transparent text-sm outline-none placeholder:text-dark-400 dark:placeholder:text-dark-500"
            aria-label="Search"
          />
          <kbd className="rounded-md border border-dark-200 px-1.5 py-0.5 text-[10px] font-semibold text-dark-400 dark:border-dark-700">ESC</kbd>
        </div>
        <div className="max-h-80 overflow-y-auto p-2">
          {query === '' ? (
            <p className="p-4 text-center text-sm text-dark-400 dark:text-dark-500">Type to search across the university</p>
          ) : results.length === 0 ? (
            <p className="p-4 text-center text-sm text-dark-400 dark:text-dark-500">No results for "{query}"</p>
          ) : (
            results.map((r) => (
              <Link
                key={r.to}
                to={r.to}
                onClick={onClose}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-dark-700 transition-colors hover:bg-primary-50 dark:text-dark-200 dark:hover:bg-dark-800"
              >
                <span className="h-2 w-2 rounded-full bg-secondary-500" />
                {r.label}
              </Link>
            ))
          )}
        </div>
      </motion.div>
    </div>
  );
}
