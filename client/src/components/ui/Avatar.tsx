import { cn, initials } from '../../utils';

const sizeMap = {
  xs: 'h-6 w-6 text-[10px]',
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-14 w-14 text-lg',
  xl: 'h-20 w-20 text-2xl',
};

const gradientMap = [
  'from-primary-500 to-secondary-500',
  'from-accent-500 to-danger',
  'from-violet-500 to-primary-500',
  'from-secondary-500 to-accent-500',
  'from-pink-500 to-violet-500',
  'from-sky-500 to-primary-600',
];

export function hashIndex(str: string) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
  return h;
}

interface AvatarProps {
  name: string;
  src?: string;
  size?: keyof typeof sizeMap;
  className?: string;
  status?: 'online' | 'offline';
}

export function Avatar({ name, src, size = 'md', className, status }: AvatarProps) {
  const gradient = gradientMap[hashIndex(name) % gradientMap.length];
  return (
    <div className={cn('relative inline-block shrink-0', className)}>
      {src ? (
        <img src={src} alt={name} className={cn(sizeMap[size], 'rounded-full object-cover ring-2 ring-white dark:ring-dark-800')} loading="lazy" />
      ) : (
        <div className={cn(sizeMap[size], `flex items-center justify-center rounded-full bg-gradient-to-br ${gradient} font-semibold text-white ring-2 ring-white dark:ring-dark-800`)} aria-hidden>
          {initials(name)}
        </div>
      )}
      {status && (
        <span
          className={cn(
            'absolute bottom-0 right-0 block rounded-full ring-2 ring-white dark:ring-dark-800',
            status === 'online' ? 'bg-success' : 'bg-dark-300 dark:bg-dark-600',
            size === 'xs' ? 'h-2 w-2' : size === 'sm' ? 'h-2.5 w-2.5' : 'h-3 w-3',
          )}
          aria-label={status}
        />
      )}
    </div>
  );
}
