import { cn } from '../../utils';

export function RatingStars({ rating, size = 14, className, showValue = true }: { rating: number; size?: number; className?: string; showValue?: boolean }) {
  return (
    <span className={cn('inline-flex items-center gap-1.5', className)} aria-label={`Rated ${rating} out of 5`}>
      <span className="relative inline-flex" aria-hidden>
        <span className="text-dark-200 dark:text-dark-700">
          {'★★★★★'.split('').map((star, i) => (
            <span key={i} style={{ fontSize: size }}>{star}</span>
          ))}
        </span>
        <span className="absolute inset-0 overflow-hidden text-accent-500" style={{ width: `${(rating / 5) * 100}%` }}>
          {'★★★★★'.split('').map((star, i) => (
            <span key={i} style={{ fontSize: size }}>{star}</span>
          ))}
        </span>
      </span>
      {showValue && <span className="text-xs font-semibold text-dark-600 dark:text-dark-300">{rating.toFixed(1)}</span>}
    </span>
  );
}
