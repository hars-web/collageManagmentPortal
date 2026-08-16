import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { PackageOpen } from 'lucide-react';
import { Button } from './Button';

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  action?: { label: string; onClick: () => void };
  compact?: boolean;
}

export function EmptyState({ title, description, icon, action, compact }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className={cnLayout(compact)}
      role="status"
    >
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-50 to-secondary-50 text-primary-600 dark:from-primary-900/40 dark:to-secondary-900/40 dark:text-primary-400">
        {icon ?? <PackageOpen className="h-6 w-6" />}
      </div>
      <h3 className="mt-4 text-base font-semibold">{title}</h3>
      {description && <p className="mt-1 max-w-sm text-sm text-dark-500 dark:text-dark-400">{description}</p>}
      {action && (
        <Button className="mt-5" onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </motion.div>
  );
}

function cnLayout(compact?: boolean) {
  return compact
    ? 'flex flex-col items-center justify-center px-6 py-10 text-center'
    : 'flex flex-col items-center justify-center px-6 py-16 text-center';
}
