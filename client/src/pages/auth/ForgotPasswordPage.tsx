import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff, KeyRound, Lock, Mail, ShieldCheck } from 'lucide-react';
import toast from 'react-hot-toast';
import OtpInput from 'react-otp-input';
import { Button, Input } from '../../components/ui';
import { authApi } from '../../services/authService';

const emailSchema = z.object({ email: z.string().email('Enter a valid email') });
const passwordSchema = z
  .object({
    password: z.string().min(8, 'At least 8 characters').regex(/[A-Za-z]/, 'Include a letter').regex(/[0-9]/, 'Include a number'),
    confirm: z.string(),
  })
  .refine((d) => d.password === d.confirm, { message: 'Passwords do not match', path: ['confirm'] });

type EmailValues = z.infer<typeof emailSchema>;
type PasswordValues = z.infer<typeof passwordSchema>;

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const step = (searchParams.get('step') ?? 'email') as 'email' | 'otp' | 'reset' | 'done';
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const emailForm = useForm<EmailValues>({ resolver: zodResolver(emailSchema) });
  const passwordForm = useForm<PasswordValues>({ resolver: zodResolver(passwordSchema) });

  const sendOtp = async (values: EmailValues) => {
    try {
      await authApi.sendOtp(values.email);
      setEmail(values.email);
      toast.success('OTP sent to your email');
      navigate('/forgot-password?step=otp');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to send OTP');
    }
  };

  const verifyOtp = async () => {
    if (otp.length !== 6) return toast.error('Enter the 6-digit OTP');
    try {
      const ok = await authApi.verifyOtp(email, otp);
      if (!ok) return toast.error('Invalid OTP. Check your email.');
      navigate('/forgot-password?step=reset');
    } catch {
      toast.error('Verification failed');
    }
  };

  const reset = async (values: PasswordValues) => {
    try {
      await authApi.resetPassword(email, otp, values.password);
      toast.success('Password updated! Please sign in.');
      navigate('/login');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Reset failed');
    }
  };

  return (
    <div>
      {step === 'email' && (
        <>
          <div className="mb-8">
            <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-600 to-secondary-500 text-white shadow-glow">
              <Lock className="h-5 w-5" />
            </span>
            <h1 className="text-2xl font-bold sm:text-3xl">Forgot password?</h1>
            <p className="mt-2 text-sm text-dark-500 dark:text-dark-400">Enter your university email and we'll send you a 6-digit verification code.</p>
          </div>
          <form onSubmit={emailForm.handleSubmit(sendOtp)} className="space-y-4" noValidate>
            <Input label="University Email" type="email" placeholder="you@cutm.ac.in" leftIcon={<Mail className="h-4 w-4" />} error={emailForm.formState.errors.email?.message} {...emailForm.register('email')} />
            <Button type="submit" className="w-full" size="lg" loading={emailForm.formState.isSubmitting}>Send OTP</Button>
          </form>
        </>
      )}

      {step === 'otp' && (
        <OtpStep email={email} otp={otp} setOtp={setOtp} onVerify={verifyOtp} onResend={sendOtp} />
      )}

      {step === 'reset' && (
        <>
          <div className="mb-8">
            <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-600 to-secondary-500 text-white shadow-glow">
              <KeyRound className="h-5 w-5" />
            </span>
            <h1 className="text-2xl font-bold sm:text-3xl">Set a new password</h1>
            <p className="mt-2 text-sm text-dark-500 dark:text-dark-400">For <span className="font-semibold text-dark-700 dark:text-dark-200">{email}</span></p>
          </div>
          <form onSubmit={passwordForm.handleSubmit(reset)} className="space-y-4" noValidate>
            <Input
              label="New Password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Min 8 characters, letters + numbers"
              leftIcon={<KeyRound className="h-4 w-4" />}
              rightIcon={
                <button type="button" onClick={() => setShowPassword((v) => !v)} aria-label="Toggle password visibility" className="text-dark-400 hover:text-dark-600">
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              }
              error={passwordForm.formState.errors.password?.message}
              {...passwordForm.register('password')}
            />
            <Input label="Confirm Password" type="password" placeholder="Repeat password" error={passwordForm.formState.errors.confirm?.message} {...passwordForm.register('confirm')} />
            <Button type="submit" className="w-full" size="lg" loading={passwordForm.formState.isSubmitting}>Update Password</Button>
          </form>
        </>
      )}

      <div className="mt-6 flex items-center justify-center gap-2 text-xs text-dark-400">
        <ShieldCheck className="h-3.5 w-3.5 text-secondary-600" />
        OTP expires in 10 minutes · <Link to="/login" className="font-semibold text-primary-600 hover:underline">Back to login</Link>
      </div>
    </div>
  );
}

function OtpStep({ email, otp, setOtp, onVerify, onResend }: { email: string; otp: string; setOtp: (v: string) => void; onVerify: () => void; onResend: (v: { email: string }) => void }) {
  const [resendTimer, setResendTimer] = useState(30);
  const [verifying, setVerifying] = useState(false);

  const startResend = () => {
    onResend({ email });
    setResendTimer(30);
    const interval = setInterval(() => {
      setResendTimer((t) => {
        if (t <= 1) clearInterval(interval);
        return t - 1;
      });
    }, 1000);
  };

  return (
    <>
      <div className="mb-8">
        <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-600 to-secondary-500 text-white shadow-glow">
          <ShieldCheck className="h-5 w-5" />
        </span>
        <h1 className="text-2xl font-bold sm:text-3xl">Verify your identity</h1>
        <p className="mt-2 text-sm text-dark-500 dark:text-dark-400">
          We sent a 6-digit code to <span className="font-semibold text-dark-700 dark:text-dark-200">{email}</span>. Enter it below.
        </p>
      </div>
      <div className="flex justify-center py-4">
        <OtpInput
          value={otp}
          onChange={setOtp}
          numInputs={6}
          renderSeparator={<span className="w-2 sm:w-3" />}
          renderInput={(props, index) => <input {...props} aria-label={`OTP digit ${index + 1}`} className="h-12 w-10 rounded-xl border border-dark-200 bg-white text-center font-display text-xl font-bold text-dark-900 outline-none transition-all focus:border-primary-500 focus:ring-4 focus:ring-primary-600/10 dark:border-dark-700 dark:bg-dark-900 dark:text-white sm:h-14 sm:w-12" />}
          inputType="tel"
        />
      </div>
      <Button onClick={() => { setVerifying(true); setTimeout(() => { setVerifying(false); onVerify(); }, 600); }} className="w-full" size="lg" loading={verifying}>Verify & Continue</Button>
      <p className="mt-4 text-center text-xs text-dark-400">
        Didn't receive it?{' '}
        {resendTimer > 0 ? <span className="text-dark-500">Resend in {resendTimer}s</span> : (
          <button onClick={startResend} className="font-semibold text-primary-600 hover:underline">Resend OTP</button>
        )}
      </p>
    </>
  );
}
