import { useEffect, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn, formatINR } from '../../utils';

export interface StatCardProps {
  label: string;
  value: string | number;
  icon: ReactNode;
  iconClass?: string;
  trend?: number;
  trendLabel?: string;
  footer?: ReactNode;
  format?: 'number' | 'currency' | 'percent' | 'plain';
  delay?: number;
}

const iconStyles = {
  primary: 'bg-primary-50 text-primary-600 dark:bg-primary-900/40 dark:text-primary-400',
  secondary: 'bg-secondary-50 text-secondary-600 dark:bg-secondary-900/40 dark:text-secondary-400',
  accent: 'bg-accent-50 text-accent-600 dark:bg-accent-900/40 dark:text-accent-400',
  success: 'bg-success/10 text-success dark:bg-success/15',
  danger: 'bg-danger/10 text-danger dark:bg-danger/15',
  purple: 'bg-violet-50 text-violet-600 dark:bg-violet-900/40 dark:text-violet-400',
  pink: 'bg-pink-50 text-pink-600 dark:bg-pink-900/40 dark:text-pink-400',
  sky: 'bg-sky-50 text-sky-600 dark:bg-sky-900/40 dark:text-sky-400',
};

export function StatCard({ label, value, icon, iconClass = 'primary', trend, trendLabel, footer, format = 'number', delay = 0 }: StatCardProps) {
  const display = () => {
    if (format === 'currency') return formatINR(Number(value));
    if (format === 'percent') return `${value}%`;
    if (format === 'plain') return String(value);
    return Number(value).toLocaleString('en-IN');
  };

  const TrendIcon = trend !== undefined ? (trend >= 0 ? TrendingUp : TrendingDown) : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay * 0.08, duration: 0.4 }}
      className="card card-hover relative overflow-hidden p-5"
    >
      <div className="flex items-start justify-between">
        <div className={cn('flex h-11 w-11 items-center justify-center rounded-xl', iconStyles[iconClass as keyof typeof iconStyles])}>{icon}</div>
        {TrendIcon && (
          <span
            className={cn(
              'flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold',
              trend! >= 0 ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger',
            )}
          >
            <TrendIcon className="h-3.5 w-3.5" />
            {Math.abs(trend!)}%
          </span>
        )}
      </div>
      <p className="mt-4 text-2xl font-bold tracking-tight text-dark-900 dark:text-white">{display()}</p>
      <p className="mt-0.5 text-sm text-dark-500 dark:text-dark-400">{label}</p>
      {(trendLabel || footer) && <div className="mt-2 text-xs text-dark-400 dark:text-dark-500">{trendLabel ?? footer}</div>}
    </motion.div>
  );
}

export function ProgressBar({ value, max = 100, color, className }: { value: number; max?: number; color?: string; className?: string }) {
  const pct = Math.min((value / max) * 100, 100);
  useEffect(() => {
    /* ensure hydration-safe */
  }, []);
  return (
    <div className={cn('h-2 w-full overflow-hidden rounded-full bg-dark-100 dark:bg-dark-800', className)} role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={max}>
      <motion.div
        className="h-full rounded-full bg-gradient-to-r from-primary-600 to-secondary-500"
        style={color ? { background: color } : undefined}
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      />
    </div>
  );
}
