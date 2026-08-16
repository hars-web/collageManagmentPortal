import { forwardRef, useId, type InputHTMLAttributes, type SelectHTMLAttributes, type TextareaHTMLAttributes } from 'react';
import { cn } from '../../utils';
import { AlertCircle } from 'lucide-react';

interface FieldWrapProps {
  label?: string;
  error?: string;
  hint?: string;
  required?: boolean;
  id?: string;
  children: React.ReactNode;
}

function FieldWrap({ label, error, hint, required, id, children }: FieldWrapProps) {
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="label">
          {label}
          {required && <span className="ml-0.5 text-danger">*</span>}
        </label>
      )}
      {children}
      {error ? (
        <p className="mt-1.5 flex items-center gap-1 text-xs font-medium text-danger" role="alert">
          <AlertCircle className="h-3.5 w-3.5" /> {error}
        </p>
      ) : hint ? (
        <p className="mt-1.5 text-xs text-dark-400 dark:text-dark-500">{hint}</p>
      ) : null}
    </div>
  );
}

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, hint, required, id, leftIcon, rightIcon, ...props }, ref) => {
    const autoId = useId();
    const inputId = id ?? autoId;
    return (
      <FieldWrap label={label} error={error} hint={hint} required={required} id={inputId}>
        <div className="relative">
          {leftIcon && (
            <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-dark-400 dark:text-dark-500">
              {leftIcon}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            aria-invalid={!!error}
            className={cn('input', leftIcon && 'pl-10', rightIcon && 'pr-10', error && 'border-danger focus:border-danger focus:ring-danger/10', className)}
            {...props}
          />
          {rightIcon && <span className="absolute right-3.5 top-1/2 -translate-y-1/2">{rightIcon}</span>}
        </div>
      </FieldWrap>
    );
  },
);
Input.displayName = 'Input';

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, hint, required, id, children, ...props }, ref) => {
    const autoId = useId();
    const selectId = id ?? autoId;
    return (
      <FieldWrap label={label} error={error} hint={hint} required={required} id={selectId}>
        <select
          ref={ref}
          id={selectId}
          className={cn('input appearance-none bg-[url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2712%27 height=%2712%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%2394a3b8%27 stroke-width=%272.5%27%3E%3Cpath d=%27m6 9 6 6 6-6%27/%3E%3C/svg%3E")] bg-[position:right_1rem_center] bg-no-repeat pr-10', error && 'border-danger', className)}
          {...props}
        >
          {children}
        </select>
      </FieldWrap>
    );
  },
);
Select.displayName = 'Select';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, hint, required, id, ...props }, ref) => {
    const autoId = useId();
    const textareaId = id ?? autoId;
    return (
      <FieldWrap label={label} error={error} hint={hint} required={required} id={textareaId}>
        <textarea ref={ref} id={textareaId} className={cn('input min-h-[110px] resize-y', error && 'border-danger', className)} {...props} />
      </FieldWrap>
    );
  },
);
Textarea.displayName = 'Textarea';
