import { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff, KeyRound, LogIn, Mail, ShieldCheck } from 'lucide-react';
import toast from 'react-hot-toast';
import { Button, Input } from '../../components/ui';
import { authApi } from '../../services/authService';
import { useAppDispatch, useAppSelector } from '../../store';
import { loginSuccess, logout } from '../../store/slices/authSlice';
import { roleHome } from '../../config/navigation';
import { DemoLogin } from './DemoLogin';

const schema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

type FormValues = z.infer<typeof schema>;

const demoByRole: Record<string, { email: string; password: string }> = {
  student: { email: 'student@cutm.ac.in', password: 'student123' },
  faculty: { email: 'faculty@cutm.ac.in', password: 'faculty123' },
};

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const currentRole = useAppSelector((s) => s.auth.user?.role);
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  useEffect(() => {
    const role = searchParams.get('role');
    const cred = role ? demoByRole[role] : undefined;
    if (!cred) return;
    if (currentRole === role) {
      navigate(roleHome[role as keyof typeof roleHome], { replace: true });
      return;
    }
    if (currentRole) dispatch(logout());
    setValue('email', cred.email);
    setValue('password', cred.password);
    (async () => {
      try {
        const result = await authApi.login(cred.email, cred.password);
        dispatch(loginSuccess(result));
        toast.success(`Welcome back, ${result.user.name.split(' ')[0]}!`);
        navigate(roleHome[result.user.role], { replace: true });
      } catch (err) {
        toast.error(err instanceof Error ? err.message : 'Login failed');
      }
    })();
  }, [searchParams, dispatch, navigate, setValue, currentRole, roleHome]);

  const onSubmit = async (values: FormValues) => {
    try {
      const result = await authApi.login(values.email, values.password);
      dispatch(loginSuccess(result));
      toast.success(`Welcome back, ${result.user.name.split(' ')[0]}!`);
      navigate(roleHome[result.user.role]);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Login failed');
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Welcome back 👋</h1>
        <p className="mt-2 text-sm text-dark-500 dark:text-dark-400">Sign in to your {`CUTM`} portal to continue.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <Input
          label="University Email"
          type="email"
          placeholder="you@cutm.ac.in"
          leftIcon={<Mail className="h-4 w-4" />}
          error={errors.email?.message}
          {...register('email')}
        />
        <Input
          label="Password"
          type={showPassword ? 'text' : 'password'}
          placeholder="••••••••"
          leftIcon={<KeyRound className="h-4 w-4" />}
          rightIcon={
            <button type="button" onClick={() => setShowPassword((v) => !v)} aria-label={showPassword ? 'Hide password' : 'Show password'} className="text-dark-400 hover:text-dark-600 dark:hover:text-dark-200">
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          }
          error={errors.password?.message}
          {...register('password')}
        />
        <div className="flex items-center justify-between text-sm">
          <label className="flex cursor-pointer items-center gap-2 text-dark-500 dark:text-dark-400">
            <input type="checkbox" className="h-4 w-4 rounded border-dark-300 text-primary-600 focus:ring-primary-500" />
            Remember me
          </label>
          <Link to="/forgot-password" className="font-semibold text-primary-600 transition-colors hover:text-primary-700 dark:text-primary-400">
            Forgot password?
          </Link>
        </div>
        <Button type="submit" className="w-full" size="lg" loading={isSubmitting}>
          <LogIn className="h-4 w-4" /> Sign In
        </Button>
      </form>

      <div className="mt-6 rounded-2xl border border-primary-100 bg-primary-50/50 p-4 text-xs leading-relaxed text-dark-500 dark:border-primary-900/50 dark:bg-primary-900/20 dark:text-dark-300">
        <p className="flex items-center gap-1.5 font-semibold text-primary-700 dark:text-primary-300">
          <ShieldCheck className="h-4 w-4" /> Demo mode
        </p>
        Any email works — use any password of 8+ characters to sign in as a student. Demo accounts (one-click below) also available.
      </div>

      <p className="mt-6 text-center text-sm text-dark-500 dark:text-dark-400">
        Need an account?{' '}
        <Link to="/register" className="font-semibold text-primary-600 hover:underline dark:text-primary-400">
          Request registration
        </Link>
      </p>

      <DemoLogin
        onSelect={(email, password) => {
          setValue('email', email);
          setValue('password', password);
        }}
      />
    </div>
  );
}
