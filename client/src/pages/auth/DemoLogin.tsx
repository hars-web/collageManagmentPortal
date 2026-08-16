import { GraduationCap, Library, ShieldCheck, Stethoscope, UserRound } from 'lucide-react';
import { Badge } from '../../components/ui';

const demos = [
  { role: 'Student', email: 'student@cutm.ac.in', password: 'student123', icon: GraduationCap, tone: 'primary' as const },
  { role: 'Faculty', email: 'faculty@cutm.ac.in', password: 'faculty123', icon: UserRound, tone: 'secondary' as const },
  { role: 'Admin', email: 'admin@cutm.ac.in', password: 'admin123', icon: ShieldCheck, tone: 'accent' as const },
  { role: 'Placement Officer', email: 'placement@cutm.ac.in', password: 'placement123', icon: Stethoscope, tone: 'info' as const },
  { role: 'Librarian', email: 'librarian@cutm.ac.in', password: 'librarian123', icon: Library, tone: 'purple' as const },
];

const toneClass: Record<string, string> = {
  primary: 'text-primary-600 dark:text-primary-400',
  secondary: 'text-secondary-600 dark:text-secondary-400',
  accent: 'text-accent-600 dark:text-accent-400',
  info: 'text-sky-600 dark:text-sky-400',
  purple: 'text-violet-600 dark:text-violet-400',
};

export function DemoLogin({ onSelect }: { onSelect: (email: string, password: string) => void }) {
  return (
    <div className="mt-8">
      <div className="relative mb-4 text-center">
        <span className="relative z-10 bg-surface px-3 text-[11px] font-semibold uppercase tracking-wider text-dark-400 dark:bg-dark-950 dark:text-dark-500">
          Demo accounts — one-click fill
        </span>
        <span className="absolute left-0 right-0 top-1/2 h-px bg-dark-200 dark:bg-dark-700" />
      </div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {demos.map((d) => (
          <button
            key={d.email}
            onClick={() => onSelect(d.email, d.password)}
            className="group flex flex-col items-center gap-1.5 rounded-xl border border-dark-100 bg-white p-3 text-center transition-all hover:-translate-y-0.5 hover:border-primary-300 hover:shadow-soft dark:border-dark-800 dark:bg-dark-900 dark:hover:border-primary-700"
            aria-label={`Use ${d.role} demo account`}
          >
            <d.icon className={`h-5 w-5 ${toneClass[d.tone]}`} />
            <span className="text-xs font-semibold text-dark-700 dark:text-dark-200">{d.role}</span>
            <Badge tone="neutral" className="text-[9px]">{d.email.split('@')[0]}</Badge>
          </button>
        ))}
      </div>
    </div>
  );
}
