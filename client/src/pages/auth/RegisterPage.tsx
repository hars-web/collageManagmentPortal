import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CheckCircle2, ClipboardList, GraduationCap, Mail, Phone, UserRound } from 'lucide-react';
import toast from 'react-hot-toast';
import { Button, Input, Select, Textarea } from '../../components/ui';
import { authApi } from '../../services/authService';

const schema = z.object({
  name: z.string().min(3, 'Full name is required'),
  email: z.string().email('Enter a valid email'),
  phone: z.string().regex(/^\+?[0-9\s-]{10,14}$/, 'Enter a valid phone number'),
  role: z.enum(['student', 'faculty']),
  program: z.string().min(2, 'Program / department is required'),
  message: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export default function RegisterPage() {
  const [requestId, setRequestId] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: FormValues) => {
    try {
      const { requestId } = await authApi.register({ name: values.name, email: values.email, phone: values.phone, program: values.program });
      setRequestId(requestId);
      toast.success('Registration request submitted!');
      void values;
    } catch {
      toast.error('Something went wrong. Please try again.');
    }
  };

  if (requestId) {
    return <div className="text-center">{motionSuccess({ requestId })}</div>;
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Request an account</h1>
        <p className="mt-2 text-sm text-dark-500 dark:text-dark-400">
          CUTM registrations are <strong>admin-verified</strong>. Submit your details and a member of the administration will approve your access within 48 hours.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <Input
          label="Full Name"
          placeholder="e.g. Aryan Behera"
          leftIcon={<UserRound className="h-4 w-4" />}
          error={errors.name?.message}
          {...register('name')}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            label="Email"
            type="email"
            placeholder="you@example.com"
            leftIcon={<Mail className="h-4 w-4" />}
            error={errors.email?.message}
            {...register('email')}
          />
          <Input
            label="Phone"
            type="tel"
            placeholder="+91 98765 43210"
            leftIcon={<Phone className="h-4 w-4" />}
            error={errors.phone?.message}
            {...register('phone')}
          />
        </div>
        <Select label="I am a" error={errors.role?.message} {...register('role')}>
          <option value="student">Student (admitted to CUTM)</option>
          <option value="faculty">Faculty / Staff</option>
        </Select>
        <Input
          label="Program / Department"
          placeholder="e.g. B.Tech CSE — Batch 2026"
          leftIcon={<GraduationCap className="h-4 w-4" />}
          error={errors.program?.message}
          {...register('program')}
        />
        <Textarea label="Message to administration (optional)" placeholder="Enrolment number, joining date, or any supporting detail…" {...register('message')} />
        <Button type="submit" className="w-full" size="lg" loading={isSubmitting}>
          <ClipboardList className="h-4 w-4" /> Submit for Verification
        </Button>
        <p className="text-center text-[11px] text-dark-400">Your data is encrypted and used only for verification.</p>
      </form>

      <p className="mt-6 text-center text-sm text-dark-500 dark:text-dark-400">
        Already verified?{' '}
        <Link to="/login" className="font-semibold text-primary-600 hover:underline dark:text-primary-400">
          Sign in
        </Link>
      </p>
    </div>
  );
}

function motionSuccess({ requestId }: { requestId: string }) {
  return (
    <div className="py-10">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success/15">
        <CheckCircle2 className="h-8 w-8 text-success" />
      </div>
      <h2 className="mt-5 text-xl font-bold">Request submitted!</h2>
      <p className="mx-auto mt-2 max-w-sm text-sm text-dark-500 dark:text-dark-400">
        Your request <span className="font-semibold text-primary-600">{requestId}</span> is with the administration. You'll receive portal credentials on your email after approval.
      </p>
      <Link to="/login" className="btn-primary mt-6">Go to Login</Link>
    </div>
  );
}
