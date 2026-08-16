import { NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { GraduationCap, X } from 'lucide-react';
import { navByRole, roleLabels } from '../../config/navigation';
import { Avatar } from '../ui';
import { Logo } from './Logo';
import { cn } from '../../utils';
import { useAppSelector } from '../../store';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export function Sidebar({ open, onClose }: SidebarProps) {
  const role = useAppSelector((s) => s.auth.user?.role) ?? 'student';
  const user = useAppSelector((s) => s.auth.user);
  const location = useLocation();
  const sections = navByRole[role];

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-dark-950/60 backdrop-blur-sm lg:hidden"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-dark-100 bg-white transition-transform duration-300 dark:border-dark-800 dark:bg-dark-900 lg:sticky lg:top-0 lg:h-screen lg:translate-x-0',
          open ? 'translate-x-0' : '-translate-x-full',
        )}
        aria-label="Sidebar navigation"
      >
        <div className="flex h-[72px] shrink-0 items-center justify-between border-b border-dark-100 px-5 dark:border-dark-800">
          <Logo href="/" compact={false} />
          <button onClick={onClose} aria-label="Close sidebar" className="rounded-lg p-1.5 text-dark-400 hover:bg-dark-100 dark:hover:bg-dark-800 lg:hidden">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mx-4 mt-4 flex items-center gap-3 rounded-2xl border border-primary-100 bg-gradient-to-r from-primary-50 to-secondary-50 p-3 dark:border-primary-900/50 dark:from-primary-900/30 dark:to-secondary-900/30">
          <Avatar name={user?.name ?? 'User'} size="md" />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-dark-900 dark:text-white">{user?.name ?? 'Guest'}</p>
            <p className="truncate text-xs text-primary-700 dark:text-primary-300">{roleLabels[role]}</p>
          </div>
        </div>

        <nav className="flex-1 space-y-5 overflow-y-auto px-4 py-4" aria-label="Portal sections">
          {sections.map((section, i) => (
            <div key={i}>
              {section.title && (
                <p className="mb-1.5 px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-dark-400 dark:text-dark-500">{section.title}</p>
              )}
              <ul className="space-y-0.5">
                {section.items.map((item) => {
                  const active = item.end ? location.pathname === item.to : location.pathname.startsWith(item.to);
                  return (
                    <li key={item.to}>
                      <NavLink
                        to={item.to}
                        onClick={onClose}
                        className={cn(
                          'group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all',
                          active
                            ? 'bg-gradient-to-r from-primary-600 to-primary-500 text-white shadow-glow'
                            : 'text-dark-600 hover:bg-primary-50 hover:text-primary-700 dark:text-dark-300 dark:hover:bg-dark-800 dark:hover:text-primary-300',
                        )}
                        aria-current={active ? 'page' : undefined}
                      >
                        <item.icon className={cn('h-[18px] w-[18px] shrink-0 transition-transform group-hover:scale-110', active ? 'text-white' : 'text-dark-400 group-hover:text-primary-600 dark:text-dark-500 dark:group-hover:text-primary-400')} />
                        {item.label}
                        {active && <span className="absolute right-3 h-1.5 w-1.5 rounded-full bg-white/80" aria-hidden />}
                      </NavLink>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        <div className="border-t border-dark-100 p-4 dark:border-dark-800">
          <div className="flex items-center gap-2.5 rounded-xl bg-dark-50 p-2.5 dark:bg-dark-800/60">
            <GraduationCap className="h-4 w-4 shrink-0 text-secondary-600 dark:text-secondary-400" />
            <p className="text-[11px] leading-tight text-dark-500 dark:text-dark-400">
              CUTM ERP v2.4 · Academic Year 2026-27
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
