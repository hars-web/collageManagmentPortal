import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../store';
import { toggleTheme, setTheme } from '../../store/slices/themeSlice';
import { cn } from '../../utils';

export function ThemeToggle({ className, light }: { className?: string; light?: boolean }) {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((s) => s.theme.theme);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  if (!mounted) return null;

  return (
    <button
      onClick={() => dispatch(toggleTheme())}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
      className={cn(
        'relative flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-300',
        light
          ? 'text-white hover:bg-white/10'
          : 'text-dark-500 hover:bg-dark-100 hover:text-primary-600 dark:text-dark-300 dark:hover:bg-dark-800 dark:hover:text-accent-400',
        className,
      )}
    >
      {theme === 'dark' ? <Sun className="h-[18px] w-[18px]" /> : <Moon className="h-[18px] w-[18px]" />}
    </button>
  );
}

export function ThemeCycleButton({ className }: { className?: string }) {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((s) => s.theme.theme);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  if (!mounted) return null;

  const icons = { light: <Sun className="h-4 w-4" />, dark: <Moon className="h-4 w-4" /> };

  return (
    <button
      onClick={() => dispatch(theme === 'light' ? setTheme('dark') : setTheme('light'))}
      aria-label="Toggle theme"
      className={cn('btn-ghost h-9 w-9 rounded-xl p-0', className)}
    >
      {icons[theme]}
    </button>
  );
}

export function ThemeSelector() {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((s) => s.theme.theme);
  return (
    <div className="grid grid-cols-3 gap-2">
      {(['light', 'dark'] as const).map((t) => (
        <button
          key={t}
          onClick={() => dispatch(setTheme(t))}
          className={cn(
            'flex flex-col items-center gap-2 rounded-xl border-2 p-3 text-xs font-medium transition-all',
            theme === t ? 'border-primary-600 bg-primary-50 text-primary-700 dark:bg-primary-900/40 dark:text-primary-300' : 'border-dark-200 text-dark-500 hover:border-dark-300 dark:border-dark-700 dark:text-dark-400',
          )}
        >
          {t === 'light' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          {t === 'light' ? 'Light' : 'Dark'}
        </button>
      ))}
    </div>
  );
}
