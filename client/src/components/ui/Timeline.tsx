import { Fragment, type ReactNode } from 'react';
import { cn } from '../../utils';

interface TimelineItem {
  id: string;
  title: ReactNode;
  subtitle?: ReactNode;
  time?: string;
  icon?: ReactNode;
  tone?: 'primary' | 'secondary' | 'accent' | 'success' | 'danger' | 'neutral';
}

const dotTones = {
  primary: 'bg-primary-600 ring-primary-100 dark:ring-primary-900/50',
  secondary: 'bg-secondary-500 ring-secondary-100 dark:ring-secondary-900/50',
  accent: 'bg-accent-500 ring-accent-100 dark:ring-accent-900/50',
  success: 'bg-success ring-success/15',
  danger: 'bg-danger ring-danger/15',
  neutral: 'bg-dark-400 ring-dark-100 dark:ring-dark-800',
};

export function Timeline({ items, className }: { items: TimelineItem[]; className?: string }) {
  return (
    <ol className={cn('relative space-y-6 border-l-2 border-dark-100 pl-6 dark:border-dark-800', className)}>
      {items.map((item) => (
        <li key={item.id} className="relative">
          <span className={cn('absolute -left-[31px] top-1 flex h-4 w-4 items-center justify-center rounded-full ring-4', dotTones[item.tone ?? 'primary'])} aria-hidden />
          <div className="card-hover rounded-xl border border-dark-100 bg-white p-3.5 dark:border-dark-800 dark:bg-dark-900">
            <div className="flex items-start justify-between gap-3">
              <p className="text-sm font-semibold text-dark-800 dark:text-dark-100">{item.title}</p>
              {item.time && <span className="shrink-0 text-[11px] font-medium text-dark-400 dark:text-dark-500">{item.time}</span>}
            </div>
            {item.subtitle && <div className="mt-1 text-xs text-dark-500 dark:text-dark-400">{item.subtitle}</div>}
          </div>
        </li>
      ))}
    </ol>
  );
}

export function SimpleList({ items, className }: { items: { label: ReactNode; value: ReactNode; tone?: 'primary' | 'secondary' }[]; className?: string }) {
  return (
    <dl className={cn('divide-y divide-dark-100 dark:divide-dark-800', className)}>
      {items.map((item, i) => (
        <Fragment key={i}>
          <div className="flex items-center justify-between py-2.5 text-sm">
            <dt className="text-dark-500 dark:text-dark-400">{item.label}</dt>
            <dd className={cn('font-medium text-dark-800 dark:text-dark-100', item.tone === 'primary' && 'text-primary-600 dark:text-primary-400', item.tone === 'secondary' && 'text-secondary-600 dark:text-secondary-400')}>{item.value}</dd>
          </div>
        </Fragment>
      ))}
    </dl>
  );
}
