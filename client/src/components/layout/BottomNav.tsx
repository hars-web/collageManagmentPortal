import { NavLink } from 'react-router-dom';
import { navByRole } from '../../config/navigation';
import { cn } from '../../utils';
import { useAppSelector } from '../../store';

export function BottomNav() {
  const role = useAppSelector((s) => s.auth.user?.role) ?? 'student';
  const sections = navByRole[role];
  const topItems = sections.flatMap((s) => s.items).slice(0, 5);
  const home = sections[0]?.items[0]?.to ?? '/';

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 border-t border-dark-100 bg-white/90 backdrop-blur-xl dark:border-dark-800 dark:bg-dark-900/90 lg:hidden"
      aria-label="Bottom navigation"
    >
      <ul className="flex items-stretch justify-around px-2 pb-[env(safe-area-inset-bottom)]">
        {topItems.map((item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                cn(
                  'flex flex-col items-center gap-1 px-3 py-2.5 text-[10px] font-medium transition-colors',
                  isActive ? 'text-primary-600 dark:text-primary-400' : 'text-dark-400 dark:text-dark-500',
                )
              }
            >
              {({ isActive }) => (
                <>
                  <item.icon className={cn('h-5 w-5', isActive && 'drop-shadow-[0_2px_6px_rgba(37,99,235,0.45)]')} />
                  {item.label.split(' ')[0]}
                </>
              )}
            </NavLink>
          </li>
        ))}
        <li>
          <NavLink
            to={home}
            className={({ isActive }) => cn('flex flex-col items-center gap-1 px-3 py-2.5 text-[10px] font-medium', isActive ? 'text-primary-600' : 'text-dark-400 dark:text-dark-500')}
          >
            <span className="flex h-9 w-9 -mt-4 items-center justify-center rounded-full bg-gradient-to-br from-primary-600 to-secondary-500 text-white shadow-glow">
              <span className="text-sm leading-none">⌂</span>
            </span>
            Home
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
