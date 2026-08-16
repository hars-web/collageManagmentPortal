import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cn } from '../../utils';
import { Loader2 } from 'lucide-react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger' | 'success' | 'white';
type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
}

const variantClasses: Record<Variant, string> = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  ghost: 'btn-ghost',
  outline: 'btn-outline',
  danger: 'btn bg-danger text-white hover:bg-danger/90 shadow-[0_8px_24px_-8px_rgba(239,68,68,0.5)] active:scale-[0.98]',
  success: 'btn bg-success text-white hover:bg-success/90 shadow-[0_8px_24px_-8px_rgba(34,197,94,0.5)] active:scale-[0.98]',
  white: 'btn bg-white text-primary-700 hover:bg-primary-50 active:scale-[0.98] shadow-soft',
};

const sizeClasses: Record<Size, string> = {
  xs: 'px-2.5 py-1.5 text-xs rounded-lg',
  sm: 'px-3.5 py-2 text-sm rounded-lg',
  md: 'px-5 py-2.5 text-sm rounded-xl',
  lg: 'px-6 py-3 text-base rounded-xl',
  xl: 'px-8 py-3.5 text-lg rounded-2xl',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading, icon, iconRight, children, disabled, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(variantClasses[variant], sizeClasses[size], className)}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : icon}
      {children}
      {iconRight && !loading}
    </button>
  ),
);
Button.displayName = 'Button';
