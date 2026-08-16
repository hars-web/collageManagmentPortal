import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Globe, Mail, Moon, Paintbrush } from 'lucide-react';
import { PageHeader, Card, Badge, Button, Select } from '../../components/ui';
import { useAppDispatch, useAppSelector } from '../../store';
import { setTheme } from '../../store/slices/themeSlice';
import { cn } from '../../utils';

export default function AdminSettings() {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((s) => s.theme.theme);
  const [accent, setAccent] = useState('Blue (#2563EB)');
  const [lang, setLang] = useState('English (EN)');

  const tabs = ['General', 'Academics', 'Admissions', 'Payments', 'Email & SMS', 'Security'];

  return (
    <div>
      <PageHeader
        title="System Settings"
        subtitle="Configure the institutional portal"
        crumbs={[{ label: 'Admin' }, { label: 'Settings' }]}
        actions={<Button onClick={() => toast.success('All settings saved')}>Save All Changes</Button>}
      />

      <div className="mb-5 flex flex-wrap gap-2">
        {tabs.map((t, i) => (
          <button key={t} className={cn('rounded-full px-4 py-2 text-sm font-semibold transition-colors', i === 0 ? 'bg-primary-600 text-white' : 'bg-dark-50 text-dark-500 hover:bg-dark-100 dark:bg-dark-800 dark:text-dark-300')}>{t}</button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card className="p-5">
            <h3 className="flex items-center gap-2 text-base font-semibold"><Globe className="h-4 w-4 text-primary-500" /> Institution Details</h3>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <label className="label">University Name<input className="input" defaultValue="Centurion University of Technology and Management" /></label>
              <label className="label">Short Name<input className="input" defaultValue="CUTM" /></label>
              <label className="label">Campus<input className="input" defaultValue="Bhubaneswar, Odisha" /></label>
              <label className="label">Established<input className="input" defaultValue="2005" /></label>
              <label className="label">Contact Email<input className="input" defaultValue="info@cutm.ac.in" /></label>
              <label className="label">Contact Phone<input className="input" defaultValue="+91 674 123 4567" /></label>
            </div>
          </Card>

          <Card className="p-5">
            <h3 className="flex items-center gap-2 text-base font-semibold"><Mail className="h-4 w-4 text-primary-500" /> Notifications & Comms</h3>
            <div className="mt-4 space-y-3">
              {[
                { label: 'Email notifications', desc: 'Fees, results, notices via email' },
                { label: 'SMS notifications', desc: 'Urgent alerts to registered mobiles' },
                { label: 'WhatsApp broadcasts', desc: 'Weekly digest to students & parents' },
              ].map((n) => (
                <div key={n.label} className="flex items-center justify-between rounded-xl border border-dark-100 p-3.5 dark:border-dark-800">
                  <div>
                    <p className="text-sm font-medium">{n.label}</p>
                    <p className="text-xs text-dark-400">{n.desc}</p>
                  </div>
                  <span className="relative inline-flex">
                    <span className="h-6 w-11 rounded-full bg-primary-600" />
                    <span className="absolute left-[22px] top-0.5 h-5 w-5 rounded-full bg-white shadow" />
                  </span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-5">
            <h3 className="flex items-center gap-2 text-base font-semibold"><Paintbrush className="h-4 w-4 text-primary-500" /> Appearance</h3>
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              <label className="label">Theme Mode
                <div className="mt-1 flex gap-2">
                  {['light', 'dark', 'system'].map((m) => (
                    <button key={m} onClick={() => dispatch(setTheme(m === 'system' ? 'light' : (m as 'light' | 'dark')))} className={cn('flex-1 rounded-xl border p-2.5 text-xs font-semibold capitalize transition-colors', theme === m ? 'border-primary-500 bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300' : 'border-dark-100 dark:border-dark-800')}>
                      {m === 'light' ? '☀️ Light' : m === 'dark' ? '🌙 Dark' : '🖥️ System'}
                    </button>
                  ))}
                </div>
              </label>
              <label className="label">Accent Color
                <select className="input" value={accent} onChange={(e) => setAccent(e.target.value)}>
                  {['Blue (#2563EB)', 'Teal (#14B8A6)', 'Violet (#8B5CF6)', 'Rose (#F43F5E)'].map((a) => <option key={a}>{a}</option>)}
                </select>
              </label>
              <label className="label">Default Language
                <select className="input" value={lang} onChange={(e) => setLang(e.target.value)}>
                  {['English (EN)', 'हिन्दी (HI)', 'ଓଡ଼ିଆ (OR)'].map((l) => <option key={l}>{l}</option>)}
                </select>
              </label>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="p-5">
            <h3 className="text-base font-semibold">Security</h3>
            <div className="mt-3 space-y-2.5 text-sm">
              <div className="flex items-center justify-between rounded-xl bg-dark-50 p-3 dark:bg-dark-800"><span>2FA enforcement</span><Badge tone="success">Enabled</Badge></div>
              <div className="flex items-center justify-between rounded-xl bg-dark-50 p-3 dark:bg-dark-800"><span>Password policy</span><Badge tone="primary">Strong</Badge></div>
              <div className="flex items-center justify-between rounded-xl bg-dark-50 p-3 dark:bg-dark-800"><span>Session timeout</span><Badge tone="neutral">30 min</Badge></div>
              <div className="flex items-center justify-between rounded-xl bg-dark-50 p-3 dark:bg-dark-800"><span>Last security audit</span><Badge tone="neutral">05 Aug 2026</Badge></div>
            </div>
            <Button variant="outline" className="mt-4 w-full py-2 text-xs" onClick={() => toast.success('Audit log exported')}>Download Audit Log</Button>
          </Card>

          <Card className="p-5">
            <h3 className="text-base font-semibold">Academic Year</h3>
            <div className="mt-3 space-y-3">
              <Select defaultValue="2025-26 (Current)">
                <option>2025-26 (Current)</option>
                <option>2024-25</option>
                <option>2023-24</option>
              </Select>
              <Select defaultValue="Semester 6">
                <option>Semester 6 (Active)</option>
                <option>Semester 5</option>
              </Select>
              <p className="flex items-center gap-1.5 text-xs text-dark-400"><Moon className="h-3.5 w-3.5" /> Recess: 14 Nov – 22 Nov 2026</p>
            </div>
          </Card>

          <Card className="border-danger-200 p-5 dark:border-danger-900">
            <h3 className="text-sm font-semibold text-danger">Danger Zone</h3>
            <p className="mt-1 text-xs text-dark-400">Resetting will clear all local cached data (server data stays intact).</p>
            <Button variant="outline" className="mt-3 w-full border-danger text-danger hover:bg-danger-50 dark:hover:bg-danger-900/20" onClick={() => toast.error('Please confirm — destructive action blocked')}>Reset Portal</Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
