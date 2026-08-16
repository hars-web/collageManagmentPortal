import { useState, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../utils';

export interface TabItem {
  value: string;
  label: ReactNode;
  icon?: ReactNode;
  badge?: number;
}

interface TabsProps {
  tabs: TabItem[];
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export function Tabs({ tabs, value, onChange, className }: TabsProps) {
  const [internal, setInternal] = useState(tabs[0]?.value);
  const active = value ?? internal;
  const setActive = (v: string) => {
    setInternal(v);
    onChange?.(v);
  };
  return (
    <div className={cn('flex gap-1 overflow-x-auto rounded-xl bg-dark-100/70 p-1 dark:bg-dark-800/70', className)} role="tablist">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          role="tab"
          aria-selected={active === tab.value}
          onClick={() => setActive(tab.value)}
          className={cn(
            'relative flex shrink-0 items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-medium transition-colors',
            active === tab.value ? 'text-primary-700 dark:text-primary-300' : 'text-dark-500 hover:text-dark-700 dark:text-dark-400 dark:hover:text-dark-200',
          )}
        >
          {active === tab.value && (
            <motion.span
              layoutId="tab-pill"
              className="absolute inset-0 rounded-lg bg-white shadow-soft dark:bg-dark-900 dark:shadow-none"
              transition={{ type: 'spring', damping: 30, stiffness: 350 }}
            />
          )}
          <span className="relative z-10 flex items-center gap-1.5">
            {tab.icon}
            {tab.label}
            {tab.badge !== undefined && (
              <span className={cn('rounded-full px-1.5 py-0.5 text-[10px] font-bold', active === tab.value ? 'bg-primary-600 text-white' : 'bg-dark-200 text-dark-600 dark:bg-dark-700 dark:text-dark-300')}>
                {tab.badge}
              </span>
            )}
          </span>
        </button>
      ))}
    </div>
  );
}

export function TabPanel({ value, active, children }: { value: string; active: string; children: ReactNode }) {
  return (
    <AnimatePresence mode="wait">
      {active === value && (
        <motion.div
          key={value}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

interface AccordionItem {
  title: ReactNode;
  content: ReactNode;
}

export function Accordion({ items, defaultOpen = 0 }: { items: AccordionItem[]; defaultOpen?: number }) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpen);
  return (
    <div className="space-y-3">
      {items.map((item, i) => {
        const open = openIndex === i;
        return (
          <div key={i} className={cn('overflow-hidden rounded-2xl border transition-colors', open ? 'border-primary-200 dark:border-primary-700/40 bg-primary-50/40 dark:bg-primary-900/10' : 'border-dark-100 bg-white dark:border-dark-800 dark:bg-dark-900')}>
            <button
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              onClick={() => setOpenIndex(open ? null : i)}
              aria-expanded={open}
            >
              <span className="font-medium text-dark-800 dark:text-dark-100">{item.title}</span>
              <ChevronDown className={cn('h-5 w-5 shrink-0 text-dark-400 transition-transform duration-300', open && 'rotate-180 text-primary-600')} />
            </button>
            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="px-5 pb-5 text-sm leading-relaxed text-dark-600 dark:text-dark-300">{item.content}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
