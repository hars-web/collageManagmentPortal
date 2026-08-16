import type { HTMLAttributes } from 'react';
import { cn } from '../../utils';

type Tone = 'primary' | 'secondary' | 'accent' | 'success' | 'danger' | 'neutral' | 'info' | 'purple' | 'pink';

const tones: Record<Tone, string> = {
  primary: 'bg-primary-50 text-primary-700 ring-primary-600/20 dark:bg-primary-900/40 dark:text-primary-300',
  secondary: 'bg-secondary-50 text-secondary-700 ring-secondary-600/20 dark:bg-secondary-900/40 dark:text-secondary-300',
  accent: 'bg-accent-50 text-accent-700 ring-accent-600/20 dark:bg-accent-900/40 dark:text-accent-300',
  success: 'bg-success/10 text-success ring-success/30 dark:bg-success/15 dark:text-success-400',
  danger: 'bg-danger/10 text-danger ring-danger/30 dark:bg-danger/15 dark:text-danger-400',
  neutral: 'bg-dark-100 text-dark-600 ring-dark-500/20 dark:bg-dark-800 dark:text-dark-300',
  info: 'bg-sky-50 text-sky-700 ring-sky-600/20 dark:bg-sky-900/40 dark:text-sky-300',
  purple: 'bg-violet-50 text-violet-700 ring-violet-600/20 dark:bg-violet-900/40 dark:text-violet-300',
  pink: 'bg-pink-50 text-pink-700 ring-pink-600/20 dark:bg-pink-900/40 dark:text-pink-300',
};

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: Tone;
  dot?: boolean;
}

export function Badge({ className, tone = 'neutral', dot, children, ...props }: BadgeProps) {
  return (
    <span className={cn('badge ring-1 ring-inset', tones[tone], className)} {...props}>
      {dot && <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden />}
      {children}
    </span>
  );
}

export const statusTone = (status: string): Tone => {
  const map: Record<string, Tone> = {
    active: 'success',
    pending: 'accent',
    approved: 'success',
    rejected: 'danger',
    submitted: 'info',
    graded: 'success',
    overdue: 'danger',
    paid: 'success',
    partial: 'accent',
    unpaid: 'danger',
    placed: 'success',
    offered: 'primary',
    interviewing: 'info',
    'not-placed': 'neutral',
    open: 'info',
    'in-progress': 'accent',
    resolved: 'success',
    issued: 'success',
    ready: 'info',
    pass: 'success',
    fail: 'danger',
    in: 'success',
    out: 'neutral',
  };
  return map[status.toLowerCase()] ?? 'neutral';
};
