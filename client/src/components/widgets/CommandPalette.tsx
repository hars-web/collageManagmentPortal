import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, CornerDownLeft, FileText, Search, Users, GraduationCap, Briefcase, BookOpen, LayoutDashboard, Command } from 'lucide-react';
import { navByRole, roleHome } from '../../config/navigation';
import { useAppDispatch, useAppSelector } from '../../store';
import { setCommandPaletteOpen } from '../../store/slices/uiSlice';
import { cn } from '../../utils';
import { useEscape } from '../../hooks';

interface CommandItem {
  label: string;
  to: string;
  icon: typeof FileText;
  group: string;
}

export function CommandPalette() {
  const dispatch = useAppDispatch();
  const open = useAppSelector((s) => s.ui.commandPaletteOpen);
  const role = useAppSelector((s) => s.auth.user?.role) ?? 'student';
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [index, setIndex] = useState(0);

  useEscape(() => dispatch(setCommandPaletteOpen(false)));

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        dispatch(setCommandPaletteOpen(!open));
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [dispatch, open]);

  useEffect(() => setQuery(''), [open]);

  const items = useMemo<CommandItem[]>(() => {
    const portalItems: CommandItem[] = navByRole[role].flatMap((section) =>
      section.items.map((item) => ({ label: item.label, to: item.to, icon: item.icon as typeof FileText, group: 'Portal' })),
    );
    const globalItems: CommandItem[] = [
      { label: 'My Dashboard', to: roleHome[role], icon: LayoutDashboard, group: 'Portal' },
      { label: 'Profile', to: `${roleHome[role]}/profile`, icon: Users, group: 'Portal' },
      { label: 'Public Website', to: '/', icon: GraduationCap, group: 'University' },
      { label: 'Courses', to: '/courses', icon: BookOpen, group: 'University' },
      { label: 'Admissions', to: '/admissions', icon: FileText, group: 'University' },
      { label: 'Placements', to: '/placements', icon: Briefcase, group: 'University' },
      { label: 'Events', to: '/events', icon: FileText, group: 'University' },
      { label: 'Contact', to: '/contact', icon: FileText, group: 'University' },
    ];
    return [...portalItems, ...globalItems];
  }, [role]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items.slice(0, 10);
    return items.filter((i) => i.label.toLowerCase().includes(q)).slice(0, 10);
  }, [items, query]);

  const go = (to: string) => {
    dispatch(setCommandPaletteOpen(false));
    navigate(to);
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center bg-dark-950/60 p-4 pt-[14vh] backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="Command palette">
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -10 }}
            transition={{ duration: 0.15 }}
            className="w-full max-w-xl overflow-hidden rounded-2xl border border-dark-100 bg-white shadow-2xl dark:border-dark-800 dark:bg-dark-900"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-dark-100 px-4 dark:border-dark-800">
              <Search className="h-5 w-5 text-primary-600" />
              <input
                autoFocus
                value={query}
                onChange={(e) => { setQuery(e.target.value); setIndex(0); }}
                onKeyDown={(e) => {
                  if (e.key === 'ArrowDown') { e.preventDefault(); setIndex((i) => Math.min(i + 1, results.length - 1)); }
                  if (e.key === 'ArrowUp') { e.preventDefault(); setIndex((i) => Math.max(i - 1, 0)); }
                  if (e.key === 'Enter' && results[index]) go(results[index].to);
                }}
                placeholder="Type a command or search…"
                className="w-full bg-transparent py-4 text-sm outline-none placeholder:text-dark-400 dark:placeholder:text-dark-500"
                aria-label="Command input"
              />
              <kbd className="rounded-md border border-dark-200 px-1.5 py-0.5 text-[10px] font-semibold text-dark-400 dark:border-dark-700">ESC</kbd>
            </div>
            <div className="max-h-[360px] overflow-y-auto p-2">
              {results.length === 0 && <p className="p-6 text-center text-sm text-dark-400">No results for "{query}"</p>}
              {results.map((item, i) => (
                <button
                  key={item.label}
                  onClick={() => go(item.to)}
                  onMouseEnter={() => setIndex(i)}
                  className={cn(
                    'flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors',
                    i === index ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/40 dark:text-primary-300' : 'text-dark-600 dark:text-dark-300',
                  )}
                >
                  <span className="flex items-center gap-3">
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="text-[10px] uppercase tracking-wide text-dark-400 dark:text-dark-500">{item.group}</span>
                    {i === index && <CornerDownLeft className="h-3 w-3 opacity-50" />}
                  </span>
                </button>
              ))}
            </div>
            <div className="flex items-center gap-4 border-t border-dark-100 px-4 py-2.5 text-[10px] font-medium text-dark-400 dark:border-dark-800 dark:text-dark-500">
              <span className="flex items-center gap-1"><ArrowRight className="h-3 w-3" /> Navigate</span>
              <span className="flex items-center gap-1"><CornerDownLeft className="h-3 w-3" /> Open</span>
              <span className="ml-auto flex items-center gap-1"><Command className="h-3 w-3" />K Palette</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
