import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { cn } from '../../utils';

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: string;
  align?: 'left' | 'center';
  light?: boolean;
  className?: string;
}

export function SectionHeading({ eyebrow, title, subtitle, align = 'center', light, className }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5 }}
      className={cn('mb-12', align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl', className)}
    >
      {eyebrow && (
        <span className={cn('mb-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider', light ? 'bg-white/10 text-secondary-300 ring-1 ring-white/20' : 'bg-primary-50 text-primary-700 ring-1 ring-primary-600/15 dark:bg-primary-900/40 dark:text-primary-300')}>
          <Sparkles className="h-3 w-3" />
          {eyebrow}
        </span>
      )}
      <h2 className={cn('text-3xl font-bold leading-tight tracking-tight sm:text-4xl', light && 'text-white')}>{title}</h2>
      {subtitle && <p className={cn('mt-4 text-base leading-relaxed', light ? 'text-slate-300' : 'text-dark-500 dark:text-dark-400')}>{subtitle}</p>}
    </motion.div>
  );
}
