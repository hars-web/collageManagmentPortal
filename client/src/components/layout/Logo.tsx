import { Link } from 'react-router-dom';
import { cn } from '../../utils';

export function Logo({ light, className, href = '/', compact }: { light?: boolean; className?: string; href?: string; compact?: boolean }) {
  return (
    <Link to={href} className={cn('group inline-flex items-center gap-2.5', className)} aria-label="Centurion University of Technology and Management — Home">
      <span className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-white shadow-glow ring-1 ring-dark-100 transition-transform duration-300 group-hover:scale-105 dark:bg-dark-800 dark:ring-dark-700">
        <img src="/images/logo.webp" alt="CUTM logo" className="h-8 w-8 object-contain" />
      </span>
      {!compact && (
        <span className="flex flex-col leading-tight">
          <span className={cn('font-display text-sm font-bold tracking-tight sm:text-base', light ? 'text-white' : 'text-dark-900 dark:text-white')}>
            CENTURION <span className="gradient-text">UNIVERSITY</span>
          </span>
          <span className={cn('text-[10px] font-medium uppercase tracking-[0.18em]', light ? 'text-slate-300' : 'text-dark-400 dark:text-dark-500')}>
            Technology &amp; Management
          </span>
        </span>
      )}
    </Link>
  );
}
